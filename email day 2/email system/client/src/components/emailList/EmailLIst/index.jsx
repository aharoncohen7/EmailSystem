import React, { useContext, useEffect, useRef, useState } from 'react'
import EmailLi from '../EmailLi'
import InputSearch from '../InputSearch'
import styles from './style.module.css'
import { NavLink, useParams } from 'react-router-dom'
import useAxiosReq from '../../../hooks/useAxiosReq';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { ChatContext } from '../../../App'



const flags = {
    "inbox": "inbox",
    "sent emails": "send",
    "favorite": "favorite",
    "deleted": "deleted",
    "draft": "draft"
}

const EmailList = ({changeList, setChangeList}) => {
    //  const {changeList} = useContext(ChatContext)
    const [input, setInput] = useState('')
    const [page, setPage] = useState(1);
    const {chatType } = useParams()
    const filter = flags[chatType]
    const scrollableRef = useRef(null);
    const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'POST', url: `user-chats/chat-list`, body: { flags: [ `${filter}`],pageNumber: page , input: input }})

    
    useEffect(() => {
        setPage(1)
        fetchData() 
        console.log("qwertyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    }, [chatType, input, changeList ]);


    useEffect(() => {
      if(page!=1){
         fetchData()}
  }, [page]);


  const handleScroll = () => {
    const { current } = scrollableRef;
    if (current.scrollTop === 0 && page>1) {
        setPage(prevPage => prevPage -1);} 
        // console.log();(page)
        if (current.scrollTop + current.clientHeight === current.scrollHeight) {
          setPage(prevPage => prevPage + 1);
          // console.log();(page)
    }
  };



    return (
        <div className={styles.mainContainer}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <InputSearch sendInput={setInput} loading={loading} />
                </div>

                <span className={styles.emailList}
                ref={scrollableRef} 
                onScroll={handleScroll}
                >
{(page>1) ? <span className={styles.noResults}><FaCaretUp onClick={()=>setPage(prevPage => prevPage -1)}/></span>: null}
  {data.length ?
    data.map((item, index) => {
      return (
        <NavLink
          key={item._id}
          to={`${item._id}`}
          className={({ isActive }) =>
            `${isActive ? styles.active : ""} ${styles.box}`
          }
          style={({ isActive }) =>
            isActive ? { boxShadow: "0px 3px 6px rgb(212, 210, 210)" } : {}
          }
        >
          <EmailLi item={item} setChangeList={setChangeList} />
        </NavLink>
      );
    }) : null}
  
                     {(data.length && data.length ==7) ? <span   className={styles.noResults}><FaCaretDown onClick={()                   =>setPage(prevPage => prevPage +1)}/></span>: null}
                     {(!data.length && !loading && page==1) ? (<span  className={styles.noResults}>אין תוצאות</span>) :  null}
                   </span>
                     {loading && <span className={styles.noResults}>loading...</span>}


            </div>
        </div>
    )
}

export default EmailList;




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
