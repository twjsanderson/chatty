import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    // Stores app data
    this.state = {
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
        case 'text-message':
          this.setState({
            messages: [...this.state.messages, json]
          });
          break;
        case 'initial-messages':
          this.setState({ messages: json.messages });
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

  _handleMessages = messageObject => {
    const newMessage = {
      key : this.state.messages.id,
      username : messageObject.name,
      content : messageObject.message,
      type: 'text-message'
    }
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage]
    this.socket.send(JSON.stringify(newMessage));

    this.setState({ content: '' });
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar _handleNames={this._handleNames} _handleMessages={this._handleMessages} currentUser={this.state.messages.username} />
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
