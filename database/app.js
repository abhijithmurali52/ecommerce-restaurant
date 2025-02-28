const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
// const { Server } = require('socket.io');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
  console.log('Client disconnected');
  });
});
// Export io for use in the order controller
module.exports.io = io;
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow all origins, adjust as needed
//     methods: ['GET', 'POST']
//   }
// });
// const io = socketIo(server);

// module.exports = { io }; 

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(uploadDir));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
    
//     const changeStream = mongoose.connection.collection('orders').watch();
//     changeStream.on('change', (change) => {
//       if (change.operationType === 'insert') {
//         const newOrder = change.fullDocument;
//         io.emit('newOrder', newOrder);
//       }
//     });
//   })
//   .catch(err => console.error('Failed to connect to MongoDB', err));



  //user auth
const authRoutes = require('./Routes/auth');
app.use('/api/auth', authRoutes);

// admin auth
const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admin/auth', adminRoutes);

//item 
const itemRoutes = require('./Routes/itemRoutes');
app.use('/api', itemRoutes)

//menu
const menuRoutes = require('./Routes/menuRoutes');
app.use('/api', menuRoutes);

//item category
const itemCategoryRoutes = require('./Routes/itemCategoryRoutes');
app.use('/api', itemCategoryRoutes);

//cart
const cartRoutes = require('./Routes/cartRoutes');
app.use('/api', cartRoutes);

//order
const orderRoutes = require('./Routes/orderRoutes');
app.use('/api', orderRoutes);
//adminBookingC
const adminTableRoutes = require('./Routes/AdminTableRoutes');
app.use('/api', adminTableRoutes);

//table  //temp
const tableRoutes = require('./Routes/tableRoutes');
app.use('/api', tableRoutes);

//booking // temp
const bookingRoutes = require('./Routes/bookingRoutes');
app.use('/api', bookingRoutes);
 
// table booking
const tableBookingRoutes = require('./Routes/tableBookingRoutes');
app.use('/api', tableBookingRoutes);

//max persons
const maxPersonsRoutes=  require('./Routes/maxPersonsRoutes');
app.use('/api', maxPersonsRoutes);


// // Set socket.io instance on app
// app.set('socketio', io);

// // Socket.io connection event
// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

