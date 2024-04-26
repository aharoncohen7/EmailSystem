import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import MsgLi from '../MsgLi';
import EmailTitle from '../EmailTitle';
import { formatDateTime } from './../../helpers/index.js'
import useAxiosReq from '../../hooks/useAxiosReq.js';
import axios from 'axios';

const EmailPage = React.memo(({ change, thisUser }) => {
  const { chatId } = useParams()
  const [isExpand, setIsExpand] = useState(false);

 

  // const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'GET', url: `chats/${chatId}` })

  // useEffect(() => {
  //   fetchData()
  // }, [change]);


  //  קבלת צ'אט
  const [data, setData] = useState({});

 useEffect(() => {
  const getChat = async () => {
    try {
      const url = `http://localhost:4004/api/user-chats/by-chat-id/${chatId}`;
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': localStorage.getItem('Authorization') || ''
        }
      });
      // console.log(response);
      if (!response.data) {
        console.log();
        if (response.status === 401) {
          // Handle unauthorized access
        }
        throw new Error(`Network response was not ok! status: ${response.status}`);
      }
      // console.log("this chat 😊🐱‍💻", response.data);
      setData(response.data.chat);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };
  getChat()
}, [chatId, change]);

  return (
    <div className={styles.main}>
      <>
        <EmailTitle date={data?.lastDate ? formatDateTime(data.lastDate) : "00:00"} subject={data.subject} />
        <div className={styles.list}>
          {data.msg && data.msg.map((msg) => (
            <div key={msg._id} className={styles.msgLi}>
              <MsgLi msg={msg} chatToShow={data} thisUser={thisUser} isExpand={isExpand} setIsExpand={setIsExpand} />
            </div>
          ))}
        </div>
      </>
    </div>
  )
});

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



//   // יוזר לדוגמה
//   const thisUser = {
//     email: "user1@example.com",
//     _id: "6617d4a80c4b7ac054155405",
//     fullName: "Moshe Cohen",
//     password: "123qwe",
//     avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Yellow",
//   }

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
//               <MsgLi msg={msg} chatToShow={data} thisUser={thisUser} isExpand={isExpand} setIsExpand={setIsExpand} />
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