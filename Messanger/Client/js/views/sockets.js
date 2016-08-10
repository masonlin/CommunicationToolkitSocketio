var React = require('react');
var socketio = require('socket.io-client');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();

var Sockets = React.createClass({
  _socketData: '',
  socket: null,

  getSocketData: function(){
    if(oMasonConf.isDev == true){
      console.log('develop version');
      this.socket = socketio.connect('http://192.168.1.101:8080/');   //change to parameters (IP:PORT)
    }else{
      console.log('rlease version');
      this.socket = socketio.connect('http://mason-restful.herokuapp.com');
    }

    //
    var fuck='Hi, nice to meet you.';
    console.log('send' + fuck);
    this.socket.emit('s_msg', JSON.stringify({ user: 'me', msg: fuck }))
    console.log('send OK');
    //

    this.socket.on('c_msg', function(data){
      console.log('get msg:' + data);
      this._socketData = data;
      //this.setState(data);
      this.setState(JSON.parse(data));
    }.bind(this));
  },
  onChange: function(){
    this.getSocketData();
  },


  sendSocketData: function(){
    this.socket.emit('s_msg', { user: 'me', msg: 'TESTTESTTESTTTTT!' })    //要改成TEXTBOX裡的訊息
  },
  onSend: function(){
    this.sendSocketData();
  },


  getInitialState: function(){
    return {
      getSocketState: ''
    }
  },

  componentDidMount: function(){
    SocketStore.addChangeListener(this.onChange);
    SocketStore.addSendListener(this.onSend);
  },

  componentWillUnmount: function(){
    SocketStore.removeChangeListener(this.onChange);
    SocketStore.removeSendListener(this.onSend);
  },

  render: function() {
    console.log('render');
    // var user = (this._socketData ? JSON.parse(this._socketData).user : "");
    var msg = (this._socketData ? JSON.parse(this._socketData).msg : "");
    return (
      <span>
        'hi: ' {msg}
      </span>
    );
  }




});

module.exports = Sockets;
