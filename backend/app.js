require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require('./db/connect');
const cors = require("cors");
const categoryrouter = require("./routes/category");
const postrouter = require("./routes/post");
const adminrouter = require("./routes/admin");

app.use(express.json());
app.use(cors());

app.use("/api/v1",categoryrouter);
app.use("/api/v1",postrouter);
app.use("/api/v1/auth",adminrouter);

const port = 3001;

const start = async()=>{
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    }
    catch(error){
        console.log(error);
    }
}

start();