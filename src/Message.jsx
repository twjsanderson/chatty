import React, { Component } from 'react';
// import PropTypes from 'prop-types';


//child to  App Component
class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.userName}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}


export default Message;