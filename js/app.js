import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp.js';

console.log(process.env.NODE_ENV)
ReactDOM.render(
	<TodoApp />,
	document.getElementById('todoapp')
);