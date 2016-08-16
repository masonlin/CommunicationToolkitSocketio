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
    console.log(data);
    // var filename = path.basename(data.filename);
    // var stream_out = ss_out.createStream();
    socket.emit('c_file', data);
    console.log('return to client ===');

    //
    //broadcast
    //

    //
    // use dirrectly in/out stream //這裡再改成收到串流後，轉而將串流直接廣播出去給所有使用者
    //


  });


  // console.log('Client connected');
  //
  // socket.on('s_msg',function(msg){
  //         console.log("JSON:" + msg);
  //         socket.user = JSON.parse(msg).user;
  //         socket.msg = JSON.parse(msg).msg;
  //         console.log("new user:" + JSON.parse(msg).user + " logged.");
  //
  //         console.log('send msg to client s');
  //
  //         io.emit('c_msg',JSON.stringify({
  //             user: socket.user,
  //             msg: socket.msg
  //         }));
  //         console.log('send msg to client e');
  //
  // });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

console.log('start express server\n');
