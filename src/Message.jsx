import React, { Component } from 'react';


//child to  App Component
class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}


export default Message;