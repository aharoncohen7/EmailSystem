import React from 'react'
import { IoColorPalette } from "react-icons/io5";
import styles from './style.module.css';

const myColors = ["black", "red", "green", "blue", "yellow", "pink", "purple", "brown", "rgba(253, 94, 94, 1)"];
// const colorInput = document.getElementById('inputColor');

// colorInputDiv.addEventListener('click', (event) => {
//   if (event.target !== colorInput) {
//     colorInput.style.display = 'none'; // Hide the DIV
//   }
// });


const Colors = ({setColor, setShowColors}) => {
  return (
        <div onBlur={()=>setShowColors(false)} className={styles.main}>
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
            {/* <input type="color" onChange={(e) => { e.stopPropagation();setColor(e.target.value);   }} />    */}
        </div>
  
  )
}

export default Colors
