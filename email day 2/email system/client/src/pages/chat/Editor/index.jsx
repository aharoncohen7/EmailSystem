import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
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
import { MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { PiSelectionAll } from "react-icons/pi";

import Colors from '../Colors';
import SendBtn from '../SendBtn';
import axios from 'axios';


const Editor = ({ setChange }) => {
    const { chatId } = useParams()
    const [selectedColor, setSelectedColor] = React.useState("black");
    const [showColors, setShowColors] = React.useState(false);
    const [text, setText] = React.useState("");
    const [formatting, setFormatting] = React.useState({
        bold: false,
        italic: false,
        underline: false,
    });
    const [textFormatting, setTextFormatting] = React.useState("underline");
    const style ={
        textDecoration: formatting.underline ? 'underline' : 'none',
        fontStyle: formatting.italic ? 'italic' : 'none',
        fontWeight: formatting.bold ? 'bold' : 'normal'
    }
    const divRef = useRef(null);

    console.log(text);
    useEffect(() => {
        handleSelect()
    }, [selectedColor])








    //     }, [selectedColor])

    async function sendMessage() {
        if (text) {
            try {
                const url = `http://localhost:4004/api/chats/${chatId}`;
                const response = await axios.put(url, {
                    content: `<span style=${style}>${text}</span>`
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'authorization': localStorage.getItem('Authorization') || ''
                    }
                });
                if (!response.data) {

                    if (response.status === 401) {
                        // Handle unauthorized access
                    }
                    throw new Error(`Network response was not ok! status: ${response.status}`);
                }
                console.log("response.data 😊🐱‍💻", response.data);
                setText("")
                divRef.current.innerText = "";
                setChange(prev => { return !prev })
            } catch (error) {
                console.error("Error sending message :", error);
            }
        }
    };







    const formattingOptions = [
        { icon: BsListUl, value: 'listUl' },
        { icon: BsListOl, value: 'listOl' },
        { icon: FiAlignLeft, value: 'left' },
        { icon: FiAlignCenter, value: 'center' },
        { icon: FiAlignRight, value: 'right' },
        { icon: FiAlignJustify, value: 'justify' }
    ];


    const toggleFontFormatting = (mode) => {
        setFormatting({ ...formatting, [mode]: !formatting[mode] });
    };


    function handleSelect() {
        //בחירת טקסט
        const selection = window.getSelection();
        const selectedText = selection.toString();
        if (selectedText) {
            // יצירת תגית עם העיצוב הנבחר
            const span = document.createElement('span');
            span.textContent = selectedText;
            span.style.color = `${selectedColor}`;

            //מחיקת הטקסט בטווח שנבחר ושתילת התגית הקודמת
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(span);
            // בסיום הפעולות, נבטל את כל הבחירות בעמוד
            window.getSelection().removeAllRanges();
            setText(divRef.current.innerHTML)
        }
        // else {
        //             document.execCommand('styleWithCSS', false, true);
        //     document.execCommand('foreColor', false,selectedColor);
        // }
    }



    const handleSelectAll = () => {
        divRef.current.select();
        inputRef.current.focus();
    };




    return (
        <div className={styles.main}>
            <div className={styles.editorBox}>

                <div
                    ref={divRef}
                    contentEditable={true}
                    // onClick={handleSelect}
                    style={style}
                    value={text}
                    onInput={(e) => {
                        console.log(e.target.innerHTML);
                        // setText(e.target.innerHTML);
                        setText(divRef.current.innerHTML);

                    }}
                    // placeholder='Write your message...'
                    className={`${styles.input}`}
                />

                {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}

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
                        {/* <PiSelectionAll
                            value='selectAll'
                            className={styles.selectAll}
                            onClick={handleSelectAll}
                        /> */}



                        <TbBucketDroplet style={{ color: selectedColor }} size={20} onClick={() => setShowColors(true)} />
                        {showColors && <Colors setColor={setSelectedColor} setShowColors={setShowColors} />}
                    </div>

                    <div className={styles.textFormats}>

                        {formattingOptions.map(option => (
                            <option.icon
                                key={option.value}
                                onClick={() => setTextFormatting(option.value)}
                                className={textFormatting === option.value ? styles.active : ''}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <div className={styles.buttons}>
                <span className={styles.sendButton}>< FaFile /> < FaImage /></span>
                <span className={styles.sendButton} onClick={sendMessage}>
                    <MdDelete onClick={sendMessage} />
                    <SendBtn onClick={() => divRef.current.innerText = ""} />
                </span>
            </div>
        </div>
    )
}

export default Editor
