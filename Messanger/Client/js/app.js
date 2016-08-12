var React = require('react');
var ReactDOM = require('react-dom');
var SocketActionCreators =  require('./actions/socket-action-creators');
var Socket = require('./views/sockets');
var MsgContext = require('./views/messanger_view');


// var LBLUsername = React.createClass({
//   render: function() {
//     return (
//      <div>
//         <MsgContext data_spec="INI_DATA_USERNAME_LBL"/>
//      </div>
//     );
//   }
// });
//
// React.render(<LBLUsername />, document.getElementById('ini_data_username_lbl'));
//
//
//
var Username = React.createClass({
  render: function() {
    return (
     <div>
        <MsgContext data_spec="INI_DATA_USERNAME"/>
     </div>
    );
  }
});

React.render(<Username />, document.getElementById('ini_data_username'));
//
//
//
// var LBLip = React.createClass({
//   render: function() {
//     return (
//      <div>
//         <MsgContext data_spec="INI_DATA_IP_LBL"/>
//      </div>
//     );
//   }
// });
//
// React.render(<LBLip />, document.getElementById('ini_data_ip_lbl'));
//
//
//
var Ip = React.createClass({
  render: function() {
    return (
     <div>
        <MsgContext data_spec="INI_DATA_IP"/>
     </div>
    );
  }
});

React.render(<Ip />, document.getElementById('ini_data_ip'));



var App = React.createClass({
  componentDidMount(){
    SocketActionCreators.createSocket();
  },

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
