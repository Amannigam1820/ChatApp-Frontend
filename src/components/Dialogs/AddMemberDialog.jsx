import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAddGroupMembersMutation,
  useAvailableFriendQuery,
} from "../../redux/api/api";
import { useSelector, useDispatch } from "react-redux";
import { setIsAddMember } from "../../redux/reducer/misc";

const AddMemberDialog = ({ chatId }) => {
  
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendQuery(chatId);

  console.log(data?.availableFriends
  );

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
     addMembers("Adding members....",{members:selectedMembers, chatId})
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends.length > 0 ? (
            data?.availableFriends.map((i) => (
              <UserItem
                key={i.id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends Alone wolfs</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
