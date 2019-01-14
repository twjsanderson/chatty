import React, { Component } from 'react';


//child to  App Component
class Message extends Component {
  render() {
    let contentDisplay;
      if (this.props.type === 'outgoing-notification') {
        contentDisplay = <span className="message-notification">{this.props.content}</span>
        } else {
          contentDisplay = <span className="message-content">{this.props.content}</span>
        }
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        {contentDisplay}
      </div>
    );
  }
}


export default Message;