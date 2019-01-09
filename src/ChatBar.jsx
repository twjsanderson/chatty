import React, { Component } from 'react';
// import PropTypes from 'prop-types';

//child to  App Component
function ChatBar(props) {
  const inputValidation = event => {
    if (event.key === 'Enter') {
      return props._handleMessages(event.target.value);

    };
  }

  return (
    <footer className="chatbar" onKeyPress={inputValidation}>
      <input className="chatbar-username" placeholder={props.currentUser} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

export default ChatBar;


//shows the currentUser