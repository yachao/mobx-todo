import {observable,computed} from 'mobx'
import $ from '../lib/Zepto.js'
import OPT from '../sync/syncData.js'
import Util from '../Util.js'
import mobx from 'mobx'

export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: todo => !todo.complete,
	[SHOW_COMPLETED]: todo => todo.complete
}

class TodoStore {
	@observable filter = SHOW_ALL;
	@observable key = '';
	@observable todos;

	@observable sortBy = {
		reversed: false,
		type: 'Default' //默认排序
	}

	constructor(){
		let that = this;
		this.todos = [];
		OPT.getAll((data) => {
			that.todos = data;
		});
	}

	@computed get finishedTodoCount() {
		return this.todos.filter(todo => todo.complete).length;
	}

	@computed get unfinishedTodoCount(){
		return this.todos.filter(todo => !todo.complete).length;
	}

	@computed get visibleTodos() {
		let pattern = new RegExp(this.key);
		return this.todos.filter(TODO_FILTERS[this.filter]).filter(todo => pattern.test(todo.text)).sort(this[`sortBy${this.sortBy.type}`]);
	}

	add(todo) {
		OPT.addItem(todo, (data) => {
			if(data.status){
				// Util.toast('add success');
				this.todos.unshift(todo);
			}else{
				Util.toast('failed');
			}
		});
	}

	del(todo) {
		OPT.deleteItem([todo.id], (data) => {
			if(data.status){
				// Util.toast('delete success');
				this.todos = this.todos.filter((item) => item != todo);
			}else{
				Util.toast('failed');
			}
		});
	}

	update(id, para, cb){
		OPT.updateItem(id, para, cb);
	}

	changeAllState(state){
		OPT.changeAllState(state, (data) => {
			if(data.status){
				this.todos.forEach(function(todo){
					todo.complete = state;
				});
			}else{
				Util.toast('failed');
			}
		});
	}

	clearCompleted() {
		let ids = [];
		this.todos.map((item) => {
			if(item.complete) ids.push(item.id)
		});
		OPT.deleteItem(ids, (data) => {
			if(data.status){
				// Util.toast('delete success');
				this.todos = this.todos.filter((item) => !item.complete);
			}
		});
	}

	setFilter(filter) {
		this.filter = filter;
	}

	sortByDefault(a,b){
		return -1;
	}

	sortByName(a,b){
		return a.text.localeCompare(b.text)
	}

	sortByDate(a,b){
		if(a.time < b.time) return -1
		if(a.time > b.time) return 1
		return 0
	}
}

let todostore = new TodoStore();
export default todostore;
