import React, { Component } from 'react';

//child of App Component
class ChatBar extends Component {

  //This function validates the name input using an if statement after Enter has been pushed
  //It sends this.state to _handleMessages in the parent App Component
  nameSubmitValidation = event => {
    if (event.key === 'Enter' ) {
      this.props.addNotification(event.target.value)
    }
  }
  //This function validates the input using an if statement to execute after Enter has been pushed
  //It sends this.state to _handleMessages in the parent App component
  //The message is then reset to blank using setState
  contentSubmitValidation = event => {
    if (event.key === 'Enter') {
      this.props.addMessage(event.target.value);
      event.target.value = "";
    };
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onKeyPress={this.nameSubmitValidation}
          placeholder="Enter a name (optional)"
          />
        <input
          className="chatbar-message"
          onKeyPress={this.contentSubmitValidation}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;


//shows the currentUser