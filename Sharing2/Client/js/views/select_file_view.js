import React from 'react';
import socketio from 'socket.io-client';
import SocketStore from '../stores/stores';
import clsMasonConf from '../masonconf';
let oMasonConf = new clsMasonConf();
import cSocketActionCreators from '../actions/socket-action-creators';
let SocketActionCreators = new cSocketActionCreators();

export default class File_context extends React.Component {
  constructor(props){
    super(props);
    this.state = {input_file: "",};
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.render = this.render.bind(this);
  }

  handleJoinClick(e) {
    let IniData = {
      usernameNode: this.refs.ini_data_username.value,
      ipNode: this.refs.ini_data_ip.value
    };
    SocketActionCreators.createSocket(IniData);
  }

  handleChange(e) {
    let fileNode = this.refs.select_file;
    // var file = e.target.files[0];
    let file = fileNode.files[0];
    SocketActionCreators.sendFile(file);
  }

  render(){

    switch(this.props.data_spec) {
      case "INI_DATA":
        return (
          <div>
            <div className="col-sm-3">
              <input ref='ini_data_username'
                     type='text'
                     name='username'
                     className='form-control'
                     placeholder="Type Your ID"
              />
            </div>
            <div className="col-sm-3">
              <input ref='ini_data_ip'
                     type='text'
                     name='ip'
                     className='form-control'
                     placeholder="Type Server IP"
              />
            </div>
            <div className="col-sm-3">
              <button ref='ini_data_join'
                      type="button"
                      className="btn btn-default"
                      data-toggle="collapse"
                      data-target="#demo"
                      onClick={this.handleJoinClick}
              >Join</button>
            </div>
            <div className="col-sm-3">
              {/*adjust bootstrap*/}
            </div>
          </div>
        );
        break;


      default:
        return (
          <div>
            <input ref="select_file"
                   id="file"
                   type="file"
                   onChange={this.handleChange} />
          </div>
        );
    }


  }
};
