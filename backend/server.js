const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./middleware/passportConfig");
const cors = require("cors");
require("dotenv").config();

const initRouter = require("./routes");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://srinjoydas0212:7sVEkvHQvr64wmgz@codex.0zrq1.mongodb.net/?retryWrites=true&w=majority&appName=CodeX"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// Create an Express application, set port for server
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Initialize routes
initRouter(app);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passportConfig = require("./middleware/passportConfig");
// const cors = require("cors");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// require("dotenv").config();

// const initRouter = require("./routes");

// // Connect to MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://srinjoydas0212:7sVEkvHQvr64wmgz@codex.0zrq1.mongodb.net/?retryWrites=true&w=majority&appName=CodeX"
//   )
//   .then(() => console.log("Connected to DB"))
//   .catch((err) => console.error(err));

// // Create an Express application, set port for server
// const app = express();
// const server = createServer(app);
// const port = 5000;

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.json());
// app.use(passportConfig.initialize());

// app.use(
//   cors({
//     origin: "http://localhost:4000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// // Initialize routes
// initRouter(app);

// // Socket.IO functionality
// io.on("connection", (socket) => {
//   console.log(`User ${socket.id} connected`);

//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//     console.log(`User ${socket.id} joined room ${room}`);
//   });

//   socket.on("leaveRoom", (room) => {
//     socket.leave(room);
//     console.log(`User ${socket.id} left room ${room}`);
//   });

//   socket.on("message", ({ room, data }) => {
//     io.to(room).emit("recieve-message", data);
//   });

//   socket.on("display-code", ({ room, data }) => {
//     io.to(room).emit("recieve-code", data);
//   });

//   socket.on("input-change", ({ room, data }) => {
//     io.to(room).emit("recieve-input", data);
//   });

//   socket.on("output-change", ({ room, data }) => {
//     io.to(room).emit("recieve-output", data);
//   });

//   socket.on("change-language", ({ room, data }) => {
//     io.to(room).emit("recieve-language", data);
//   });

//   socket.on("text-change", ({ room, data }) => {
//     io.to(room).emit("recieve-text", data);
//   });
// });

// // Start server
// server.listen(port, () => {
//   console.log(`Server started on port ${port}!`);
// });
