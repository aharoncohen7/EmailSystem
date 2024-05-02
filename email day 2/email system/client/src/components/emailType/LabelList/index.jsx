import React from 'react'
import Label from '../Label';
import styles from './style.module.css'
import { IoMdMore } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const labeledColors = [
    { name: "Work", color: '#B3BDCC' },
    { name: "Work In Progress", color: '#FD5E5E' },
    { name: "Personal", color: '#FFD900' },
    { name: "Urgent", color: "#FF6347" },
    { name: "Important", color: "#FFA07A" },
    { name: "Family", color: "#6495ED" },
    { name: "Social", color: "#FFB6C1" }
];


const LabelList = () => {
    return (
        <div className={styles.main}>
            <span className={styles.more}>
                <h3>Labels</h3>
                <span className={styles.icons}>
                    <span className={styles.plus}><FaPlus/></span>
                    <IoMdMore size={"20px"}/></span>
                
            </span>
            {labeledColors.map((label, index) => (
                <NavLink
                    key={label.name}
                    to={`${label.name}`}
                    className={({ isActive }) =>
                        `${isActive ? styles.active : ""} ${styles.box}`
                    }
                >
                    <Label
                        key={index}
                        color={label.color}
                    />
                    <span className={styles.name}>{label.name}</span>
                </NavLink>
            ))}
        </div>


    )
}

export default LabelList
