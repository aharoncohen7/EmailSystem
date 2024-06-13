import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

import EmailLi from '../EmailLi'
import InputSearch from '../InputSearch'
import styles from './style.module.css'
import useAxiosReq from '../../../hooks/useAxiosReq';
import { ChatContext } from '../../../layouts/MainLayout';

const flags = {
  "inbox": "inbox",
  "sent emails": "send",
  "favorites": "favorites",
  "deleted": "deleted",
  "drafts": "drafts"
}

const EmailList = (
  // {isChangeList, setIsChangeList}
) => {
  const { isChangeList, setIsChangeList } = useContext(ChatContext)
  const [input, setInput] = useState('')
  const [page, setPage] = useState(1);
  const { chatType } = useParams()
  const filter = flags[chatType]
  const scrollableRef = useRef(null);
  const { loading, data, error, fetchData } = useAxiosReq({ defaultVal: {}, method: 'POST', url: `user-chats/chat-list`, body: { flags: [`${filter}`], pageNumber: page, input: input } })


  useEffect(() => {
    setPage(1)
    fetchData()
  }, [chatType, input, isChangeList]);


  useEffect(() => {
    if (page != 1) {
      fetchData()
    }
  }, [page]);


  const handleScroll = () => {
    const { current } = scrollableRef;
    if (current.scrollTop === 0 && page > 1) {
      setPage(prevPage => prevPage - 1);
    }
    if (current.scrollTop + current.clientHeight === current.scrollHeight) {
      setPage(prevPage => prevPage + 1);

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
         
          {(page > 1) ? <span className={styles.noResults}><FaCaretUp onClick={() => setPage(prevPage => prevPage - 1)} /></span> : null}
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
                  <EmailLi item={item} setIsChangeList={setIsChangeList} />
                </NavLink>
              );
            }) : null}

          {(data.length && data.length == 7) ? <span className={styles.noResults}><FaCaretDown onClick={() => setPage(prevPage => prevPage + 1)} /></span> : null}
          {(!data.length && !loading && page == 1) ? (<span className={styles.noResults}>אין תוצאות</span>) : null}
        </span>
        {loading &&<div className="loading" > <div  className="spinner"></div></div>}
        {/* {loading && <span className={styles.noResults}>loading...</span>} */}


      </div>
    </div>
  )
}

export default EmailList;
