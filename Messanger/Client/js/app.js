var React = require('react');
var ReactDOM = require('react-dom');
var SocketActionCreators =  require('./actions/socket-action-creators');
var Socket = require('./views/sockets');
var MsgContext = require('./views/messanger_view');


var IniData = React.createClass({
  render: function() {
    return (
     <div>
        <MsgContext data_spec="INI_DATA"/>
     </div>
    );
  }
});

React.render(<IniData />, document.getElementById('ini_data'));


var App = React.createClass({
  // componentDidMount(){
  //   SocketActionCreators.createSocket();
  // },

  render: function() {
    return (
     <div>
        <Socket />
     </div>
    );
  }
});

// ReactDOM.render(<App />, document.getElementById('app'));
React.render(<App />, document.getElementById('app'));



var TypeMsg = React.createClass({

  render: function() {
    return (
     <div>
        <MsgContext data_spec="INPUT_MSG"/>
     </div>
    );
  }
});

React.render(<TypeMsg />, document.getElementById('type_msg'));
