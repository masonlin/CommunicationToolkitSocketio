var React = require('react');
var ReactDOM = require('react-dom');
var SocketActionCreators =  require('./actions/socket-action-creators');
var SocketData = require('./views/sockets');
var IniView = require('./views/select_file_view');


var IniData = React.createClass({
  render: function() {
    return (
     <div>
        <IniView data_spec="INI_DATA"/>
     </div>
    );
  }
});

React.render(<IniData />, document.getElementById('ini_data'));




var Images = React.createClass({
  // componentDidMount(){
  //   SocketActionCreators.createSocket();
  // },

  render: function() {
    return (
     <div>
        <SocketData />
     </div>
    );
  }
});

// ReactDOM.render(<App />, document.getElementById('app'));
React.render(<Images />, document.getElementById('images'));


var SelFile = React.createClass({
  render: function() {
    return (
      <div>
        <IniView />
      </div>
    )
  }
});

React.render(<SelFile />, document.getElementById('selfile'));
