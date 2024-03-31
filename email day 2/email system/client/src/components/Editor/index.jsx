import React from 'react'
import styles from './style.module.css'
import { FiAlignRight } from "react-icons/fi";
import { FiAlignLeft } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi";
import { FiAlignCenter } from "react-icons/fi";
import { BsListOl } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { FaBold } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa6";
import { TbBucketDroplet } from "react-icons/tb"; 


const Editor = () => {

    const [text, setText] = React.useState("");
    const [formatting, setFormatting] = React.useState({
        bold: false,
        italic: false,
        underline: false,
    });
    const [textFormatting, setTextFormatting] = React.useState("left")


    const toggleFontFormatting = (mode) => {
        setFormatting({ ...formatting, [mode]: !formatting[mode] });
    };


    return (
        <div className={styles.container}>

            <div className={styles.editor}>

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Write your message...'
                    className={styles.input}
                />

                <div className={styles.formatting}>

                    <div className={styles.fontFormats}>

                        <FaBold
                            value='bold'
                            className={formatting.bold ? styles.active : ''}
                            onClick={() => {
                                toggleFontFormatting('bold')
                            }}

                        />
                        <FaItalic
                            value='italic'
                            className={formatting.italic ? styles.active : ''}
                            onClick={() => {
                                toggleFontFormatting('italic')
                            }}

                        />
                        <FaUnderline
                            value='underline'
                            className={formatting.underline ? styles.active : ''}
                            onClick={() => {
                                toggleFontFormatting('underline')
                            }}
                        />

                        <TbBucketDroplet size={20} />
                    </div>

                    <div className={styles.textFormats}>
                        <BsListUl
                            onClick={()=>setTextFormatting('listUl')}
                            className={textFormatting == "listUl" ? styles.active : ''} 
                            />
                        <BsListOl
                            onClick={()=>setTextFormatting('listOl')}
                            className={textFormatting == "listOl" ? styles.active : ''} 
                            />
                        <FiAlignLeft
                            onClick={()=>setTextFormatting('left')}
                            className={textFormatting == "left" ? styles.active : ''} 
                            />
                        <FiAlignCenter
                            onClick={()=>setTextFormatting('center')}
                            className={textFormatting == "center" ? styles.active : ''} 
                            />
                        <FiAlignRight
                            onClick={()=>setTextFormatting('right')}
                            className={textFormatting == "right" ? styles.active : ''} 
                            />
                        <FiAlignJustify
                        className={textFormatting === "justify" ? styles.active : ''}
                            onClick={()=>setTextFormatting('justify')}
                            
                            />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Editor
