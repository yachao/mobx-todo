import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import classnames from 'classnames'
import TodoStore,{ SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../stores/TodoStore'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

@observer class Footer extends Component{
	renderFilterLink(store, filter){
		const text = FILTER_TITLES[filter];
		return (
			<a className={classnames({'selected': filter == store.filter})}
				href="javascript:;"
				onClick={()=>store.setFilter(filter)}>
				{text}
			</a>
		)
	}

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
			<section className="bottom">
				<ul className="filter-list">
					{[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
						<li key={filter}>
							{this.renderFilterLink(TodoStore, filter)}
						</li>
					)}
				</ul>
				<div className="info">
					{clearButton}
					<strong>{finishedCount}</strong>
					{showText}
				</div>
			</section>
		)
	}

	_onClearCompletedClick(){
		TodoStore.clearCompleted();
	}
}

module.exports = Footer;