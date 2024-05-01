import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import Chat from './pages/chat/Chat'
import { useState, createContext} from "react";
import PopUp from "./components/PopUp";
import NewMessage from "./components/NewMessage";
import useAxiosReq from "./hooks/useAxiosReq";
export const PopupContext = createContext(true)


const userId = "663241fc39820b49bb2e9112"

export default function App() {
  const [popUpContent, setPopUpContent] = useState("")
  const { loading, data, error } = useAxiosReq({ defaultVal: {}, method: 'GET', url: `users/${userId}` })



  

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent, thisUser:data }}>
      <div>
        <Routes>
          {/* <Route path="login" element={<h1>login</h1>} /> */}
          <Route path="" element={<MainLayout />}>
            <Route path=":chats" element={<EmailsTypeLayout />} >
              <Route path="new-message" element={<NewMessage/>} />

              <Route path=":chatType" element={<EmailsListLayout />} >

                <Route path=":chatId" element={<Chat />} />

              </Route>

            </Route>

          </Route>
          
        </Routes>
        {popUpContent && <PopUp/>}
      </div>
      </PopupContext.Provider>
  )
}
