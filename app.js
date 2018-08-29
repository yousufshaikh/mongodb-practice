var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser:true});
mongoose.connection.on('error', function(error){
	console.log("error", error)
});
mongoose.connection.once('open', function(){
	console.log("db connected")
});


app.get('/', function(req, res){
	res.send("Hello World");
});

app.get('/books', function(req, res){
	console.log("Getting all the books");
	Book.find({}, function(err, books){
		if (err) {
			res.send("Error has accur");
		}
		else{
			console.log(books);
			res.json(books);
		}
	})
})

app.listen(4000, function () {
	console.log("App is running at port 8080");
});
