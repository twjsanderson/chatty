import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    // Stores app data
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [], // messages coming from the server will be stored here as they arrive
      count: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    //event emitted when connected
    this.socket.onopen = event => {
      console.log('Websocket is connected')
    };

    //event emitted when client recieves message from server
    this.socket.onmessage = payload => {
      console.log('Recieved message from server. This was the payload: ', payload);
      const json = JSON.parse(payload.data);

      switch (json.type) {
        case 'outgoing-message':
          this.setState({
            messages: [...this.state.messages, json]
          });
          break;
        case 'outgoing-notification':
          this.setState({
            messages: [...this.state.messages, json]
          });
          break;
        case 'outgoing-usercount':
          this.setState({
            count: json.count
          });
          break;
        default:
      }
    };

    //event emitted when connection closed
    this.socket.onclose = event => {
      console.log('Disconnected from the WebSocket')
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Chatty Bot", content: "Welcome to Chatty App!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 2000);
  }

  // A helper function designed to take messages in the form of an object and send them to the server via WebSocket
  addMessage = messageContent => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: messageContent,
      type: 'incoming-message'
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  // A helper function designed to take new user names and send them to the server via WebSocket
  addNotification = userName => {
    const newMessage = {
      content: `${this.state.currentUser.name} changed their name to ${userName}.`,
      type: 'incoming-notification'
    }
    this.setState({currentUser: {name: userName}});
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty App</a>
          <span className="users-online">Users Online: {this.state.count} </span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} addNotification={this.addNotification} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

/* exports to App.jsx */
export default App;



//App needs messages and via messageList and currentUser
