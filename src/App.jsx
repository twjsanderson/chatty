import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor() {
    super();
    // Stores app data
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      {key: 1, username: "Bob", content: "Has anyone seen my marbles?"},
      {key: 2,username: "Anonymous", content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
      ],
      counter: 4
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  _handleMessages = event => {
    const newMessage = {
      key : this.state.counter,
      username : this.state.currentUser.name,
      content : event
    }
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage]
    const oldCounter = this.state.counter
    const newCounter = oldCounter + 1
    this.setState({
      messages: newMessages,
      counter: newCounter
    })
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar _handleMessages={this._handleMessages} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

//child to  App Component
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

/* exports to App.jsx */
export default App;



//App needs messages and via messageList and currentUser
