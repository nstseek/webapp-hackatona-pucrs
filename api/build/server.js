"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function () { return console.log(''); });
app.listen(process.env.PORT || 3000, function () {
    console.log('server started');
});
