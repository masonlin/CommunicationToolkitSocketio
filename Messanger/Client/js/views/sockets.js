var React = require('react');
var socketio = require('socket.io-client');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();

var Sockets = React.createClass({
  _socketData: [],
  socket: null,
  _userName: '',

  // getSocketData: function(){
  //   if(oMasonConf.isDev == true){
  //     console.log('develop version');
  //     this.socket = socketio.connect('http://192.168.1.101:8080/');   //change to parameters (IP:PORT)
  //   }else{
  //     console.log('rlease version');
  //     this.socket = socketio.connect('http://mason-restful.herokuapp.com');
  //   }
  //
  //   //var helo = 'Hi, nice to see you again.';
  //   var helo = 'Hi, nice to meet you.';
  //   // console.log('send' + fuck);
  //   this.socket.emit('s_msg', JSON.stringify({ user: 'Bot', msg: helo }))
  //   // console.log('send OK');
  //   //
  //
  //   this.socket.on('c_msg', function(data){
  //     // console.log('get msg:' + data);
  //     // this._socketData = data;
  //     this._socketData.push(data);
  //     // this.setState(data);
  //     console.log(this._socketData);
  //     this.setState(JSON.parse(data));
  //   }.bind(this));
  // },
  // onChange: function(){
  //   this.getSocketData();
  // },

  getSocketData: function(iniDatas){
    if(oMasonConf.isDev == true){
      console.log('develop version');
      console.log(iniDatas);
      this.socket && this.socket.disconnect();                              //disconnect socket if it has connection
      this.socket = socketio.connect('http://' + iniDatas.ip + ':8080/');   //change to parameters (IP:PORT)
      this._userName = iniDatas.username;
    }else{
      console.log('rlease version');
      this.socket = socketio.connect('http://mason-restful.herokuapp.com');
    }

    //var helo = 'Hi, nice to see you again.';
    var helo = 'Hi ' + iniDatas.username + ', nice to meet you.';
    // console.log('send' + fuck);
    this.socket.emit('s_msg', JSON.stringify({ user: 'Bot', msg: helo }))
    // console.log('send OK');
    //

    this.socket.on('c_msg', function(data){
      // console.log('get msg:' + data);
      // this._socketData = data;
      this._socketData.push(data);
      // this.setState(data);
      console.log(this._socketData);
      this.setState(JSON.parse(data));
    }.bind(this));
  },
  onChange: function(iniDatas){
    this.getSocketData(iniDatas);
  },


  sendSocketData: function(input_msg){
    // var in_msg = input_msg || 'TESTTESTTESTTTTT!';
    var in_msg = input_msg;
    // console.log(in_msg);
    this.socket.emit('s_msg', JSON.stringify({ user: this._userName, msg: in_msg  }));    //要改成TEXTBOX裡的訊息,及USER
  },
  onSend: function(input_msg){
    // console.log('onSend:' + input_msg);
    this.sendSocketData(input_msg);
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
    var msgs = this._socketData.map(function(content, index) {
      console.log(content + ' ' + index);
      var user = JSON.parse(content).user;
      var msg = JSON.parse(content).msg;

      // return (
      //   <div key={index}>
      //     {user} ': ' {msg}
      //   </div>
      // );
      return (
          user + ': ' + msg + '\n'
      );

    });

    var cleanMsgs='';
    for(i=0;i<msgs.length;i++){
      cleanMsgs += msgs[i];
    };

    if(this.refs.ta){
      var taNode = this.refs.ta.getDOMNode();
      taNode.scrollTop = taNode.scrollHeight;
    }
    console.log(msgs);
    // var user = (this._socketData ? JSON.parse(this._socketData).user : "");
    // var msg = (this._socketData ? JSON.parse(this._socketData).msg : "");
    return (
      <div className="col-sm-100">
        <textarea ref='ta'
                  // style={divStyle}
                  rows="20"
                  value={cleanMsgs}
                  onChange={this.emptyFn}
                  className='form-control' >
        </textarea>
      </div>
    );
  }




});

// var divStyle = {
//   width: '500px',
//   height: '500px'
// };

module.exports = Sockets;
