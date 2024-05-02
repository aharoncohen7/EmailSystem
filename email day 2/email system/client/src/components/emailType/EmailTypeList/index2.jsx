
// import React, { useEffect, useState } from 'react';
// import { BsPencilFill } from "react-icons/bs";
// import { FaChevronLeft, FaEnvelope, FaStar, FaTrash } from "react-icons/fa";
// import { FiSend } from "react-icons/fi";
// import { MdOutlineExpandMore } from "react-icons/md";
// import { HiMiniInboxArrowDown } from "react-icons/hi2";
// import { RiSpam2Line } from "react-icons/ri";
// import { NavLink } from "react-router-dom";
// import styles from './style.module.scss';



// import Button from '../Button';
// import DropDown from '../DropDown';
// import LabelTag from '../LabelTag';
// import { axiosReq } from '../../functions/axiosReq';
// import useAxiosReq from '../../hooks/useAxiosReq';

// const links = [
//   { text: "Inbox", href: "inbox", icon: <HiMiniInboxArrowDown />, inServer: 'inbox' },
//   { text: "Sent Emails", href: "sent", icon: <FiSend />, inServer: 'isSent' },
//   { text: "Favorites", href: "favorites", icon: <FaStar />, inServer: 'isFavorite' },
//   { text: "Drafts", href: "drafts", icon: <BsPencilFill />, inServer: 'isDraft' },
//   { text: "Deleted", href: "deleted", icon: <FaTrash />, inServer: 'isDeleted' },
// ];


// const labels = [
//   { text: 'work', color: '#B3BDCC' },
//   { text: 'work in progress', color: '#FD5E5E' },
//   { text: 'personal', color: '#FFD700' }, // Gold
//   { text: 'urgent', color: '#FF6347' }, // Tomato
//   { text: 'important', color: '#FFA07A' }, // Light Salmon
//   { text: 'family', color: '#6495ED' }, // Cornflower Blue
//   { text: 'social', color: '#FFB6C1' }, // Light Pink
// ];

const Navigation = () => {
  // const { loading, data, error , fetchData} = useAxiosReq({ defaultVal: {}, method: 'GET', url: 'chat/not-read' })

  // useEffect(() => {
  //  setInterval(()=> {fetchData()}, 1000*60)
  // }, [])
  

  return (
    <div className={styles.main}>
      <figure>
        <button><FaChevronLeft /></button>
        <h1>Mailbox</h1>
      </figure>
      {/* <Button type='link' href='new-message' mode='normal' className={styles.button} >
        <FaEnvelope /> <span> New message</span>
      </Button> */}
      <nav className={loading ? 'loading' : ''}>
        <ul className={styles.links}>
          {links.map((link) => <MsgLink {...link} key={link.href} />)}
          <DropDown
            title={
              <li className={styles.li}>
                <MdOutlineExpandMore />
                <span> More</span>
                <div></div>
              </li>
            }
            style={{ top: '100%' }}
          >
            <MsgLink icon={<RiSpam2Line />} href={'spam'} text={'Spam'} />
          </DropDown>

        </ul>
      </nav>
      <div className={styles.labels}>

        <h3>labels</h3>
        <ul>
          {labels.map(label =>
            <li key={label.text}><LabelTag color={label.color} />{label.text}</li>)}
        </ul>
      </div>
    </div>
  );
};


const MsgLink = ({ icon, href, text }) => (<li key={href}>
  <NavLink
    to={href}
    className={({ isActive }) => isActive ? styles.active : ''}
  >
    {icon}
    <span> {text}</span>
    <div></div>
  </NavLink>
</li>)

export default Navigation;
