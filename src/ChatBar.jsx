import React, { Component } from 'react';

//child of App Component
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      name: ""
    }
  }
  //This function is used to re-set and re-render(using setState) the state of this.state.message to whatever is declared in the constructor
  //Using the arrow function we avoid the need for the .bind on handleChange
  handleChange = e => {
    this.setState({message: e.target.value})
  }

  handleNameChange = e => {
    this.setState({name: e.target.value})
  }

  nameSubmitValidation = event => {
    if (event.key === 'Enter' ) {
      this.props._handleMessages(this.state)
    }
  }

  //This function validates the input using an if statement to execute after Enter has been pushed
  //It sends this.state.message to _handleMessages in the parent App component
  //The message is then reset to blank using setState
  contentSubmitValidation = event => {
    if (event.key === 'Enter') {
      this.props._handleMessages(this.state);
      this.setState({message: ""})
    };
  }


  //IMPORTANT the value of the chat-bar message is set in the constructor as ""
  //When it changes (ie. onKeyPress) handleChange is called via onChange to reset it to ""
  //If the field is left blank or an empty field is sent REACT is smart enough to know what the original state was keep it without entering an infinite loop
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          value={this.state.name}
          onKeyPress={this.nameSubmitValidation}
          onChange={this.handleNameChange}
          placeholder="Enter a name (optional)"
          />
        <input
          className="chatbar-message"
          value={this.state.message}
          onKeyPress={this.contentSubmitValidation}
          onChange={this.handleChange}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;


//shows the currentUser