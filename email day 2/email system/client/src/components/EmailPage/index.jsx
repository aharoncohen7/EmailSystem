import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import axios from 'axios';
import { axiosReq } from '../../helpers';
import { ChatContext, UserContext } from '../../App';





const EmailPage = ({ }) => {
  const [isExpand, setIsExpand] = useState(false);
  const {  chat } = useContext(ChatContext)
//   const { chatId } = useParams()
//   const [data, setData] = useState({});
//  useEffect(() => {
//   const getChat = async () => {
//     const {chat} = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
//     setData(chat)
//   };
//   getChat()
// }, [chatId, change]);


  //  קבלת צ'אט
  // const [data, setData] = useState({});
  // const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'GET', url: `chats/${chatId}` })

  // useEffect(() => {
  //   fetchData()
  // }, [change]);

  // useEffect(() => {
  //   const getChat = async () => {
  //     const {chat} = await axiosReq({ method: 'GET', url: `user-chats/${chatId}` })
  //     setData(chat)
  //   };
  //   getChat()
  // }, [chatId, change]);
  


  return (
    <div className={styles.main}>
        <EmailTitle />
        <div className={styles.list}>
          {chat.msg && chat.msg.map((msg) => (
            <div key={msg._id} className={styles.msgLi}>
              <MsgLi msg={msg} isExpand={isExpand} setIsExpand={setIsExpand} />
            </div>
          ))}
        </div>
  
    </div>
  )
};

export default EmailPage;





// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import styles from './style.module.css'
// import MsgLi from '../MsgLi';
// import EmailTitle from '../EmailTitle';
// import { formatDateTime } from './../../helpers/index.js'
// import useAxiosReq from '../../hooks/useAxiosReq.js';

// const EmailPage = ({ change }) => {
//   const { chatId } = useParams()
//   // console.log(chatId);
//   const [isExpand, setIsExpand] = useState(false);





//   const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'GET', url: `chats/${chatId}` })


//   useEffect(() => {
//        fetchData()
// }, [change]);

 

//   return (
//     <div className={styles.main}>
//       <>
//         <EmailTitle date={data?.lastDate ? formatDateTime(data.lastDate) : "00:00"} subject={data.subject} />
//         <div className={styles.list}>
//           {data.msg && data.msg.map((msg) => (
//             <div key={msg._id} className={styles.msgLi}>
//               <MsgLi msg={msg} chatToShow={data}  isExpand={isExpand} setIsExpand={setIsExpand} />
//             </div>
//           ))}
//         </div>
//       </>
//     </div>
//   )
// }

// export default EmailPage




// //  // קבלת צ'אט
//   // const [itemChat, setItemChat] = useState({});
// //  useEffect(() => {
//   // import axios from 'axios';
// //   const getChat = async () => {
// //     try {
// //       const url = `http://localhost:4004/api/chats/${chatId}`;
// //       const response = await axios.get(url, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // 'authorization': localStorage.getItem('Authorization') || ''
// //         }
// //       });
// //       if (!response.data) {
// //         console.log();
// //         if (response.status === 401) {
// //           // Handle unauthorized access
// //         }
// //         throw new Error(`Network response was not ok! status: ${response.status}`);
// //       }
// //       console.log("this chat 😊🐱‍💻", response.data);
// //       setItemChat(response.data);
// //     } catch (error) {
// //       console.error("Error fetching :", error);
// //     }
// //   };
// //   getChat()
// // }, [chatId, change]);