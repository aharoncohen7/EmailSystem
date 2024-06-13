require("dotenv").config()//מייצר גישה למשתני סביבה
const port = process.env.PORT || 4004
require("./DL/db").connect()// חיבור למונגוס- הקמת השרת
const express = require("express")// - מקבל פונקציה - ייבוא ספריה שמסוגלת לייצר 
const app = express()//הקמת שרת - קריאה לפונקציה
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const userServices = require('./BL/user.services')

const mainRouter = require('./routes/main.router')//ראוטר כללי שמאגד את כל הראוטרים שיצרתי
const { auth } = require('./middlewares/auth');//אימות טוקן

app.use(require("cors")())//מטפל בהרשאות לבקשות,כעת פתוח לכולם
app.use(express.json())//ממיר את הבקשה לJSON בצורה אוטומטית

// אנד-פוינטס
app.use("/api/auth", mainRouter.authRouter)
// app.use(auth)//אימות טוקן
app.use("/api/users", auth, mainRouter.userRouter)
app.use("/api/chats", auth, mainRouter.chatRouter)
app.use("/api/user-chats", auth, mainRouter.userChatsRouter)
app.use("/api/cloudinary", auth, mainRouter.imgRouter)//העלאת תמונת וקבלת URL
// require('./DL/test_data')

// מאגד חיבורים
const connectedUsers = {};

// חיבור ראשוני בעת LOGIN
io.on('connection', (socket) => {
  console.log("Connected socket.id: ", socket.id);
  const userId = socket.handshake.auth.userId;
  console.log("🚀 ~ io.on ~ userId:", userId)
  // const token = socket.handshake.auth.token;

  if (!userId) {
    return;
  }

  // הצטרף לחדר Socket.io של המשתמש
  socket.join(userId);

  // אחסן את מידע החיבור במאגר נתונים
  connectedUsers[userId] = {
    socket: socket,
    lastActivity: Date.now(),
  };

  console.log(Object.keys(connectedUsers).length);

  // טפל באירוע שליחת הודעה
  socket.on('message', async (messageData) => {
    // console.log("🚀 ~ socket.on ~ messageData:", messageData, "========================================================")
    console.log("l;😒😒😒😒😒😒");
    const { msg, sender, receivers, ref } = messageData;
    const receiver = await userServices.getUser({ email: receivers[0] });
    // // בדוק אם הנמען מחובר
    if (connectedUsers[receiver._id]) {
      const receiverSocket = connectedUsers[receiver._id].socket;
      console.log(receiverSocket.id);
      io.to(receiverSocket.id).emit('new_message', sender);
    }
    else {
      const notifications = await userServices.updateNotifications({ _id: receiver._id },
        { msg: "new_message", from: sender });

      console.log("❤️❤️😍😍😍😍😍😍😍😍😍😍");
      console.log(notifications);
    }




    // עדכן את בסיס הנתונים
    // db.collection('messages').insertOne({
    //   sender: senderId,
    //   receiver: receiverId,
    //   content: content,
    //   timestamp: Date.now(),
    // });

    // // בדוק אם הנמען מחובר
    // if (connectedUsers[receiverId]) {
    //   const receiverSocket = connectedUsers[receiverId].socket;

    //   // שלח התראה לחדר Socket.io של הנמען
    //   receiverSocket.to(receiverId).emit('notification', {
    //     sender: senderId,
    //     content: content,
    //   });
    // } else {
    //   // אחסן את ההתראה במאגר נתונים
    //   db.collection('notifications').insertOne({
    //     sender: senderId,
    //     receiver: receiverId,
    //     content: content,
    //     read: false,
    //     timestamp: Date.now(),
    //   });
    // }
  });

  // טפל באירוע התנתקות
  socket.on('disconnect', () => {
    delete connectedUsers[userId];
  });
});

//+ יצירת מאזין בפורט שמסופק + פונקציה שמופעלת בעת עליית השרת
server.listen(port, () => console.log("server is running in port: " + port))