// const { log } = require('console');
// const express = require('express'),
//     app = express(),
//     { createServer } = require('http'),
//     { Server } = require('socket.io'),
//     cross = require('cors');

// app.use(cross());

// const server = createServer(app);
// const io = new Server(server, { cors: { origin: '*', methods: '* ' } })
// // const io = require('socket.io')(3000);

// //  אפשר להשתמש כשרת רגיל
// app.get('/test', (req, res) => res.send("yesssss"))

// const connectedClients = {};




// io.on('connection', (socket) => {
//     console.log('User connected');

//     socket.on('message', (message) => {
//         console.log('Message received:', message);
//         io.emit('message', message); // Broadcast message to all connected users
//     });
    
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// server.listen(3300, () => console.log('@@@@@@@ server is listening on port 3300 @@@@@@'))



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const db = mongoose.connect(process.env.MONGO_URI);

// const connectedUsers = {};

// io.on('connection', (socket) => {
//   const userId = socket.handshake.query.userId;

//   // הצטרף לחדר Socket.io של המשתמש
//   socket.join(userId);

//   // אחסן את מידע החיבור במאגר נתונים
//   connectedUsers[userId] = {
//     socket: socket,
//     lastActivity: Date.now(),
//   };

//   // טפל באירוע שליחת הודעה
//   socket.on('message', (messageData) => {
//     const senderId = messageData.senderId;
//     const receiverId = messageData.receiver;
//     const content = messageData.content;

//     // עדכן את בסיס הנתונים
//     db.collection('messages').insertOne({
//       sender: senderId,
//       receiver: receiverId,
//       content: content,
//       timestamp: Date.now(),
//     });

//     // בדוק אם הנמען מחובר
//     if (connectedUsers[receiverId]) {
//       const receiverSocket = connectedUsers[receiverId].socket;

//       // שלח התראה לחדר Socket.io של הנמען
//       receiverSocket.to(receiverId).emit('notification', {
//         sender: senderId,
//         content: content,
//       });
//     } else {
//       // אחסן את ההתראה במאגר נתונים
//       db.collection('notifications').insertOne({
//         sender: senderId,
//         receiver: receiverId,
//         content: content,
//         read: false,
//         timestamp: Date.now(),
//       });
//     }
//   });

//   // טפל באירוע התנתקות
//   socket.on('disconnect', () => {
//     delete connectedUsers[userId];
//   });
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
