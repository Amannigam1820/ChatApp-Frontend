import React, { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import {Toaster} from "react-hot-toast"
import {SocketProvider} from "../socket"

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));

// let user = true;

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios                             
      .get(`${server}/api/v1/user/me`, {withCredentials:true})
      .then(({data}) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route
            path="/"
            element={
              <SocketProvider>
                <ProtectRoute user={user}>
                <Home />
              </ProtectRoute>
              </SocketProvider>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <SocketProvider>
                <ProtectRoute user={user}>
                <Chat />
              </ProtectRoute>
              </SocketProvider>
            }
          />
          <Route
            path="/groups"
            element={
              <SocketProvider>
                <ProtectRoute user={user}>
                <Group />
              </ProtectRoute>
              </SocketProvider>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};

export default App;
