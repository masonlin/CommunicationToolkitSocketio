import React from 'react';
import socketio from 'socket.io-client';
import base64 from 'base-64';
import utf8 from 'utf8';
import SocketStore from '../stores/stores';
import clsMasonConf from '../masonconf';
let oMasonConf = new clsMasonConf();
import path from 'path';

import ImageGallery from 'react-image-gallery';

export default class Sockets extends React.Component {
  constructor(props){
    super(props);
    this._socketData = [];
    this.socket = null;
    this._userName = '';
    // this.State = {getSocketState: ''};
    this.state = {
      getSocketState: '',
      isPlaying: false,
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showNav: true,
      slideInterval: 2000,
      fullscreen: false,
    };

    this.iniSocketCon = this.iniSocketCon.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendSocketData = this.sendSocketData.bind(this);
    this.onSend = this.onSend.bind(this);
    this.emptyFn = this.emptyFn.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.render = this.render.bind(this);
  }


  handleImageLoad(event) {
    // console.log('Image loaded ', event.target)
  }

  handlePlay() {
    this._imageGallery.play()
  }

  handlePause() {
    this._imageGallery.pause()
  }



  iniSocketCon(iniDatas) {

    if(oMasonConf.isDev == true){
      console.log('===iniSocketCon===');
      // console.log(iniDatas.ip);

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
      //   <div className="col-md-4">
      //     <h2>From {user} :</h2>
      //     <img src={file} key={idx} className='img-thumbnail' width='500' height='500'></img>
      //   </div>
      // );

      //  console.log({original: {file}, thumbnail: {file}});
      return (
        {
          original: `${file}`,
          thumbnail: `${file}`,
          // originalClass: 'featured-slide',
          // thumbnailClass: 'featured-thumb',
        }
      );

    });



    // return (
    //   <div className="row">
    //       {images}
    //   </div>
    // );

    // console.log('=====================');
    // console.log(images);
    // console.log(...images);
    return (
      <div>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={images}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}

          // onSlide={this._onSlide}
          // onPause={this._onPause.bind(this)}
          // onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          slideInterval={parseInt(this.state.slideInterval)}
          autoPlay={this.state.isPlaying}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
          />
      </div>
    );


  }

};
