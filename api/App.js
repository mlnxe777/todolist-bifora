const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/homeTask");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb://127.0.0.1:27042/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connection successful');
    })
    .catch((err) => {
        console.error('Connection failed');
    });

app.listen(4242, () => {
    console.log("Server is running on port 4242");
});

app.use("/", indexRouter);


module.exports = app;