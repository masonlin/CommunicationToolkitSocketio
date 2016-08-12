var React = require('react');
// var ReactDOM = require('react-dom');
var socketio = require('socket.io-client');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();
var SocketActionCreators =  require('../actions/socket-action-creators');


var Msg_context = React.createClass({
  handleClick: function(e){
    var msgNode = this.refs.input_text.getDOMNode();
    // console.log("msgNode1::");
    // console.log(msgNode);
    // console.log(msg);
    // this.setState({input_msg: msg})
    // return "OK";
    SocketActionCreators.sendMsg(msgNode.value);
    msgNode.value='';  //clean input box
    // console.log("msgNode2::");
    // console.log(msgNode);
    msgNode.focus();
  },

  getInitialState: function(){
    return {input_msg: ''};
  },


  render: function(){

    switch(this.props.data_spec) {

      case "INI_DATA_USERNAME":
        return (
          <div>
            <div className="col-sm-3">
              <input ref='ini_data_username'
                     type='text'
                     name='username'
                     className='form-control'
              />
            </div>
          </div>
        );
        break;

      case "INI_DATA_IP":
        return (
          <div>
            <div className="col-sm-3">
              <input ref='ini_data_ip'
                     type='text'
                     name='ip'
                     className='form-control'
              />
            </div>
          </div>
        );
        break;

      case "INPUT_MSG":
        return (
          <div>
            <div className="col-sm-100">
              <input ref='input_text'
                     type='text'
                     name='msg_context'
                    //  style={divStyle}
                     onKeyDown={(e) => {
                       if (e.keyCode == 13) {
                           console.log(e.keyCode);
                           this.handleClick();
                           console.log(e.keyCode);
                       }
                     }}
                     className='form-control'
              />
            </div>
            <br/>
            <div className="col-sm-100">
              <input type='button' value='SEND' onClick={this.handleClick} className="btn btn-default"/>
            </div>
          </div>
        );

      default:
    }


  }
});

// var divStyle = {
//   width: '500px'
// };

module.exports = Msg_context;
