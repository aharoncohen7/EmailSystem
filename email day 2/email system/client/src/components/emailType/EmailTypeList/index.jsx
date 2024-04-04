import React, { useState } from 'react'
import styles from './style.module.css'
import { NavLink } from 'react-router-dom';

import { FaPen } from "react-icons/fa";
import { HiInboxArrowDown } from "react-icons/hi2";
import { FiSend } from "react-icons/fi";

import { TiStarFullOutline } from "react-icons/ti";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { TbAlertHexagon } from "react-icons/tb";
import Badge from '../../emailList/Badge';


const emailTypeIcons = [

    { icon: HiInboxArrowDown, name: "Inbox" },
    { icon: FiSend, name: "Sent Emails" },
    { icon: TiStarFullOutline, name: "Favorite" },
    { icon: BsFillPencilFill, name: "Draft" },
    { icon: MdDelete, name: "deleted" },
    // { icon: MdExpandMore, name: "More" }
]


const EmailTypeList = () => {
    const [isHovering, setIsHovering] = useState(false);


    return (
        <ul className={styles.ul}>

            {emailTypeIcons.map((obj) => (
                <NavLink
                    key={obj.name}
                    to={`${obj.name.toLowerCase()}`}
                    className={({ isActive }) =>
                        `${isActive ? styles.active : ""} ${styles.box}`
                    }
                >

                    <li className={styles.li} title={obj.name}>
                        <obj.icon className={styles.icon} />
                        <span className={styles.name}>{obj.name}</span>
                        <Badge>4</Badge>
                    </li>

                </NavLink>
            ))}

            <span

                className={styles.more}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <li className={`${styles.li} ${styles.li2}`} title={"more"}>

                    <MdExpandMore className={styles.icon} />

                    <span >more</span>

                    {isHovering && <div className={styles.hiddenList}>

                        <NavLink
                            className={styles.hiddenItem}
                            to={"spam"}
                            title='spam'
                        ><TbAlertHexagon /><span>Spam</span></NavLink>

                    </div>}
                </li>

            </span>
        </ul>


    )
}


export default EmailTypeList

