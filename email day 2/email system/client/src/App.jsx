import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import Chat from './pages/chat/Chat'



export default function App() {
  return (
    <div>
        <Routes>
          <Route path="login" element={<h1>login</h1>} />
          <Route element={<MainLayout />}>
            <Route index element={<>home</>} />
            <Route path="emails" element={<EmailsTypeLayout />} >
              <Route path=":emailType" element={<EmailsListLayout />} >
                <Route path=":emailId" element={<Chat/>} />
              </Route>
            </Route>
          </Route>
        </Routes>
    </div>
  )
}