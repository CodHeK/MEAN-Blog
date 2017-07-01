var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var app = express();

var PostSchema = mongoose.Schema({
	title: {type: String, required: true},
	body: {type: String, required: true},
	tag: {type: String, enum: ['Politics', 'Economy', 'Technology', 'Tourism']},
	posted: {type: Date, default: Date.now}
});


var PostModel = mongoose.model("PostModel", PostSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.delete("/api/blogpost/:postId", postDelete);
app.get("/api/blogpost/:postId", postEdit);
app.put("/api/blogpost/:postId", postUpdate);

function getAllPosts(req, res) {
	PostModel	
		.find()
		.then(
			function(posts) {
				res.json(posts);
			},
			function(err) {
				res.sendStatus(400);
			}

		);
}

function createPost(req, res) {
	var post = req.body;
	PostModel
		.create(post)
		.then(
			function(postObj) {
				res.json(200);
			},
			function (error) {
				res.sendStatus(400);
			}
		);
	console.log(post);
}

function postDelete(req, res) {
	var id = req.params.postId;
	PostModel
		.remove({_id: id})
		.then(
			function(status) {
				res.sendStatus(200);
			},
			function() {
				res.sendStatus(400);	
			}
		);
}

function postEdit(req, res) {
	var id = req.params.postId;
	PostModel
		.findById(id)
		.then(
			function(post) {
				res.json(post)
			},
			function(err) {
				res.sendStatus(400);	
			}
		);
}

function postUpdate(req, res) {
	var id = req.params.postId;
	var post = req.body;
	PostModel
		.update({_id: id},{
			title: post.title,
			body: post.body
		})
		.then(
			function(status) {
				res.sendStatus(200);
			},
			function(err) {
				res.sendStatus(400);	
			}
		);
}

app.listen(3000);