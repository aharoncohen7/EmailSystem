import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import Chat from './pages/chat/Chat'
import { useState, createContext} from "react";
import PopUp from "./components/PopUp";
export const PopupContext = createContext(true)



export default function App() {
  const [content, setContent] = useState("")
  

  return (
    <PopupContext.Provider value={{ content, setContent }}>
      <div>
        <Routes>
          {/* <Route path="login" element={<h1>login</h1>} /> */}
          <Route path="" element={<MainLayout />}>
            <Route path="chats" element={<EmailsTypeLayout />} >

              <Route path=":chatType" element={<EmailsListLayout />} >

                <Route path=":chatId" element={<Chat />} />

              </Route>

            </Route>

          </Route>
          
        </Routes>
        {content && <PopUp/>}
      </div></PopupContext.Provider>
  )
}
