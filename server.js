var express = require('express')
var app = express()
var Todos = require('./db').Todos

//init list
app.get('/findall', function(req, res){
	Todos.find({}, function(err, todos_data){
		if(err) res.send(err)
		res.jsonp(todos_data);
	}).sort({time: -1})
})

//add item
app.get('/add', function(req, res){
	var todo_data = new Todos(req.query.item);
	todo_data.save(function(err){
		if(!err){
			res.jsonp({status: 1, message: 'saved'});
		}else{
			res.send(err)
			res.jsonp({status: 0, message: 'failed'});
		}
	})
})

//update item
app.get('/update/:id', function(req, res){
	var state = req.query.state,
		cont = req.query.cont,
		time = req.query.time;
	Todos.findOne({id: req.params.id}, function(err, todo_data){
		if(err) res.send(err);
		if(state) todo_data.complete = state;
		if(cont){
			todo_data.text = cont;
			todo_data.time = time;
		}
		todo_data.save(function(err){
			if(!err){
				res.jsonp({status: 1, message: 'updated'});
			}else{
				res.send(err)
				res.jsonp({status: 0, message: 'failed'});
			}
		})
	})
})

//del item
app.get('/del', function(req, res){
	var idsArray = req.query.ids;
	Todos.remove({id: {$in: idsArray}}, function(err){
		if(!err){
			res.jsonp({status: 1, message: 'deleted'});
		}else{
			res.send(err)
			res.jsonp({status: 0, message: 'failed'});
		}
	})
})



var server = app.listen(3000, function(){
	console.log('Server running at http://localhost:' + server.address().port)
})