import { useState } from 'react';
import styles from './style.module.css'
import { BiSolidShare } from "react-icons/bi";
import { setDateAndTime } from "./../../helpers/index.js"

export const MsgLi = ({ msg, thisUser, setIsExpand, isExpand }) => {
  console.log(msg._id);
  const isSent = msg.from == thisUser.emailAddress;
  const isThisExpand = isExpand == msg._id;

  const hendelClick = () => {
    setIsExpand((prev) => {
      if (prev == msg._id) { return false } else { return msg._id }
    })
  }




return (
  <>
    {/* מיכל ראשי */}
    <div onClick={hendelClick} className={styles.main}>


      {/* הודעה מכווצת */}
      <div className={styles.collapsedMessage}>
        
        
        {/* מחבר הודעה1 */}
        {isSent ?
         <span className={styles.senderYou} ><BiSolidShare className={styles.svg} /><h3 >You</h3></span>
          :
          <div className={styles.senderAnothers}>
            <img src="https://media.cnn.com/api/v1/images/stellar/prod/231218193302-bill-gates-portrait-121823.jpg?q=w_1110,c_fill" alt="" />
            <div className={styles.name} >
              <h3>Jessica Koel</h3>
            </div>
          </div>
        }

        {/* 2תוכן מקוצר הכותרת */}
        {!isThisExpand && <p className={styles.partialContent}> {msg.content} </p>}
       
       
        {/* תאריך3 */}
        <span className={styles.date}>{setDateAndTime(msg.date)}</span>
      </div>
    </div>



    {/* תוכן מלא */}
    {isThisExpand && <p className={styles.fullContent}>
      {msg.content}
    </p>}


  </>
)
}
export default MsgLi