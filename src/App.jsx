import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    // Stores app data
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    //event emitted when connected
    this.socket.onopen = () => {
      console.log('Websocket is connected')
    };

    //event emitted when client recieves message from server
    this.socket.onmessage = payload => {
      console.log('Recieved message from server. This was the payload via onmessage: ', payload);
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
        default:
      }
    };

    //event emitted when connection closed
    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket')
    }


    console.log("componentDidMount <App />");
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

  // A helper function designed to take user inputs, in the form of an object and send them to the server via WebSocket
  addMessage = messageContent => {
    const newMessage = {
      username : this.state.currentUser.name,
      content : messageContent,
      type: 'incoming-message'
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  addNotification = userName => {
    const newMessage = {
      content : `${this.state.currentUser.name} changed their name to ${userName}.`,
      type: 'incoming-notification'
    }
    this.setState({currentUser: {name: userName}});
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} addNotification={this.addNotification} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

//child to  App Component
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
      </nav>
    );
  }
}

/* exports to App.jsx */
export default App;



//App needs messages and via messageList and currentUser
