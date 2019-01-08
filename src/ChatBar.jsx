import React, { Component } from 'react';
// import PropTypes from 'prop-types';

//child to  App Component
class ChatBar extends Component {
  constructor () {
    super();

    this.state = {
      name: false
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;


//shows the currentUser