import React, { useContext, useEffect, useState } from 'react'
import EmailLi from '../EmailLi'
import InputSearch from '../InputSearch'
import styles from './style.module.css'
import { NavLink, useParams } from 'react-router-dom'
import useAxiosReq from '../../../hooks/useAxiosReq';


const flags = {
    "inbox": "inbox",
    "sent emails": "send",
    "favorite": "favorite",
    "deleted": "deleted",
    "draft": "draft"
}

const EmailLIst = () => {
    const [input, setInput] = useState('')
    const [change, setChange] = useState(false)
    const {chatType } = useParams()
    const filter = flags[chatType]
    console.log(filter);
   

    const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'POST', url: `user-chats/chat-list`, body: { flags: [ `${filter}`], input: input }})


    useEffect(() => {
      // setInterval(() => {
         fetchData() 
        // }, 3000 * 60);
  }, [chatType, input, change]);



    return (
        <div className={styles.mainContainer}>

            <div className={styles.main}>
                <div className={styles.header}>
                    <InputSearch sendInput={setInput} />

                </div>

               <span className={styles.emailList}>
               {data.length &&
                    data.map((item, index) => {
                        return (
                            <NavLink
                                key={item._id}
                                to={`${item.chat._id}`}
                                className={({ isActive }) =>
                                    `${isActive ? styles.active : ""} ${styles.box}`
                                }
                                style={({ isActive }) => isActive ? { boxShadow: "0px 3px 6px rgb(212, 210, 210)" } : {}}

                            >


                                <EmailLi item={item} setChange={setChange}/>
                            </NavLink>

                        )
                    })
                }
               </span>

            </div>


        </div>
    )
}

export default EmailLIst;




// בקשה בלי HOOK 


// import axios from 'axios';
// const [filteredEmailList, setFilteredEmailList] = React.useState([]);
// const getChatsByChatType = async () => {
//   try {
//     const url = `http://localhost:4004/api/user-chats/by-plag/${filter}`;
//     const response = await axios.get(url, {
//       // flags: ["notread", `${filter}`]
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         // 'authorization': localStorage.getItem('Authorization') || ''
//       }
//     });
//     if (!response.data) {
//       if (response.status === 401) {
//         // Handle unauthorized access
//       }
//       throw new Error(`Network response was not ok! status: ${response.status}`);
//     }
//     console.log(response.data);
//     setFilteredEmailList(response.data);
//   } catch (error) {
//     console.error("Error fetching p:", error);
//   }
// };

// useEffect(() => {
//     getChatsByChatType();
// }, [chatType, input, change]);

// חיפוש פנימי לא עובד כרגע
// useEffect(() => {
//     const basicFilter = () => {
//         const newEmailList = filteredEmailList.filter((item) => {
//             return item[filter] && item.email.subject.toLowerCase().includes(input.toLowerCase());
//         })
//         setFilteredEmailList(newEmailList)
//     }
//     basicFilter()
// }, [chatType, input])










    //  חיפוש פנימי - מבוטל
    // const searchFilter = (input) => {
    //     // if(!input){
    //     //     setFilteredEmailList1(filteredEmailList1)
    //     // }
    //     const newEmailList = filteredEmailList1.filter((item) => {
    //         return item.email.subject.toLowerCase().includes(input.toLowerCase())
    //     })
    //     setFilteredEmailList2(newEmailList)
    // }


    // useEffect(() => {
    //     const basicFilter2 = ()=>{ 
    //         const newEmailList = filteredEmailList1.filter((item) => {
    //             return item.email.subject.toLowerCase().includes(input.toLowerCase())
    //         })
    //         setFilteredEmailList1(newEmailList)
    //     }
    //     basicFilter2()
    // },[input])
