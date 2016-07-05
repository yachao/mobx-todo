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
		onFilter: PropTypes.func.isRequired,
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
				onKeyUp={this._onKeyUp.bind(this)}
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

	_onKeyUp(event){
		if (event.keyCode === ENTER_KEY_CODE) {	//Enter to save
			this._save();
		}else{	//Fitler result
			this.props.onFilter(event.target.value);
		}
	}
}

module.exports = ToDoTextInput;
