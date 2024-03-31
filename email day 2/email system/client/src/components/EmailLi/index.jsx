import React from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";

const EmailLi = () => {
    const [isFavorite, setIsFavorite] = React.useState(true)
    const [notifications, setNotifications] = React.useState(false)
    



  return (
   
    <div  className={styles.main} >
        <img className={styles.avatar} 
        onClick={()=>setNotifications(prev=>{
            return !prev
         })}
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div className={styles.middle} >
          <h3>Jessica Koel</h3>
          <p className={styles.msg}>hey jhon...</p>
        </div>
        <div className={styles.information} >
          <p className={styles.time}> 11:34</p>
         {notifications? <Badge>1</Badge>  : <BiSolidStar onClick={()=>setIsFavorite(prev=>{
            return!prev
         })} className={isFavorite ?styles.isFavorite : styles.notFavorite }/>}
       

        </div>

        
      </div>
  )
}

export default EmailLi
