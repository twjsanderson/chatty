// Setting up in express
const express = require('express');
const http = require('http');
// Using Websocket
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express()


// Create a new server using http (that was required) with the const app (that was created with express())
const server = http.createServer(app);
// Create a new SocketServer with our newly created http.server
const wss = new SocketServer({server});

//Using the websocket wss prefix we have created a function
//Broadcast a JSON object that is stringified, to all clients listening
//WebSocket can only send binary and string data across its sockets
wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
    console.log('A client is connected!')
    //a variable with the parsed JSON count incoming from clients
    const objCount = JSON.parse(wss.clients.size)
    const objectToBroadcast = {
      count: objCount,
      type: 'outgoing-usercount'
    };
    //Send the objectToBroadcast through the socket in JSON format
    wss.broadcastJSON(objectToBroadcast);

  ws.on('message', data => {
    //create a variable with the parsed JSON data in it that is incoming from the client
    const objData = JSON.parse(data);

    //Conditional switch used to assess the type of data in objData and do things with it
    switch (objData.type) {
      case 'incoming-message': {
        const objectToBroadcast = {
          id: uuid(),
          username: objData.username,
          content: objData.content,
          type: 'outgoing-message'
        };
        //Send the objectToBroadcast through the socket in JSON format
        wss.broadcastJSON(objectToBroadcast);
        break; }

      case 'incoming-notification': {
        const objectToBroadcast = {
            id: uuid(),
            content: objData.content,
            type: 'outgoing-notification'
        };
        //Send the objectToBroadcast through the socket in JSON format
        wss.broadcastJSON(objectToBroadcast);
        break; }
      default:
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.

  ws.on('close', () => {
    console.log('Client disconnected!')
    const objCount = JSON.parse(wss.clients.size)
    const objectToBroadcast = {
      count: objCount,
      type: 'outgoing-usercount'
    };
    //Send the objectToBroadcast through the socket in JSON format
    wss.broadcastJSON(objectToBroadcast);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
