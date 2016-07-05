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
			<li id={todo.id} className={classNames('flex', {'completed': todo.complete,'editing': this.state.isEditing && !todo.complete})}>
				<label className="todo-lbl">
					<div className="chk">
						<input
							className="chk-input"
							type="checkbox"
							checked={todo.complete}
							onChange={()=>this._onToggle()}
						/>
						<i className="chk-icon"></i>
					</div>
				</label>
				<p className="todo-text" onDoubleClick={()=>this._onEdit()}>{todo.text}</p>
				<i className="delete" onClick={()=>this._onDelete()}></i>
				{this.state.isEditing && !todo.complete ? <ToDoTextInput onSave={this._onSave.bind(this)} className="edit" value={todo.text} onFilter={()=>null} /> : null}
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
					// Util.toast('update success');
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