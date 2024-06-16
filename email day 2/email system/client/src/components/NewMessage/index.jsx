import React, { useContext, useEffect, useState } from 'react'
import Editor from '../../pages/chat/Editor'
import styles from './style.module.css'
import AddBtn from '../AddBtn';
import { TbFunction } from 'react-icons/tb';
import { axiosReq } from '../../helpers';
import { PopupContext } from '../../App';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../layouts/MainLayout';




const NewMessage = () => {
  const navTo = useNavigate()
  const { user, socket } = useContext(UserContext)
  const [resetKey, setResetKey] = useState(0);
  const [subject, setSubject] = useState("");
  const [member, setMember] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [members, setMembers] = useState([]);




  // קבלת רשימת נמענים אופצונלית לפי אינפוט
  async function getMemberList(e) {
    const searchString = e.target.value;
    setMember(searchString)
    if (searchString.trim() !== '') {
      try {
        const result = await axiosReq({ method: 'GET', url: `users/by-email/${searchString}` })
        const result2 = result.filter(member => member.email !== user.email)
        setMemberList(result2);
      } catch (e) {
        console.error(e)
      }
    } else {
      setMemberList([]);
    }
  }

  //  הוספת נמען מתוך הרשימה
  function addMember() {
    if (member) {
      setMembers(prevState => {
        // יצירת סט עם הערכים הקיימים במערך הקודם
        const uniqueSet = new Set(prevState);
        // הוספת הערך החדש לסט
        uniqueSet.add(member);
        // המרת הסט למערך חדש והחזרתו
        return [...uniqueSet];
      });
      setMember('');
      setMemberList([])
    }
  };

  //ביטול הוספת נמען
  const removeMember = (memberToRemove) => {
    setMembers(prev => prev.filter(item => item !== memberToRemove));
  };


  //  יצירת צ'אט חדש
  const createNewChat = async (body) => {
    // console.log(body);
    if (subject.trim() == "" || members.length === 0) {
      alert("please fill all the fields")
      return;
    }
    try {
      // console.log(body.image);
      const result = await axiosReq({
        method: 'POST',
        url: 'chats/',
        body: { ...body, subject, members }
      })
      if (result) {
        socket.emit('message', {
          msg: "new message",
          senderId:  user._id,
          senderEmail:  user.email,
          receivers:  members,
          ref:  result,
          isNewChat: true
        })
        navTo(`/chats/sent emails/${result}`)
      }
      else {
        alert('הטקסט לא נשלח')
      }

    } catch (e) {
      alert("Failed to send message")
      console.error(e)
    }
  }



  return (
    <div className={styles.main}>
      <span className={styles.header}> <h2>New message</h2></span>
      {/* <div className={styles.editorBox}> */}
      <span className={styles.editor}>
        <span className={styles.inputs}>
          <span className={styles.line}><h2>subject </h2><input onChange={(e) => setSubject(e.target.value)} className={styles.input} type="text" placeholder='subject...' /></span>

          <span className={styles.line}><h2>members </h2><input value={member} onChange={(e) => getMemberList(e)} className={styles.input} type="text" />
            <span onClick={addMember}> <AddBtn /></span>


          </span>
          {members.length ? <span className={styles.line}>
            <ul className={styles.memberList}>{members.map(member => {
              return (
                <li key={member} className={styles.member}> {member} <button className={styles.deleteMember} onClick={() => removeMember(member)}>X</button></li>)

            })}
            </ul>
          </span>
            : null}

          {memberList.length ? <span className={styles.list}>
            <ul className={styles.emailListFound}>
              {
                memberList.map(member => {
                  return (
                    <li key={member.email} className={styles.emailFound} onClick={() => setMember(member.email)}>
                      {member.email}
                    </li>
                  )
                })}
            </ul>
          </span>
            : null}
        </span>
        <div className={styles.editorBox} style={{ width: "100%" }}>
          <h2 >Message</h2>
          <Editor key={resetKey} setResetKey={setResetKey} onSend={createNewChat} />
        </div>
      </span>
    </div>
  )
}

export default NewMessage
