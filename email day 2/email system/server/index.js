
require("dotenv").config()//מייצר גישה למשתני סביבה
const port = process.env.PORT || 4002
const express = require("express")// - מקבל פונקציה - ייבוא ספריה שמסוגלת לייצר 
app = express()//הקמת שרת - קריאה לפונקציה
const mainRouter = require('./routes/main.router');
const { auth } = require('./middlewares/auth');
require("./DL/db").connect()


app.use(require("cors")())//מטפל בהרשאות לבקשות,כעת פתוח לכולם
app.use(express.json())//ממיר את הבקשה לJSON בצורה אוטומטית
app.use("/api/email",auth, mainRouter.emailRouter)
app.use("/api/user",auth, mainRouter.userRouter)
app.use("/api/user/emails",auth, mainRouter.usersEmailsRouter)
app.use("/api/chat",auth, mainRouter.chatRouter)


// require('./DL/test_data')


app.listen(port,()=> console.log("server is running in port: " + port))//+ יצירת מאזין בפורט שמסופק + פונקציה שמופעלת בעת עליית השרת