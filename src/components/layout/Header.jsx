import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Badge
} from "@mui/material";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
  
} from "@mui/icons-material";
import React, { Suspense, useState, lazy } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth";
import { setIsMobile, setIsSearch,setIsNotification, setIsNewGroup } from "../../redux/reducer/misc";
import { resetNotification } from "../../redux/reducer/chat";

const SearchDialog = lazy(()=>import("../specific/Search"))
const NotificationDialog = lazy(()=>import("../specific/Notifications"))
const NewGroupDialog = lazy(()=>import("../specific/NewGroup"))




const Header = () => {

const dispatch = useDispatch()


  const navigate = useNavigate();
  
  const {isSearch,isNotification,isNewGroup} = useSelector((state)=>state.misc)

  const {notificationCount} = useSelector((state)=>state.chat)

  // const [isNewGroup, setIsNewGroup] = useState(false)
  

  const handleMobile = () => {
    dispatch(setIsMobile(true))
  };

  const openSearch = () => {
    dispatch(setIsSearch(true))
  };

  const openNewGroup = () => {
   dispatch(setIsNewGroup(true))
  };
  const openNotification = () =>{
    dispatch(setIsNotification(true))
    dispatch(resetNotification())
  }
  const logoutHandler = async() => {
    try {
      const { data} = await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true})
    //  console.log(data);
      dispatch(userNotExists())
      toast.success(data.message)
    

    } catch (error) {
      toast.error(error.response.data.message)
    }


  };
  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chat APP
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: "1" }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notification"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {
        isSearch && (
           <Suspense fallback={<Backdrop open/>}>
            <SearchDialog/>
           </Suspense>
        )
      }
      {
        isNotification && (
            <Suspense fallback={<Backdrop open/>}>
            <NotificationDialog/>
           </Suspense>
        )
      }
      {
        isNewGroup && (
            <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog/>
           </Suspense>
        )
      }
    </>
  );
};

const IconBtn = ({ title, icon, onClick,value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {
          value?<Badge badgeContent={value} color="error">{icon}</Badge>:icon
        }
       
      </IconButton>
    </Tooltip>
  );
};
export default Header;
