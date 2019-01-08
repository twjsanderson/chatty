import React, { Component } from 'react';
import Message from './Message.jsx'

//child to  App Component
class MessageList extends Component {
  constructor () {
      super();

      this.state = {
        name: false
      }
    }

  render() {
    return (
      <main className="messages">
        <Message />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;

// A list of messages, where every message identifies the user who posted the message