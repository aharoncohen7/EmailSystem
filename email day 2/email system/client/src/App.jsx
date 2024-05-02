import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import Chat from './pages/chat/Chat'
import { useState, createContext, useEffect} from "react";
import PopUp from "./components/PopUp";
import NewMessage from "./components/NewMessage";
import useAxiosReq from "./hooks/useAxiosReq";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/loginPage/Login";
export const PopupContext = createContext(true)
export const UserContext = createContext(true)
import { axiosReq } from './helpers'



// const userId = "6632641d945c32b01242c75b"

export default function App() {
  const [popUpContent, setPopUpContent] = useState("");
  const [user, setUser] = useState()
    // const { loading, data, error } = useAxiosReq({ defaultVal: {}, method: 'GET', url: `users/${userId}` })

  const getUserByToken = async () => {
    try {
      if (!localStorage.token) return;
      const res = await axiosReq({ url: 'auth/refresh-token', method: 'GET' })
      console.log(res);
      setUser(res)
    } catch (error) {
      localStorage.clear()
      console.log(error);
    }
  }
  useEffect(() => { getUserByToken() }, [])



  

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent}}>
      <UserContext.Provider value={{ user, setUser}}>
      <div>
        <Routes>
          <Route path="register" element={<RegisterPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="" element={<MainLayout />}>
            <Route path="chats" element={<EmailsTypeLayout />} >
              <Route path="new-message" element={<NewMessage/>} />

              <Route path=":chatType" element={<EmailsListLayout />} >

                <Route path=":chatId" element={<Chat />} />

              </Route>

            </Route>

          </Route>
          
        </Routes>
        {popUpContent && <PopUp/>}
      </div>
      </UserContext.Provider>
      </PopupContext.Provider>
  )
}
