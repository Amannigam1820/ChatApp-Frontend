import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotofication } from "../../constants/sampledata";
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";
import {useSelector,useDispatch} from "react-redux"
import {setIsNotification} from "../../redux/reducer/misc"
import toast from "react-hot-toast";



const Notifications = () => {

  const dispatch = useDispatch()
  const {isNotification} = useSelector((state)=>state.misc)
  
  const { isLoading, data, error, isError } = useGetNotificationQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async({ _id, accept }) => {
    dispatch(setIsNotification(false))
    try {
     const res =  await acceptRequest({requestId:_id, accept})
     console.log(res);
     if(res.data?.success){
      console.log("Use Socket here");
      toast.success(res.data.Message
      )
     }else{
      //toast.error(res.data?.message || "Something went wrong")

     }
    } catch (error) {
      console.log(error);
      //toast.error(error.message || "Something went wrong")
    }
  };

  useErrors([{ error, isError }]);
 // console.log(data);

  const onCloseHandler = () =>{
    dispatch(setIsNotification(false))
  }

  return (
    <Dialog open={isNotification} onClose={onCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
