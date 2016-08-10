/**
* @overview send message for your friend
*
* @author Mason Lin
* @version v0.0.1 2016/08/10 start
*
*/

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT,  () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');

  // setInterval(function(){
  //   var date = new Date();
  //   socket.broadcast.emit('clientReceiveMsg',JSON.stringify({'time': date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()}));
  // }, 100);

  socket.on('s_msg',function(msg){
          console.log("JSON:" + msg);
          socket.user = JSON.parse(msg).user;
          socket.msg = JSON.parse(msg).msg;
          console.log("new user:" + JSON.parse(msg).user + " logged.");
          // io.emit('who_come',{
          //     user: socket.user
          // });

          //日後這裡可以寫入DB

          console.log('send msg to client s');
          // socket.broadcast.emit('c_msg',{
          //     user: socket.user
          // });
          io.emit('c_msg',JSON.stringify({
              user: socket.user,
              msg: socket.msg
          }));
          console.log('send msg to client e');

  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

console.log('start express server\n');
