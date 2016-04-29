import React, {Component} from 'react'
import TodoStore from '../stores/TodoStore'
import ToDoTextInput from './ToDoTextInput'

class Header extends Component {
	_onSave(text){
		if (text.trim()) {
			let date = new Date();
			let id = date.getTime();
			TodoStore.add({id: id, text: text, complete: false,time:date});
		}
	}
	
	render(){
		return (
			<header id="header">
				<h1>todos</h1>
				<ToDoTextInput
					id="addTodo"
					placeholder="Create a new item"
					onSave={this._onSave.bind(this)}
				/>
			</header>
		);
	}
}

module.exports = Header;