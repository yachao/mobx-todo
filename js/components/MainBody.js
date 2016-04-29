import React, {Component} from 'react'
import TodoItem from './TodoItem'
import {observer} from 'mobx-react'
import TodoStore from '../stores/TodoStore'

@observer class MainBody extends Component{
	render(){
		if (TodoStore.todos.length < 1) {
			return null;
		}
		let areAllComplete = TodoStore.unfinishedTodoCount <= 0;
		let todos = TodoStore.visibleTodos.sort(TodoStore[`sortBy${TodoStore.sortBy.type}`]).map(function(item){
			return (<TodoItem key={item.id} todo={item} />)
		});
		TodoStore.sortBy.reversed ? todos = todos.reverse():null;

		function toggleReverse(){
			TodoStore.sortBy.reversed = !TodoStore.sortBy.reversed;
		}

		return (
			<section>
				<div className="option">
					<label>
						<input
						id="toggleAll"
						type="checkbox"
						onChange={this._onToggleCompleteAll.bind(this,areAllComplete)}
						checked={areAllComplete ? 'checked' : ''}
					/>
						all
					</label>
					<button onClick={()=>{
						TodoStore.sortBy.type = 'Date';
						toggleReverse()
					}}>sort by date</button>
					<button onClick={()=>{
						TodoStore.sortBy.type = 'Name';
						toggleReverse()
					}}>sort by name</button>
				</div>
				<ul className="todo-list" id="todoList">{todos}</ul>
			</section>
		)
	}

	_onToggleCompleteAll(areAllComplete){
		TodoStore.todos.forEach(function(todo){
			todo.complete = !areAllComplete;
		})
	}
}

module.exports = MainBody;