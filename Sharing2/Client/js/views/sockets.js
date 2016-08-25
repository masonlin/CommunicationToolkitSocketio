var React = require('react');
var socketio = require('socket.io-client');
var base64 = require('base-64');
var utf8 = require('utf8');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();
var path = require('path');

var Sockets = React.createClass({
  _socketData: [],
  socket: null,
  _userName: '',

  iniSocketCon: function(iniDatas) {
    if(oMasonConf.isDev == true){
      this.socket && this.socket.disconnect();                              //disconnect socket if it has connection
      this.socket = socketio.connect('http://' + iniDatas.ip + ':8080/');   //change to parameters (IP:PORT)
      this._userName = iniDatas.username;

      this.socket.on('c_file', function(data){
        console.log('======in c_file======');
        // console.log(data);
        // console.log(this._socketData);
        this._socketData.push(data);
        // console.log(this._socketData);
         this.setState(JSON.parse(data));
      }.bind(this));

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
    // console.log(inputFile);

    var FR= new FileReader();

    var fileData;
    var reader = new FileReader();
    FR.onloadend = function() {
      fileData = FR.result;
      console.log('================load and emit file=======================');
      this.socket.emit('s_file', JSON.stringify({size: inputFile.size,
                                                 filename: inputFile.name,
                                                 username: this._userName,
                                                 file: fileData}));
    }.bind(this);
    // console.log(FR.readAsDataURL(inputFile));
    FR.readAsDataURL(inputFile)
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
    // console.log(this._socketData);
    var images = this._socketData.map(function(content, index) {
      var file = JSON.parse(content).file;
      var user = JSON.parse(content).username;
      var idx = user + '-' + (new Date()).toString() + '-' + index;

      // return (
      //   <div>
      //     <img src={file} key={idx} className="img-thumbnail" alt="Cinque Terre" width="304" height="236"/> {user}
      //   </div>
      // );

      return (
        <div className="col-md-4">
          <h2>From {user} :</h2>
          <img src={file} key={idx} className='img-thumbnail' width='500' height='500'></img>
        </div>
      );

    });



    return (
      <div className="row">
          {images}
      </div>
    );


    // return (
    //   <div className="carousel-inner">
    //     {images}
    //   </div>
    // );

    // console.log(images);
    // return (
    //   <div id="myCarousel" className="carousel slide" data-ride="carousel">
    //
    //     <ol className="carousel-indicators">
    //       <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    //       <li data-target="#myCarousel" data-slide-to="1"></li>
    //       <li data-target="#myCarousel" data-slide-to="2"></li>
    //       <li data-target="#myCarousel" data-slide-to="3"></li>
    //     </ol>
    //
    //
    //     <div className="carousel-inner">
    //       {images}
    //     </div>
    //
    //     <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
    //       <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    //     </a>
    //     <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
    //       <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    //     </a>
    //   </div>
    // );

  }




});

// var divStyle = {
//   width: '500px',
//   height: '500px'
// };

module.exports = Sockets;
