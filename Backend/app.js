const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path=require('path');

const authRoutes = require('./Routers/auth');
const userRoutes = require('./Routers/user');
const interviewRouters = require("./Routers/interview")


mongoose.connect("mongodb+srv://admin:1ZiYkSsqx5Xe7Rdm@cluster0.hu15k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function (db) {
    console.log("db connected");
}).catch(function (e) {
    console.log(e);
})

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", interviewRouters);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

let port = 8000;

app.listen(port, function () {
    console.log(`Server Started at port ${port}`);
})