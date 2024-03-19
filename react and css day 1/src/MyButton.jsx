import React from 'react'
import { useState } from 'react'

const MyButton = ({onClick}) => {
    const [mode, setMode] = useState(false)
    const classes = ["on", "off"]
    const [cssMode, setCssMode] = useState("off")


    function switchMode () {
        setMode(prev=>{
            if(prev){
                setCssMode("off")
                if(onClick) onClick(false)
                return false
                
            }
            setCssMode("on")
            if(onClick) onClick(true)
            return true
            
            
        })
        
    }


   
        

  return (
    <div className='button1'>
        <div className={`button2 ${cssMode}`}  onClick={switchMode}></div>
    </div>
  )
}

export default MyButton
