"use strict";

var express = require('express');
var app = express();


app.use(express.static(__dirname + '/build'));


app.all('/*', function(req, res, next) {
  // Serve index on all requests
  res.sendFile('/dist/index.html', { root: __dirname });
});



app.listen(80);
console.log("Server started");
