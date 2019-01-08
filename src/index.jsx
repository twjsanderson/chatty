// Application entrypoint.

// Load up the application styles, this refers to the top level scss which pulls all
// styles from home.scss using @import 'home'
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
// This import requires an export from App.jsx to work
import App from './App.jsx';

// Renders from App.jsx
ReactDOM.render(<App />, document.getElementById('react-root'));
