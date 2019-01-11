import React, { Component } from 'react';
import Message from './Message.jsx'

//child to  App Component
class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message, key) => (
      <Message key={key} username={message.username} content={message.content} />
    ));
    return (
      <main>
        {messages}
      </main>
    );
  }
}

export default MessageList;
