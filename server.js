const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;

//Connect database
const connect = require("./config/db");
connect();

app.use(express.static("public"));
app.use(express.json());
app.get("/",(req,res)=>{
    res.render('index')
});

//Set View Engine
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"))


app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download/", require("./routes/download"));


app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))