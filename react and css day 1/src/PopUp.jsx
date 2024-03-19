import React, { useContext } from 'react'
import { PopupContext } from "./App"



const PopUp = ({}) => {
    const { setIsPpoupOpen, content } = useContext(PopupContext)

    return (
        <div className='popup' onClick={() => setIsPpoupOpen(false)}>
            <div className='popup2' onClick={(e)=> e.stopPropagation()}>
                <p className='colsePopup' >
                    <button className='colse-button' onClick={() => setIsPpoupOpen(false)} >
                        X
                    </button>
                    <div className='colse-button'>{content}</div>
                </p>
            </div>
        </div>
    )
}

export default PopUp
