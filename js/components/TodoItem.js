import React, {Component, PropTypes} from 'react'
import ToDoTextInput from './ToDoTextInput'
import {observer} from "mobx-react"
import TodoStore from '../stores/TodoStore'
import classNames from 'classnames'
import DevTools from 'mobx-react-devtools'
import Util from '../Util.js'

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
				<button className="Del" onClick={()=>this._onDelete()}>Del</button>
				{this.state.isEditing ? 
					<ToDoTextInput onSave={this._onSave.bind(this)} className="edit" value={todo.text} onFilter={()=>null} /> : null}
				<input
					className="toggle"
					type="checkbox"
					checked={todo.complete}
					onChange={()=>this._onToggle()}
				/>
				<label onDoubleClick={()=>this._onEdit()}>{todo.text}</label>
				<DevTools/>
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
		let that = this,
			todo = that.props.todo,
			originalVal = todo.text,
			newDate = new Date();

		if(text.trim()){
			TodoStore.update(todo.id, {cont: text, time: newDate}, function(data){
				if(data.status){
					todo.text = text;
					todo.time = newDate;
					Util.toast('update success');
				}else{
					Util.toast('failed');
				}
			});
		}else{
			todo.text = originalVal;
		}
		that.setState({isEditing: false});
	}

	_onToggle(){
		let that = this,
			todo = that.props.todo;

		TodoStore.update(todo.id, {state: !todo.complete}, function(data){
			if(data.status) todo.complete = !todo.complete;
		});
	}
}

module.exports = TodoItem;