var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dyc360'));

app.listen(8082);