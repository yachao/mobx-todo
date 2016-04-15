import React, {Component} from 'react';
import TodoItem from './TodoItem';
import {observer} from 'mobx-react';
import TodoStore from '../stores/TodoStore';

@observer class MainBody extends Component{
	render(){
		let todos = [];
		TodoStore.todos.forEach(function(item){
			todos.push(<TodoItem key={item.id} todo={item} />)
		});

		return (
			<section>
				<ul id="todo-list">{todos}</ul>
			</section>
		)
	}
}

module.exports = MainBody;