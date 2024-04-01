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
import Colors from '../Colors';


const Editor = () => {
    const [selectedColor, setSelectedColor] = React.useState("black");
    const [showColors, setShowColors] = React.useState(false);
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

                <div
                    contentEditable={true}
                    // onSelectCapture={}
                    type="text"
                    value={text}
                    style={{color: selectedColor}}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Write your message...'
                    className={styles.input }
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

                        <TbBucketDroplet style={{color: selectedColor}} size={20} onClick={()=>setShowColors(true)} />
                        {showColors && <Colors setColor={setSelectedColor} setShowColors={setShowColors}/>}
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
