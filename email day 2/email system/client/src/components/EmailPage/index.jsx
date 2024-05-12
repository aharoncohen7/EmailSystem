import React, { useContext, useEffect, useState } from 'react'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import { ChatContext, } from '../../App';


const EmailPage = ({ }) => {
  const [isExpand, setIsExpand] = useState(false);
  const { chat } = useContext(ChatContext)

  return (
    <div className={styles.main}>
      <EmailTitle />
      <div className={styles.list}>
        {chat?.msg && chat.msg.map((msg) => (
          <div key={msg._id} className={styles.msgLi}>
            <MsgLi msg={msg} isExpand={isExpand} setIsExpand={setIsExpand} />
          </div>
        ))}
      </div>

    </div>
  )
};

export default EmailPage;



