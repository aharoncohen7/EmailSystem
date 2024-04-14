
import styles from './style.module.css'
import DomPurify from 'dompurify';
import MsgContent from '../MsgContent/index.jsx';
import { BiSolidShare } from "react-icons/bi";
import { formatDateTime } from "./../../helpers/index.js"


// יחידה הודעה בצ'אט
export const MsgLi = ({ msg, chatToShow, thisUser, setIsExpand, isExpand }) => {
  const youSent = msg.from == thisUser._id;
  const isThisExpand = isExpand == msg._id;

  // בוחר הודעה מורחבת
  const handelExpand = () => {
    setIsExpand((prev) => {
      if (prev == msg._id) { return false } else { return msg._id }
    })
  }
 // מוצא את המשתמש המתאים בעזרת המזהה של השולח
  function getSender() {
    return chatToShow.members.find(member => member._id == msg.from);
  };
  // ניטור הודעה
  const sanitizedHTML = DomPurify.sanitize(msg.content);


  return (
    <>
      {/* מיכל ראשי */}
      <div onClick={handelExpand} className={styles.main}>

        {/*   פרטי הודעה + הודעה מכווצת */}
        <div className={styles.collapsedMessage}>
          {/* מחבר הודעה1 */}
          {youSent ?
            <span className={styles.youSend} ><span className={styles.avatar}>
              <BiSolidShare className={styles.svg} />
              </span>
              <h3 className={styles.name}>You</h3>
              </span>
            :
            <div className={styles.othersSend}>
              <img className={styles.avatar}
                src=
                {getSender() ? getSender().avatar :
                  "https://media.cnn.com/api/v1/images/stellar/prod/231218193302-bill-gates-portrait-121823.jpg?q=w_1110,c_fill"}
                alt="" />
              <div className={styles.name} >
                <h3>{getSender() ? getSender().fullName : "Unknown"}</h3>
              </div>
            </div>
          }

         {/* תוכן הודעה מקוצר ללא עיצוב */}
          {!isThisExpand && <p className={styles.partialContent}> {sanitizedHTML.replace(/<[^>]+>/g, '')} </p>}


          {/* תאריך אחרון */}
          <span className={styles.date}>{formatDateTime(msg.date)}</span>
        </div>
      </div>

      {/* מורחב - תוכן מלא ומעוצב*/}
      {isThisExpand && <span className={styles.fullContent}  >
         <MsgContent msgContent={msg.content} />
      </span>}


    </>
  )
}
export default MsgLi