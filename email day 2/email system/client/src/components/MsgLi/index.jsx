import { useState } from 'react';
import styles from './style.module.css'
import { BiSolidShare } from "react-icons/bi";
import { formatDateTime } from "./../../helpers/index.js"
import DomPurify from 'dompurify';



export const MsgLi = ({ msg, chatToShow, thisUser, setIsExpand, isExpand }) => {

  console.log(msg.content);
  const isSent = msg.from == thisUser._id;
  const isThisExpand = isExpand == msg._id;

  const hendelClick = () => {
    setIsExpand((prev) => {
      if (prev == msg._id) { return false } else { return msg._id }
    })
  }


  function getSender() {
    // מוצא את המשתמש המתאים בעזרת המזהה של השולח
    return chatToShow.members.find(member => member._id == msg.from);

  };
  const sanitizedHTML = DomPurify.sanitize(msg.content);
  // const sanitizedHTML = DomPurify.sanitize(msg.content, {
  //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
  //   ALLOWED_ATTR: ['style'],
  // });

  const fff = `<span style="color: yellow;">
  <span  
  dir="rtl"
   style=
  "text-decoration: none;
  font-style: normal;
  font-weight: normal;
  text-align: right;"
  
> what is <span style="color: yellow;">your</span> <span style="color: green;">favorite</span> ? </span></span>`



  return (
    <>
      {/* מיכל ראשי */}
      <div onClick={hendelClick} className={styles.main}>


        {/* הודעה מכווצת */}
        <div className={styles.collapsedMessage}>


          {/* מחבר הודעה1 */}
          {isSent ?
            <span className={styles.senderYou} ><span className={styles.avatar}>
              <BiSolidShare className={styles.svg} /></span><h3 className={styles.name}>You</h3></span>
            :
            <div className={styles.senderAnothers}>
              <img
              className={styles.avatar}
              src=
                {getSender() ? getSender().avatar :
                  "https://media.cnn.com/api/v1/images/stellar/prod/231218193302-bill-gates-portrait-121823.jpg?q=w_1110,c_fill"}
                alt="" />
              <div className={styles.name} >
                <h3>{getSender() ? getSender().fullName : "Unknown"}</h3>
              </div>
            </div>
          }

          {/* 2תוכן מקוצר הכותרת */}
          {!isThisExpand && <p className={styles.partialContent}> {msg.content.replace(/<[^>]+>/g, '')} </p>}


          {/* תאריך3 */}
          <span className={styles.date}>{formatDateTime(msg.date)}</span>
        </div>
      </div>



      {/* תוכן מלא */}
      {isThisExpand && <span className={styles.fullContent}  >
        <div className={styles.conent} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </span>}


    </>
  )
}
export default MsgLi