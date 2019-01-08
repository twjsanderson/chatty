import React, { Component } from 'react';

//child to  App Component
class Message extends Component {
  constructor () {
    super();

    this.state = {
      name: false
    }
  }

  render() {
    return (
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won't be impressed with technology until I can download food.</span>
      </div>
    );
  }
}

export default Message;