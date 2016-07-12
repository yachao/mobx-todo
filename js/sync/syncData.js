import Util from '../Util.js'

let SERVER = 'http://localhost:3000/';

let OPT = {
	//select all
	getAll: async function(cb){
		// $.getJSON(SERVER + 'findall?callback=?', function(data){
		// 	cb(data);
		// });

		// fetch(SERVER + 'findall', {mode: 'cors'}).then(response => response.json()).then(data => {
		// 	cb(data);
		// });
		try {
			let response = await fetch(SERVER + 'findall', {mode: 'cors'});
			let data = await response.json();
			cb(data);
		}catch(e){
			console.log('error: ', e);
		}
	},

	//add item
	addItem: async function(para, cb){
		// $.ajax({
		//     url: SERVER + 'add?callback=?',
		//     type: 'GET',
		//     dataType: 'JSON',
		//     data: para,
		//     beforeSend: function(){
		//         Util.showLoading();
		//     },
		//     timeout: 20000
		// }).done(function(data){
		// 	cb(data);
		// }).fail(function(){
		// 	Util.toast('Connection failed.');
		// }).always(function(){
		// 	Util.hideLoading();
		// });
		let u = new URLSearchParams();
		u.append('item', JSON.stringify(para));
		Util.showLoading();
		try {
			let response = await fetch(SERVER + 'add?' + u, {
				mode: 'cors'
			});
			let data = await response.json();
			cb(data);
		}catch(e){
			console.log('error: ', e);
		}
		Util.hideLoading();
	},

	//update item
	updateItem: async function(id, para, cb){
		// $.ajax({
		//     url: SERVER + 'update/' + id + '?callback=?',
		//     type: 'GET',
		//     dataType: 'JSON',
		//     data: para,
		//     beforeSend: function(){
		//         Util.showLoading();
		//     },
		//     timeout: 20000
		// }).done(function(data){
		// 	cb(data);
		// }).fail(function(){
		// 	Util.toast('Connection failed.');
		// }).always(function(){
		// 	Util.hideLoading();
		// });
		let u = new URLSearchParams();
		u.append('para', JSON.stringify(para));
		Util.showLoading();
		try {
			let response = await fetch(SERVER + 'update/' + id + '?' + u, {
				method: 'PUT',
				mode: 'cors'
			});
			let data = await response.json();
			cb(data);
		}catch(e){
			console.log('error: ', e);
		}
		Util.hideLoading();
	},

	//toggle all state
	changeAllState: async function(para, cb){
		// $.ajax({
		//     url: SERVER + 'changeallstate?callback=?',
		//     type: 'GET',
		//     dataType: 'JSON',
		//     data: para,
		//     beforeSend: function(){
		//         Util.showLoading();
		//     },
		//     timeout: 20000
		// }).done(function(data){
		// 	cb(data);
		// }).fail(function(){
		// 	Util.toast('Connection failed.');
		// }).always(function(){
		// 	Util.hideLoading();
		// });
		let u = new URLSearchParams();
		u.append('state', JSON.stringify(para));
		Util.showLoading();
		try {
			let response = await fetch(SERVER + 'changeallstate' + '?' + u, {
				method: 'PUT',
				mode: 'cors'
			});
			let data = await response.json();
			cb(data);
		}catch(e){
			console.log('error: ', e);
		}
		Util.hideLoading();
	},

	//delete item
	deleteItem: async function(para, cb){
		// $.ajax({
		//     url: SERVER + 'del?callback=?',
		//     type: 'GET',
		//     dataType: 'JSON',
		//     data: para,
		//     beforeSend: function(){
		//         Util.showLoading();
		//     },
		//     timeout: 20000
		// }).done(function(data){
		// 	cb(data);
		// }).fail(function(){
		// 	Util.toast('Connection failed.');
		// }).always(function(){
		// 	Util.hideLoading();
		// });
		let u = new URLSearchParams();
		u.append('ids', para);
		Util.showLoading();
		try {
			let response = await fetch(SERVER + 'del?' + u, {
				method: 'DELETE',
				mode: 'cors'
			});
			let data = await response.json();
			cb(data);
		}catch(e){
			console.log('error: ', e);
		}
		Util.hideLoading();
	}
}

export default OPT;