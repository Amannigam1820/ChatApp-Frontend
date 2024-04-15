import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack, Skeleton } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/Dialogs/FileMenu";

import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../../socket";
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING, CHAT_JOINED, CHAT_LEAVED } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducer/misc";
import { removeNewMessageAlert } from "../redux/reducer/chat";
import { TypingLoader } from "../components/layout/Loaders";
import {useNavigate} from "react-router-dom"

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const member = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if(!iAmTyping){
      socket.emit(START_TYPING,{member,chatId});
      setIAmTyping(true);
    }
    if(typingTimeout.current){
      clearTimeout(typingTimeout.current)
    } 
    typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING,{member, chatId})
      setIAmTyping(false)
    }, [2000])
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    //Emitting message to server
    socket.emit(NEW_MESSAGE, { chatId, member, message });
    setMessage("");
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, {userId:user._id, member})
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, {userId: user._id, member})
    };
  }, [chatId,member]);

  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  useEffect(()=>{
    if(chatDetails.isError){
      return navigate("/")
    }
  },[chatDetails.isError])

  const newMessagesListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("start-typing", data);
      setUserTyping(true)
    },
    [chatId]
  );

  const stopTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("stop-typing", data);
      setUserTyping(false)
    },
    [chatId]
  );

  const alertListner = useCallback(
    (data) => {
      if(data.chatId!==chatId) return;
      const messageForAlert = {
        content:data.message ,
        
        sender: {
          _id: "qwerty",
          name: "Admin",
        },
        chat:chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev)=>[...prev, messageForAlert])
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListner,
    [NEW_MESSAGE]: newMessagesListner,
    
    [START_TYPING]: startTypingListner,
    [STOP_TYPING]: stopTypingListner,
  };

  useSocketEvents(socket, eventHandler);
  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {
          userTyping && <TypingLoader/>
        }
        <div ref={bottomRef}/>
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type message here..."
            value={message}
            onChange={messageOnChange}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",

              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
