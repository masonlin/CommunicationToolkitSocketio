var React = require('react');
var ReactDOM = require('react-dom');
var SocketActionCreators =  require('./actions/socket-action-creators');
var Socket = require('./views/sockets');
var MsgContext = require('./views/messanger_view');


var App = React.createClass({
  componentDidMount(){
    SocketActionCreators.createSocket();
  },

  render: function() {
    return (
     <span>
        <Socket />
     </span>
    );
  }
});

// ReactDOM.render(<App />, document.getElementById('app'));
React.render(<App />, document.getElementById('app'));




var TypeMsg = React.createClass({
  // componentDidMount(){
  //
  // },

  render: function() {
    return (
     <span>
        <MsgContext />
     </span>
    );
  }
});

React.render(<TypeMsg />, document.getElementById('type_msg'));
