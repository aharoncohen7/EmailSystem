import React from 'react'
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'
import MainNav from '../../components/main/MainNav';
import LoginPage from '../../components/loginPage/Login';
import { useContext } from 'react';
import { UserContext } from '../../App';


const MainLayout = () => {
  const {user} = useContext(UserContext);
  if (user) return (
      <main className={styles.layout}>
        <MainNav />
        <Outlet />
      </main>
  )
  else return (
      <LoginPage />
  )
}

export default MainLayout







