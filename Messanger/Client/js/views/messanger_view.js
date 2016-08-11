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
    // console.log(msg);
    // this.setState({input_msg: msg})
    // return "OK";
    SocketActionCreators.sendMsg(msgNode.value);
    msgNode.value='';  //clean input box
    msgNode.focus();
  },

  getInitialState: function(){
    return {input_msg: ''};
  },


  render: function(){
    return (
      <span>
        <input ref='input_text'
               type='text'
               name='msg_context'
               style={divStyle}
               onKeyDown={(e) => {
                 if (e.keyCode == 13) {
                     console.log(e.keyCode);
                     this.handleClick();
                     console.log(e.keyCode);
                 }
               }}
        />
        <input type='button' value='SEND' onClick={this.handleClick}  />
      </span>
    );
  }
});

var divStyle = {
  width: '500px'
};

module.exports = Msg_context;
