/**
* @overview send message for your friend
*
* @author Mason Lin
* @version v0.0.1 2016/08/10 start
*
*/

const express = require('express');
const socketIO = require('socket.io');
const ss = require('socket.io-stream');
const path = require('path');
const fs = require('fs');

PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT,  () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

// io.of('/user')
io.on('connection', (socket) => {
  ss(socket).on('s_file', (stream, data) => {
    // console.log("stream======");
    // console.log(stream);
    // console.log("data======");
    // console.log(data);

    // var blobStream = ss.createBlobReadStream(file);
    // var size = 0;
    //
    // blobStream.on('data', function(chunk) {
    //   size += chunk.length;
    //   console.log(Math.floor(size / file.size * 100) + '%');
    //   // -> e.g. '42%'
    // });
    //
    // blobStream.pipe(stream);

    console.log(data);
    var filename = path.basename(data.name);
    // var filename = path.basename(data.size);
    stream.pipe(fs.createWriteStream('./image_store/' + filename));
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
