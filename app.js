const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const app = express();


// Express config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride("_method"));


const URI = "mongodb+srv://blog:blogapp@cluster0-1ksmw.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use("/", require("./routes/index"));
app.use("/blogs/", require("./routes/blog"));
app.use("/", require("./routes/about-us"));



let port = process.env.PORT || 5000
app.listen(port, function () {
  console.log("Server has started on port " + port);
});