var express = require('express')
var app = express()
var Todos = require('./db').Todos

app.use(express.static('.'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//init list
app.get('/findall', function(req, res){
	Todos.find({}).
	sort({time: -1}).
	exec(function(err, todos_data){
		if(err) res.send(err)
		res.json(todos_data);
	})
})

//add item
app.get('/add', function(req, res){
	var query = JSON.parse(req.query.item);
	var todo_data = new Todos(query);
	todo_data.save(function(err){
		if(!err){
			res.json({status: 1, message: 'saved'});
		}else{
			res.send(err)
			res.json({status: 0, message: 'failed'});
		}
	})
})

//update item
app.put('/update/:id', function(req, res){
	var query = JSON.parse(req.query.para);
	var state = query.state,
		cont = query.cont,
		time = query.time;
	Todos.findOne({id: req.params.id}, function(err, todo_data){
		if(err) res.send(err);
		if(state !== 'underfined') todo_data.complete = state;
		if(cont){
			todo_data.text = cont;
			todo_data.time = time;
		}
		todo_data.save(function(err){
			if(!err){
				res.json({status: 1, message: 'updated'});
			}else{
				res.send(err)
				res.json({status: 0, message: 'failed'});
			}
		})
	})
})

//toggle all state
app.put('/changeallstate', function(req, res){
	var state = req.query.state === 'true';
	Todos.update({complete: !state}, {complete: state}, {multi: true}, function(err, num){
		if(!err){
			res.json({status: 1, message: 'updated'});
		}else{
			res.send(err)
			res.json({status: 0, message: 'failed'});
		}
	})
})

//del item
app.delete('/del', function(req, res){
	var idsArray = req.query.ids.split(',');
	Todos.remove({id: {$in: idsArray}}, function(err){
		if(!err){
			res.json({status: 1, message: 'deleted'});
		}else{
			res.send(err)
			res.json({status: 0, message: 'failed'});
		}
	})
})



var server = app.listen(3000, function(){
	console.log('Server running at http://localhost:' + server.address().port)
})