import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { Outlet, useNavigate } from 'react-router-dom'
import MainNav from '../../components/main/MainNav';
import LoginPage from '../../components/loginPage/Login';
import { useContext, createContext } from 'react';
export const UserContext = createContext(true);
export const ChatContext = createContext(true);
import { axiosReq } from '../../helpers';
import io from 'socket.io-client';
const socket = io('http://localhost:4004', { autoConnect: false });



const MainLayout = () => {
  const [isChangeList, setIsChangeList] = useState(true);
  const [user, setUser] = useState({});
  console.log("🚀 ~ MainLayout ~ user:", user)
  const navTo = useNavigate();

  const getUserByToken = async () => {
    try {
      if (!localStorage.token) {
        navTo("/login");
        return;
      }
      const user = await axiosReq({ url: 'auth/refresh-token', method: 'GET' });
      console.log(user);
      setUser(user);
      socket.auth = {
        userId: user._id,
        token: localStorage.token
      };
      socket.connect();
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }


  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
    socket.on('new_message', (emailSender) => {
      alert('You have a new message from ' + emailSender);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('new_message');
    };
  }, []);


  useEffect(() => {
    getUserByToken();
    return () => socket.disconnect();
  }, []);



  if (user) return (
    <UserContext.Provider value={{ user, socket }}>
      <ChatContext.Provider value={{ isChangeList, setIsChangeList }}>
        <main className={styles.layout}>
          <MainNav />
          <Outlet />
        </main>
      </ChatContext.Provider>
    </UserContext.Provider>
  )
  else return (
    <LoginPage />
  )
}

export default MainLayout







