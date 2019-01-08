import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor () {
    super();
    // Stores app data
    this.state = {
      currentUser: false
    }
    //send to ChatBar
    // this.props
  }




  render() {
    const something = 'say stuff';
    return (
      <div className="container">
        <NavBar />
        <MessageList />
        <ChatBar />
      </div>
    );

  }
}

//child to  App Component
class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      name: false
    }

  }

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
