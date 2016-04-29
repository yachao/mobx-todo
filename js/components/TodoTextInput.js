import React, {Component, PropTypes} from 'react'

let ENTER_KEY_CODE = 13;

class ToDoTextInput extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		placeholder: PropTypes.string,
		onSave: PropTypes.func.isRequired,
		value: PropTypes.string
	}

	state = {
		value: this.props.value || ''
	}

	render(){
		return (
			<input
				id={this.props.id}
				className={this.props.className}
				type="text" 
				placeholder={this.props.placeholder}
				onChange={this._onChange.bind(this)}
				onBlur={()=>this._save()}
				onKeyDown={this._onKeyDown.bind(this)}
				value={this.state.value}
				autoFocus={true}
			/>
		)
	}
	
	_onChange(event){
		this.setState({
			value: event.target.value
		});
	}

	_save(){
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	}

	_onKeyDown(event){
		if (event.keyCode === ENTER_KEY_CODE) {
			this._save();
		}
	}
}

module.exports = ToDoTextInput;
