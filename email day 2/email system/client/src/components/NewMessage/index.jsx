import React, { useContext, useState } from 'react'
import Editor from '../../pages/chat/Editor'
import styles from './style.module.css'
import AddBtn from '../AddBtn';
import { TbFunction } from 'react-icons/tb';
import { axiosReq } from '../../helpers';
import { PopupContext } from '../../App';
import { UserContext } from '../../App';




const NewMessage = () => {
  const {user} = useContext(UserContext)
  const [resetKey, setResetKey] = useState(0);
  const [subject, setSubject] = useState("");
  const [member, setMember] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [members, setMembers] = useState([]);

  function addMember() {
    if(member){
    setMembers(prevState => {
        // יצירת סט עם הערכים הקיימים במערך הקודם
        const uniqueSet = new Set(prevState);
        // הוספת הערך החדש לסט
        uniqueSet.add(member);
        // המרת הסט למערך חדש והחזרתו
        return [...uniqueSet];
      });
  
    // const newArray = [...members, member];
    // setMembers(newArray);
    console.log('ערך האינפוט:', members);
    setMember('');
    setMemberList([])}
  };

  const moreDetails = {
    subject: subject,
    members: members,
  }

  async function getMemberList(e) {
    const searchString = e.target.value;
    setMember(searchString)
    if (searchString.trim() !== '') {
      try {
        const result = await axiosReq({ method: 'GET', url: `users/by-email/${searchString}` })
        const result2 = result.filter(member =>  member.email !== user.email)
        setMemberList(result2);
      } catch (e) {
        console.error(e)
      }
    } else {
      setMemberList([]);
    }
  }



  const removeMember = (memberToRemove) => {
    setMembers(prev => prev.filter(item => item !== memberToRemove));
  };












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
          <Editor key={resetKey} setResetKey={setResetKey} moreDetails={moreDetails} newMessage={true} />
        </div>

      </span>
      {/* </div> */}

    </div>
  )
}

export default NewMessage
