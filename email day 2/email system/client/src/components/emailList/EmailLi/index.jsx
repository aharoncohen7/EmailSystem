import React from 'react'
import styles from './style.module.css'
import Badge from '../Badge'
import { BiSolidStar } from "react-icons/bi";

const EmailLi = ({item}) => {
    const [isFavorite, setIsFavorite] = React.useState(true)

    



  return (
   
<div className={styles.main}>
        <img className={styles.avatar} 
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        <div className={styles.middle} >
          <h3>Jessica Koel</h3>
          <p className={styles.msg}>{item.email.subject? item.email.subject : "hlloe jon.."}</p>
        </div>
        <div className={styles.information} >
          <p className={styles.time}> 11:34</p>
         {!item.isRead? <Badge>1</Badge>  : <BiSolidStar onClick={()=>{
         
            item.isFavorite = !item.isFavorite;
          
         }} className={item.isFavorite ?styles.isFavorite : styles.notFavorite }/>}
       

        </div>

        
      </div>
  )
}

export default EmailLi
