import React from 'react';
import Header from './Header';
import MainBody from './MainBody';
import Footer from './Footer';

let TodoApp = React.createClass({
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div>
				<Header />
				<MainBody />
				<Footer />
			</div>
		);
	}
});

module.exports = TodoApp;