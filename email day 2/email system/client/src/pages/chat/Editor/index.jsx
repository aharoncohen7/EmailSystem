import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { MdFormatTextdirectionRToL } from "react-icons/md";
import { MdFormatTextdirectionLToR } from "react-icons/md";
import { VscTextSize } from "react-icons/vsc";


import Colors from '../Colors';
import SendBtn from '../SendBtn';
// import axios from 'axios';
// import useAxiosReq from '../../../hooks/useAxiosReq';
import { axiosReq } from '../../../helpers';


// אייקוני עיצוב עמוד
const formattingOptions = [
    { icon: BsListUl, value: 'listUl' },
    { icon: BsListOl, value: 'listOl' },
    { icon: FiAlignLeft, value: 'left' },
    { icon: FiAlignCenter, value: 'center' },
    { icon: FiAlignRight, value: 'right' },
    { icon: FiAlignJustify, value: 'justify' },
    // { icon: MdFormatTextdirectionRToL, value: 'rtl' },
    // { icon: MdFormatTextdirectionLToR, value: 'ltr' }
];






// עורך טקסט
const Editor = ({ setChange, setResetKey, moreDetails, newMessage = false }) => {
    const navTo = useNavigate()
    // קבלת ברירת מחדל של כיוון טקסט לפי שפה ראשית
    useEffect(() => {
        function getSystemDirection() {
            const userLanguage = navigator.language || navigator.languages[0];
            if (userLanguage.startsWith('he')) {
                setTextDirection("rtl")
                setTextFormatting("right")
            } else {
                setTextDirection("ltr")
                setTextFormatting("left")
            }
        }
        getSystemDirection()
    }, []);
    // console.log("🚀 ~ Editor ~ moreDetails:", moreDetails)
    const { chatId } = useParams();
    //תוכן הודעה
    const [content, setContent] = React.useState("");
    // הצגת סרגל צבעים
    const [showColors, setShowColors] = React.useState(false);
    // צבע טקסט
    const [selectedColor, setSelectedColor] = React.useState("black");
    // גודל טקסט
    const [fontSize, setFontSize] = React.useState("small");
    //כיוון טקסט
    const [textDirection, setTextDirection] = React.useState("");
    //  עיצןב מטקסט - יישור שורות
    const [textFormatting, setTextFormatting] = React.useState("");
    // עיצוב טקסט - הדגשות
    const [formatting, setFormatting] = React.useState({
        bold: false,
        italic: false,
        underline: false,
    });
    // עדכון סוג הדגשת פונט
    const toggleFontFormatting = (mode) => {
        setFormatting({ ...formatting, [mode]: !formatting[mode] });
    };
    // בעת בחירת צבע- הטקסט המודגש יקבל את הצבע
    useEffect(() => {
        handleSelect()
    }, [selectedColor, formatting, fontSize]);
    // עיצוב עבור תצוגת השולח
    const jsxStyle = {
        textDecoration: formatting.underline ? 'underline' : 'none',
        fontStyle: formatting.italic ? 'italic' : 'none',
        fontWeight: formatting.bold ? 'bold' : 'normal',
        color: selectedColor,
        fontSize: fontSize
    }
    // עיצוב עבור התוכן הנשלח
    const cssStyle =
        `"text-decoration: ${formatting.underline ? 'underline' : 'none'};
         font-style: ${formatting.italic ? 'italic' : 'normal'};
         font-weight: ${formatting.bold ? 'bold' : 'normal'};
         text-align: ${textFormatting}";
         color: ${selectedColor};
         font-size: ${fontSize};
         `;
    //החלת סגנון בעת בחירת טקסט
    function handleSelect() {
        //בחירת טקסט
        const selection = window.getSelection();
        const selectedText = selection.toString();
        if (selectedText) {
            // יצירת תגית עם העיצוב הנבחר
            const span = document.createElement('span');
            span.textContent = selectedText;
            Object.assign(span.style, jsxStyle);
            // span.style.color = `${selectedColor}`;

            //מחיקת הטקסט בטווח שנבחר ושתילת התגית הקודמת
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(span);
            // בסיום הפעולות, נבטל את כל הבחירות בעמוד
            window.getSelection().removeAllRanges();
            setContent(divRef.current.innerHTML)
        }

    }
    //  שינוי סגנון לפי מיקום נוכחי ללא בחירת טקסט
    function handleMouseDown() {
        // קבלת מיקום הסמן מתוך האירוע
        const selection = window.getSelection();
        if (!selection.isCollapsed) {
            return;
        }
        // קבלת טווח
        const range = selection.getRangeAt(0);

        // יצירת אלמנט <span> עם תו בלתי נראה
        const caretSpan = document.createElement('span');
        caretSpan.textContent = '\u200B';
        // החלת סגנון נבחר על הספאן החדש
        Object.assign(caretSpan.style, jsxStyle);

        // הוספת האלמנט <span> במיקום הסמן
        range.insertNode(caretSpan);
        range.setStartBefore(caretSpan);
        range.setEndAfter(caretSpan);
        // ביטול בחירה
        range.collapse(false);

        // עדכון הסלקציה
        selection.removeAllRanges();
        selection.addRange(range);
    }
    // איפוס הגדרות
    const handleReset = () => {
        // Increment the key to force component remount
        setResetKey(prevKey => prevKey + 1);
    };
    // אלמנט התוכן
    const divRef = useRef(null);
    //  עטיפת תוכן 
    const body = { content: `<span dir='${textDirection}' style=${cssStyle}> ${content} </span>` }
    //שליחת הודעה
    const send = async () => {
        if (newMessage && (moreDetails.members.length == 0 || moreDetails.subject == "")) {
            return;
        }
        if (content.trim() !== '') {
            try {
                const result = await axiosReq({
                    method: newMessage ? 'POST' : 'PUT',
                    url: newMessage ? 'chats/' : `chats/${chatId}`,
                    body: newMessage
                        ? { ...body, subject: moreDetails.subject, members: moreDetails.members }
                        : body
                })
                
                
                if (result) {
                    if (newMessage) {
                        navTo(`/chats/sent emails/${result}`)
                    }
                    else {
                        handleReset()
                        setChange(prev => !prev);
                    }
                }
                else {
                    alert('הטקסט לא נשלח')
                    handleReset()
                }

            } catch (e) {
                alert("Failed to send message")
                console.error(e)
            }
        }
        else {
            alert("you cannot send messages without content");
        }
    }





    return (
        <div className={styles.main} >
            <div className={styles.editorBox}>
                {/* אלמנט תוכן */}
                <div
                    ref={divRef}
                    dir={textDirection}
                    contentEditable={true}
                    onMouseUp={handleMouseDown}
                    // style={{
                    //     ...jsxStyle,
                    //     // color: content ? 'inherit' : 'gray', // הוספת צבע אפור לטקסט הדיפולטי
                    // }}
                    // value={content.length>100 || 'Write your message...'}
                    style={{ textAlign: textFormatting, fontSize: fontSize }}
                    onInput={
                        (e) => {
                            console.log(e.target.innerHTML);
                            // setContent(e.target.innerHTML);
                            setContent(divRef.current.innerHTML);
                        }
                    }
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

                        <MdFormatTextdirectionLToR className={textDirection === "ltr" ? styles.svg : ''} onClick={() => { setTextDirection('ltr'); setTextFormatting("left") }} />
                        <MdFormatTextdirectionRToL className={textDirection === "rtl" ? styles.svg : ''} onClick={() => { setTextDirection('rtl'); setTextFormatting("right") }} />
                        <VscTextSize size={fontSize=="small" ? "15px" : "17px"}  className={styles.svg} onClick={
                            () => {
                                setFontSize(prev => {
                                    if (prev == "small") { return "medium" }
                                    else return "small"
                                })
                            }} />

                    </div>
                </div>

            </div>
            <div className={styles.buttons}>
                <span className={styles.sendButton}>< FaFile /> < FaImage /></span>
                <span className={styles.sendButton}  >
                    <MdDelete size={"22px"} onClick={handleReset} />
                    <span onClick={send}>
                        <SendBtn /></span>
                </span>
            </div>
        </div>
    )
}

export default Editor


