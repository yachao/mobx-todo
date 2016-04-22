import React, {Component} from 'react';
import TodoItem from './TodoItem';
import {observer} from 'mobx-react';
import TodoStore from '../stores/TodoStore';

@observer class MainBody extends Component{
	render(){
		if (TodoStore.todos.length < 1) {
			return null;
		}
		let areAllComplete = TodoStore.unfinishedTodoCount <= 0;
		let todos = [];
		TodoStore.visibleTodos.forEach(function(item){
			todos.push(<TodoItem key={item.id} todo={item} />)
		});

		return (
			<section>
				<div className="option">
					<input
						id="toggle-all"
						type="checkbox"
						onChange={this._onToggleCompleteAll.bind(this,areAllComplete)}
						checked={areAllComplete ? 'checked' : ''}
					/>
					<button onClick={()=>this._onSortByName()}>sort by name</button>
					<button>sort by date</button>
				</div>
				<ul id="todo-list">{todos}</ul>
				<div><a href="javascript:;" onClick={this._onFilter.bind(this,'show_all')}>all</a> <a href="javascript:;" onClick={this._onFilter.bind(this,'show_completed')}>completed</a> <a href="javascript:;" onClick={this._onFilter.bind(this,'show_active')}>active</a></div>
			</section>
		)
	}

	_onToggleCompleteAll(areAllComplete){
		TodoStore.todos.forEach(function(todo){
			todo.complete = !areAllComplete;
		})
	}
	_onSortByName(){
		TodoStore.sortByName();
	}
	_onFilter(state){
		TodoStore.setFilter(state);
	}
}

module.exports = MainBody;