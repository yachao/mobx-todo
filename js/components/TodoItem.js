import React, {Component, PropTypes} from 'react';
import ToDoTextInput from './ToDoTextInput';
import {observer} from "mobx-react";
import TodoStore from '../stores/TodoStore';
import classNames from 'classnames';

@observer class TodoItem extends Component{
	constructor(props){
		super(props);
	}

	static propTypes = {
		todo: PropTypes.object.isRequired
	}

	state = {
		isEditing: false
	}

	render(){
		let todo = this.props.todo;
		return (
			<li id={todo.id} className={classNames({'completed': todo.complete,'editing': this.state.isEditing})}>
				<input
					className="toggle"
					type="checkbox"
					checked={todo.complete}
					onChange={()=>this._onToggle()}
				/>
				<label onDoubleClick={()=>this._onEdit()}>{todo.text}</label>
				<button className="Del" onClick={()=>this._onDelete()}>Del</button>
				{this.state.isEditing ? 
					<ToDoTextInput onSave={this._onSave.bind(this)} className="edit" value={todo.text}/> : null}
			</li>
		)
	}

	_onEdit(){
		this.setState({
			isEditing: true
		});
	}

	_onDelete(){
		TodoStore.del(this.props.todo);
	}

	_onSave(text){
		let originalVal = this.props.todo.text;
		if(text.trim()){
			this.props.todo.text = text;
		}else{
			this.props.todo.text = originalVal;
		}
		this.props.todo.time = new Date();
		this.setState({isEditing: false});
	}

	_onToggle(){
		this.props.todo.complete = !this.props.todo.complete;
	}
}

module.exports = TodoItem;