var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

mongoose.connect('mongodb://localhost/myapp');

app.get('/', function(req, res){
	res.send("Hello World");
});

app.get('/books', function(req, res){
	console.log("Getting all the books");
	Book.find({}).exec(function(err, books){
		if (err) {
			res.send("Error has accur");
		}
		else{
			console.log(books);
			res.json(books);
		}
	})
})

app.listen(8080, function () {
	console.log("App is running at port 8080");
});
