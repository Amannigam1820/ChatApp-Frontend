import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Skeleton
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {setIsNewGroup} from "../../redux/reducer/misc"
import toast from "react-hot-toast";


const NewGroup = () => {
  const {isNewGroup}  = useSelector((state)=>state.misc)
  const groupName = useInputValidation("");
  const dispatch = useDispatch();
  const { isError, isLoading, error, data } = useAvailableFriendQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)


  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  // console.log(selectedMembers);
  const submitHandler = () => {
    if(!groupName.value){
      return toast.error("Group name is required");
    }
    if (selectedMembers.length < 2)
    return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group.....",{name:groupName.value, members:selectedMembers})


    closeHandler();
    
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant="h5">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack >
          { isLoading ? <Skeleton/> :  data?.friends?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler} disabled={isLoadingNewGroup}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
