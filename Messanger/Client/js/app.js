var React = require('react');
var ReactDOM = require('react-dom');
var SocketActionCreators =  require('./actions/socket-action-creators');
var Socket = require('./views/sockets');


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
