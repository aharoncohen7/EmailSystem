import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import Chat from './pages/chat/Chat'
import { useState, createContext} from "react";
import PopUp from "./components/PopUp";
import NewMessage from "./components/NewMessage";
export const PopupContext = createContext(true)



// יוזר לדוגמה
const thisUser =
{
  email: "user1@example.com",
  _id: "662ad1cb71375af1dc73fb45",
  fullName: "Moshe Cohen",
  password: "123qwe",
  avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Yellow",
}



export default function App() {
  const [popUpContent, setPopUpContent] = useState("")



  

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
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
