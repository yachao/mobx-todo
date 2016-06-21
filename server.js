var express = require('express')
var app = express()
var Todos = require('./db').Todos

//index page
app.get('/todos', function(req, res){
	Todos.find({}, function(err, todos){
		res.jsonp(todos);
	})
})

var server = app.listen(3000, function(){
	console.log('Server running at http://localhost:' + server.address().port)
})