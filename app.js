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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


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

app.get('/books/:id', function(req, res){
	console.log("getting one book");
	Book.findOne({
		_id: req.params.id
	})
	.exec(function(err, book){
		if(err){
			res.send('error accured');
		}
		else{
			console.log(book);
			res.json(book);
		}
	})
})

// post book by creating new instance of Book() model
app.post('/book', function(req, res){
	var newBook = new Book();

	newBook.author = req.body.author;
	newBook.title = req.body.title;
	newBook.category = req.body.category;

	newBook.save(function(err, book){
		if(err){
			res.send("error saving book");
		}
		else{
			console.log(book);
			res.send(book);
		}
	});
});

// post book by Model.create() as describe in mongoose

app.post('/book2', function(req, res){
	Book.create(req.body, function(err, book){
		if(err){
			res.send("error saving book");
		}
		else{
			console.log(book);
			res.send(book);
		}
	})
})

// put update book from books

app.put('/book/:id' , function(req, res){
	Book.findOneAndUpdate({_id: req.params.id}, {$set: {title:req.body.title}}, {upsert:true}, function(err, updated_book_tilte){
		if(err){
			console.log("Error accured updating");
		}
		else{
			console.log(updated_book_tilte);
			res.send(updated_book_tilte);
		}
	})
})

app.delete('/book/:id' , function(req, res){
	Book.findOneAndRemove({_id: req.params.id}, function(err,remove_book){
		if(err){
			console.log("Error accured removing");
		}
		else{
			console.log(remove_book);
			res.status(204);
		}
	})
})

app.listen(4000, function () {
	console.log("App is running at port 8080");
});
