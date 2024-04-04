
import { useState, createContext, useContext } from 'react';
import MyButton from "./MyButton"
import PopUp from './PopUp'
import Carousel from './Carousel';
import './App.css'

export const PopupContext = createContext(true)

function App() {
  const [isPpoupOpen, setIsPpoupOpen] = useState(true)
  const [content, setContent] = useState("hi aharon")

  return (
    <>
      <PopupContext.Provider value={{ setIsPpoupOpen, content} }>
      <MyButton onClick={setIsPpoupOpen}/>
        {isPpoupOpen &&   <PopUp />}
        {/* <Carousel /> */}
      </PopupContext.Provider>
    </>
  )
}

export default App
