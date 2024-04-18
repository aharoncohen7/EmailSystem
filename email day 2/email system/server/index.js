require("dotenv").config()//מייצר גישה למשתני סביבה
const port = process.env.PORT || 4004
const express = require("express")// - מקבל פונקציה - ייבוא ספריה שמסוגלת לייצר 
app = express()//הקמת שרת - קריאה לפונקציה
const mainRouter = require('./routes/main.router');
const { auth } = require('./middlewares/auth');
require("./DL/db").connect()


app.use(require("cors")())//מטפל בהרשאות לבקשות,כעת פתוח לכולם
app.use(express.json())//ממיר את הבקשה לJSON בצורה אוטומטית

// אנד-פוינטס
app.use("/api/users",auth, mainRouter.userRouter)
app.use("/api/chats",auth, mainRouter.chatRouter)
app.use("/api/user-chats",auth, mainRouter.userChatsRouter)
// app.use("/api/email",auth, mainRouter.emailRouter)
// require('./DL/test_data')



//+ יצירת מאזין בפורט שמסופק + פונקציה שמופעלת בעת עליית השרת
app.listen(port,()=> console.log("server is running in port: " + port))