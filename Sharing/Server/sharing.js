/**
* @overview send message for your friend
*
* @author Mason Lin
* @version v0.0.1 2016/08/10 start
*
*/

const express = require('express');
const socketIO = require('socket.io');
// const ss_in = require('socket.io-stream');
// const ss_out = require('socket.io-stream');
const path = require('path');
const fs = require('fs');

PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT,  () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

// io.of('/user')
io.on('connection', (socket) => {
  socket.on('s_file', (data) => {

    console.log('=====readFile=======');

    socket.emit('c_file', data);
    console.log('return to client ===');

  });


  socket.on('disconnect', () => console.log('Client disconnected'));
});

console.log('start express server\n');
