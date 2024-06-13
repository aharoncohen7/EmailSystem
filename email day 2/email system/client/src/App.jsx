import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from './pages/chat/Chat';
import PopUp from "./components/PopUp";
import MainLayout from "./layouts/MainLayout";
import NewMessage from "./components/NewMessage";
import LoginPage from "./components/loginPage/Login";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import RegisterPage from "./components/loginPage/RegisterPage";
import ForgotPassword from "./components/loginPage/ForgotPassword";
export const PopupContext = createContext(true);

export default function App() {
  const [popUpContent, setPopUpContent] = useState("");


  useEffect(()=>{
    if (popUpContent) {
      setTimeout(() => {
        setPopUpContent("");
      }, 3000);
    }
  }, [popUpContent])

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
          <div>
            <Routes>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot" element={<ForgotPassword />} />
              <Route path="" element={<MainLayout />}>
                <Route path=":type" element={<EmailsTypeLayout />} >
                  <Route path="new-message" element={<NewMessage />} />
                  <Route path=":chatType" element={<EmailsListLayout />} >
                    <Route path=":chatId" element={<Chat />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
            {popUpContent && <PopUp />}
          </div>
    </PopupContext.Provider>
  );
}


// import { useState, createContext, useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Chat from './pages/chat/Chat';
// import PopUp from "./components/PopUp";
// import MainLayout from "./layouts/MainLayout";
// import NewMessage from "./components/NewMessage";
// import LoginPage from "./components/loginPage/Login";
// import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
// import EmailsListLayout from "./layouts/EmailsListLayout";
// import RegisterPage from "./components/loginPage/RegisterPage";
// export const PopupContext = createContext(true);
// export const UserContext = createContext(true);
// export const ChatContext = createContext(true);
// import useAxiosReq from "./hooks/useAxiosReq";
// import { axiosReq } from './helpers';
// import ForgotPassword from "./components/loginPage/ForgotPassword";

// // Socket.io client import and initialization
// import io from 'socket.io-client';
// const socket = io('http://localhost:4004', { autoConnect: false });
// export const PlayerContext = createContext(socket);

// export default function App() {
//   const [popUpContent, setPopUpContent] = useState("");
//   const [isChangeList, setIsChangeList] = useState(true);
//   const [user, setUser] = useState({});
//   const navTo = useNavigate();

//   const getUserByToken = async () => {
//     try {
//       if (!localStorage.token) {
//         navTo("/login");
//         return;
//       }
//       const res = await axiosReq({ url: 'auth/refresh-token', method: 'GET' });
//       // console.log(res);
//       setUser(res);
//     } catch (error) {
//       localStorage.clear();
//       console.log(error);
//     }
//   };

//   // Debugging socket connection
//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Socket connected:', socket.id);
//     });

//     socket.on('connect_error', (err) => {
//       console.log('Socket connection error:', err);
//     });

//     socket.on('disconnect', (reason) => {
//       console.log('Socket disconnected:', reason);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('connect_error');
//       socket.off('disconnect');
//     };
//   }, []);

//   useEffect(() => {
//     getUserByToken();
//   }, []);  // Fetch user details from token on component mount

//   useEffect(() => {
//     socket.connect();  // Manually connect the socket
//     return () => socket.disconnect();  // Disconnect the socket when the component unmounts
//   }, []);


//   return (
//     <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
//       <UserContext.Provider value={{ user, setUser, socket }}>
//         <ChatContext.Provider value={{ isChangeList, setIsChangeList }}>
//           <div>
//             <Routes>
//               <Route path="register" element={<RegisterPage />} />
//               <Route path="login" element={<LoginPage />} />
//               <Route path="forgot" element={<ForgotPassword />} />
//               <Route path="" element={<MainLayout />}>
//                 <Route path=":type" element={<EmailsTypeLayout />} >
//                   <Route path="new-message" element={<NewMessage />} />
//                   <Route path=":chatType" element={<EmailsListLayout />} >
//                     <Route path=":chatId" element={<Chat />} />
//                   </Route>
//                 </Route>
//               </Route>
//             </Routes>
//             {popUpContent && <PopUp />}
//           </div>
//         </ChatContext.Provider>
//       </UserContext.Provider>
//     </PopupContext.Provider>
//   );
// }

// import io from 'socket.io-client';
// const socket = io('http://localhost:4004', { autoConnect: false });

// import { useState, createContext, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import Chat from './pages/chat/Chat';
// import PopUp from "./components/PopUp";
// import MainLayout from "./layouts/MainLayout";
// import NewMessage from "./components/NewMessage";
// import LoginPage from "./components/loginPage/Login";
// import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
// import EmailsListLayout from "./layouts/EmailsListLayout";
// import RegisterPage from "./components/loginPage/RegisterPage";
// import ForgotPassword from "./components/loginPage/ForgotPassword";
// export const PopupContext = createContext(true);

// export default function App() {
//   const [popUpContent, setPopUpContent] = useState("");
//   // const [isChangeList, setIsChangeList] = useState(true);
//   // const [user, setUser] = useState({});
//   // const navTo = useNavigate();

//   // const getUserByToken = async () => {
//   //   try {
//   //     if (!localStorage.token) {
//   //       navTo("/login");
//   //       return;
//   //     }
//   //     const user = await axiosReq({ url: 'auth/refresh-token', method: 'GET' });
//   //     console.log(user);
//   //     setUser(user);
//   //     socket.auth = {
//   //       userId: user._id,
//   //       token: localStorage.token
//   //     };
//   //     socket.connect();
//   //     console.log("retyuiop");
//   //   } catch (error) {
//   //     localStorage.clear();
//   //     console.log(error);
//   //   }
   
   
//   // };

//   // useEffect(() => {
//   //   socket.on('connect', () => {
//   //     console.log('Socket connected:', socket.id);
//   //   });

//   //   socket.on('connect_error', (err) => {
//   //     console.error('Socket connection error:', err);
//   //   });

//   //   socket.on('disconnect', (reason) => {
//   //     console.log('Socket disconnected:', reason);
//   //   });

//   //   return () => {
//   //     socket.off('connect');
//   //     socket.off('connect_error');
//   //     socket.off('disconnect');
//   //   };
//   // }, []);


//   // useEffect(() => {
//   //   getUserByToken();
//   //   return () => socket.disconnect();
//   // }, []);

//   // useEffect(() => {
//   //   socket.connect();
//   //   return () => socket.disconnect();
//   // }, []);


//   return (
//     <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
//       {/* <UserContext.Provider value={{ user, setUser, socket}}>
//         <ChatContext.Provider value={{ isChangeList, setIsChangeList }}> */}
//           <div>
//             <Routes>
//               <Route path="register" element={<RegisterPage />} />
//               <Route path="login" element={<LoginPage />} />
//               <Route path="forgot" element={<ForgotPassword />} />
//               <Route path="" element={<MainLayout />}>
//                 <Route path=":type" element={<EmailsTypeLayout />} >
//                   <Route path="new-message" element={<NewMessage />} />
//                   <Route path=":chatType" element={<EmailsListLayout />} >
//                     <Route path=":chatId" element={<Chat />} />
//                   </Route>
//                 </Route>
//               </Route>
//             </Routes>
//             {popUpContent && <PopUp />}
//           </div>
//         {/* </ChatContext.Provider>
//       </UserContext.Provider> */}
//     </PopupContext.Provider>
//   );
// }
