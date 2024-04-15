import React, { useCallback, useEffect , useRef, useState} from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samplechats } from "../../constants/sampledata";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile , setIsDeleteMenu, setSelectedDeleteChat} from "../../redux/reducer/misc";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducer/chat";
import { useErrors, useSocketEvents } from "../../hooks/hooks";
import { getSocket } from "../../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { getOrSaveFromStorage } from "../../lib/feature";
// import DeleteChatMenu from "../Dialogs/DeleteChatMenu";
import DeleteChat from "../Dialogs/DeleteChat";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const navigate = useNavigate()
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const deleteMenuAnchor = useRef(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const socket = getSocket();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    // console.log(data);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true))
      
       deleteMenuAnchor.current = e.currentTarget
      dispatch(setSelectedDeleteChat({chatId,groupChat}))
      
     
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const newMessageAlertListner = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListner = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchtListner = useCallback(() => {
      refetch()
      navigate("/")
    }, [refetch,navigate]);

    const onlineUserListner = useCallback((data)=>{
      setOnlineUsers(data)
     // console.log(data);
    },[])


    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListner,
      [NEW_REQUEST]: newRequestListner,
      [REFETCH_CHATS]:refetchtListner,
      [ONLINE_USERS] : onlineUserListner

    };

    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <Header />
        <DeleteChat dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
              onlineUsers={onlineUsers} 
            />
          </Drawer>
        )}
        <Grid container style={{ height: "calc(100vh - 4rem)" }}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
                onlineUsers={onlineUsers} 
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.75)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
