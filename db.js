var uri = 'mongodb://localhost:27017/todo'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

var todoSchema = mongoose.Schema({
  id: Number,
  text: String,
  complete: Boolean,
  time: {type: Date, default: Date.now}
})

exports.Todos = mongoose.model('todos', todoSchema)