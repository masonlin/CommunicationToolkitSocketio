import React from 'react';
import socketio from 'socket.io-client';
import base64 from 'base-64';
import utf8 from 'utf8';
import SocketStore from '../stores/stores';
import clsMasonConf from '../masonconf';
let oMasonConf = new clsMasonConf();
import path from 'path';

export default class Sockets extends React.Component {
  constructor(props){
    super(props);
    this._socketData = [],
    this.socket = null,
    this._userName = '',
    this.State = {getSocketState: ''};
    this.iniSocketCon = this.iniSocketCon.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendSocketData = this.sendSocketData.bind(this);
    this.onSend = this.onSend.bind(this);
    this.emptyFn = this.emptyFn.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.render = this.render.bind(this);
  }


  iniSocketCon(iniDatas) {

    if(oMasonConf.isDev == true){
      console.log('===iniSocketCon===');
      console.log(iniDatas.ip);

      this.socket && this.socket.disconnect();                              //disconnect socket if it has connection
      this.socket = socketio.connect('http://' + iniDatas.ip + ':8080/');   //change to parameters (IP:PORT)
      this._userName = iniDatas.username;

      this.socket.on('c_file', function(data){
        console.log('======in c_file======');
        this._socketData.push(data);
        this.setState(JSON.parse(data));
      }.bind(this));

    }else{
      // console.log('rlease version');
      // this.socket = socketio.connect('http://mason-restful.herokuapp.com');
    }


  }
  onChange(iniDatas) {
    this.iniSocketCon(iniDatas);
  }


  sendSocketData(inputFile) {
    console.log('======in sendSocketData======');
    // console.log(inputFile);

    let FR= new FileReader();

    let fileData;
    let reader = new FileReader();
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
  }
  onSend(inputData) {
    this.sendSocketData(inputData);
  }


  emptyFn(){}


  componentDidMount(){
    SocketStore.prototype.addChangeListener(this.onChange);
    SocketStore.prototype.addSendListener(this.onSend);
  }

  componentWillUnmount(){
    SocketStore.removeChangeListener(this.onChange);
    SocketStore.removeSendListener(this.onSend);
  }

  render() {
    let images = this._socketData.map(function(content, index) {
      let file = JSON.parse(content).file;
      let user = JSON.parse(content).username;
      let idx = user + '-' + (new Date()).toString() + '-' + index;

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

};
