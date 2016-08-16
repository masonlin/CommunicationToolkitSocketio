var React = require('react');
var socketio = require('socket.io-client');
// var ss = require('socket.io-stream');
var base64 = require('base-64');
var utf8 = require('utf8');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();
var path = require('path');
// var BufferStreamReader = require('buffer-stream-reader');
// var mystream = require('stream');
// var util = require('util');
// var WritableStream = require('../writable-stream');


var Sockets = React.createClass({
  _socketData: [],
  socket: null,
  _userName: '',

  iniSocketCon: function(iniDatas) {
    if(oMasonConf.isDev == true){
      this.socket && this.socket.disconnect();                              //disconnect socket if it has connection
      this.socket = socketio.connect('http://' + iniDatas.ip + ':8080/');   //change to parameters (IP:PORT)
      this._userName = iniDatas.username;
    }else{
      // console.log('rlease version');
      // this.socket = socketio.connect('http://mason-restful.herokuapp.com');
    }


  },
  onChange: function(iniDatas) {
    this.iniSocketCon(iniDatas);
  },


  sendSocketData: function(inputFile) {
    console.log('======in sendSocketData======');
    console.log(inputFile);

    var FR= new FileReader();

    console.log(inputFile);
    var fileData;
    var reader = new FileReader();
    FR.onloadend = function() {
      fileData = FR.result;

      this.socket.emit('s_file', JSON.stringify({size: inputFile.size,
                                                 filename: inputFile.name,
                                                 username: this._userName,
                                                 file: fileData}));
    }.bind(this);
    console.log(FR.readAsDataURL(inputFile));


    this.socket.on('c_file', function(data){
      console.log('======in c_file======');
      this._socketData.push(data);
      this.setState(JSON.parse(data));
    }.bind(this));
  },
  onSend: function(inputData) {
    this.sendSocketData(inputData);
  },




  emptyFn: function(){},

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
    console.log(this._socketData);
    var images = this._socketData.map(function(content, index) {
      var file = JSON.parse(content).file;
      var user = JSON.parse(content).username;
      var idx = user + '-' + (new Date()).toString() + '-' + index;

      return (
        <div>
          <img src={file} key={idx}/> {user}
        </div>
      );
    });

    return (
      <div>
          {images}
      </div>
    );

  }




});

// var divStyle = {
//   width: '500px',
//   height: '500px'
// };

module.exports = Sockets;
