import React, { useContext } from 'react'
import styles from './style.module.css'
import { formatDateTime } from '../../helpers'
import { ChatContext } from '../../App'

const EmailTitle = ({ }) => {
    const { chat } = useContext(ChatContext)

    return (
        <div className={styles.main} >
            <span className={styles.title}>
                <span className={styles.time}>{chat?.lastDate ? formatDateTime(chat.lastDate) : "00:00"}</span>
                <h2 className={styles.subject}>{chat.subject}</h2>
            </span>
            <span className={styles.avatarContainer}>
                {chat?.members && chat.members.map((member, index) => (
                    <img
                        key={index}
                        className={styles.avatar}
                        src={member.avatar ? member.avatar : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt=""
               
                    />
                ))}
            </span>
        </div>

    )
}

export default EmailTitle
