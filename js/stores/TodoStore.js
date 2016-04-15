import {observable,computed} from 'mobx';

class TodoStore {
	@observable todos = [
		{id: 1, text: 'do something', complete: false, time: new Date('2016-04-13')}
	];

	@computed get finishedTodoCount() {
		return this.todos.filter(todo => todo.complete).length;
	}

	@computed get unfinishedTodoCount(){
		return this.todos.filter(todo => !todo.complete).length;
	}

	add(todo) {
		this.todos.push(todo);
	}

	del(todo) {
		this.todos = this.todos.filter((item) => item != todo);
	}

	clearCompleted() {
		this.todos = this.todos.filter((item) => !item.complete);
	}
}

module.exports = new TodoStore();