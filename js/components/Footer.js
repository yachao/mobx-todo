import React, {Component, PropTypes} from 'react';
import {observer} from "mobx-react";
import TodoStore from '../stores/TodoStore';

@observer class Footer extends Component{
	render(){
		let total = TodoStore.todos.length,
			finishedCount,
			showText,
			clearButton;

		if (total === 0) {
			return null;
		}

		finishedCount = TodoStore.finishedTodoCount;
		showText = finishedCount < 2 ? ' item done' : ' items done';
		if(finishedCount){
			clearButton = (
				<button onClick={()=>this._onClearCompletedClick()}>
					clear completed
				</button>
			)
		}

		return (
			<section>
				<strong>{finishedCount}</strong>
				{showText}
				{clearButton}
			</section>
		)
	}

	_onClearCompletedClick(){
		TodoStore.clearCompleted();
	}
}

module.exports = Footer;