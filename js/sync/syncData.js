import Util from '../Util.js'

const ENV = 'local';
let SERVER = ENV === 'local' ? 'http://localhost:3000/' : '';

let OPT = {
	//select all
	getAll: (cb) => {
		$.getJSON(SERVER + 'findall?callback=?', function(data){
			cb(data);
		});
	},

	//add item
	addItem: (para, cb) =>{
		$.ajax({
		    url: SERVER + 'add?callback=?',
		    type: 'GET',
		    dataType: 'JSON',
		    data: para,
		    beforeSend: function(){
		        Util.showLoading();
		    },
		    timeout: 20000
		}).done(function(data){
			cb(data);
		}).fail(function(){
			Util.toast('网络在开小差，请稍后再试哦！');
		}).always(function(){
			Util.hideLoading();
		});
	},

	//update item
	updateItem: (id, para, cb) =>{
		$.ajax({
		    url: SERVER + 'update/' + id + '?callback=?',
		    type: 'GET',
		    dataType: 'JSON',
		    data: para,
		    beforeSend: function(){
		        Util.showLoading();
		    },
		    timeout: 20000
		}).done(function(data){
			cb(data);
		}).fail(function(){
			Util.toast('网络在开小差，请稍后再试哦！');
		}).always(function(){
			Util.hideLoading();
		});
	},

	//delete item
	deleteItem: (para, cb) =>{
		$.ajax({
		    url: SERVER + 'del?callback=?',
		    type: 'GET',
		    dataType: 'JSON',
		    data: para,
		    beforeSend: function(){
		        Util.showLoading();
		    },
		    timeout: 20000
		}).done(function(data){
			cb(data);
		}).fail(function(){
			Util.toast('网络在开小差，请稍后再试哦！');
		}).always(function(){
			Util.hideLoading();
		});
	}
}

export default OPT;