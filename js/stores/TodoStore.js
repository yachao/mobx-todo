import {observable,computed} from 'mobx'
import Immutable from 'immutable'
import {Map} from 'immutable'

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
	@observable todos;

	@observable sortBy = {
		reversed:false,
		type:'Default' //默认排序
	}

	constructor(){
		this.todos = [
			{id: 1, text: 'do something', complete: false, time: new Date('2016-04-13')}
		];

	}

	@computed get finishedTodoCount() {
		return this.todos.filter(todo => todo.complete).length;
	}

	@computed get unfinishedTodoCount(){
		return this.todos.filter(todo => !todo.complete).length;
	}

	@computed get visibleTodos() {
		return this.todos.filter(TODO_FILTERS[this.filter])
	}

	add(todo) {
		this.todos.unshift(todo);
	}

	del(todo) {
		this.todos = this.todos.filter((item) => item != todo);
	}

	clearCompleted() {
		this.todos = this.todos.filter((item) => !item.complete);
	}

	setFilter(filter) {
		this.filter = filter;
	}


	sortByDefault(a,b){
		return 1;
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
