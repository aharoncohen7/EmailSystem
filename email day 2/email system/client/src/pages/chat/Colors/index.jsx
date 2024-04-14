import React from 'react'
import { IoColorPalette } from "react-icons/io5";
import styles from './style.module.css';

const myColors = ["black", "red", "green", "blue", "yellow", "pink", "purple", "brown", "rgba(253, 94, 94, 1)"];



const Colors = ({setColor, setShowColors}) => {

  return (
        <div className={styles.main}>
            {myColors.map((color, index) => (
                <IoColorPalette
                    key={index}
                    color={color}
                    onClick={(e) => {
                        e.stopPropagation();
                        setColor(color);
                        setShowColors(false);
                    }}
                />
            ))}
        </div>
  
  )
}

export default Colors
