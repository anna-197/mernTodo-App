// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectingDB")

//env config
dotenv.config();

//mongodb connection
connectDB();

//rest objecct
const app = express();

// routes
const todoRoutes = require("./routes/todoRoutes"); 
const userRoutes = require("./routes/userRoutes");

//middelwares
// cors
app.use(cors()); // added
app.use(express.json());

// app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/todo", todoRoutes); 
app.use("/api/user", userRoutes);


// setting up port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});