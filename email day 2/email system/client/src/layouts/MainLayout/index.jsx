import React from 'react'
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'
import MainNav from '../../components/main/MainNav';

const MainLayout = () => {
  const isConnected = true;
  if (!isConnected) return (<h1>login</h1>)
  else return (
    <main className={styles.layout}>
       
      <MainNav />
      <Outlet />
     
    </main>
  )
}

export default MainLayout







