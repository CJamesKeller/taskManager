var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 5000;
var task = require("./routes/tasks.js");

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function()
{
  console.log("Listening on port: ", port);
});

app.use("/tasks", task);
