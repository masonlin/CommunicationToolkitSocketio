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
  render: function() {
    // var ar = React.Children.map(SocketData, function(child){
    //   console.log('child::');
    //   console.log(child.props);
    // })

    return (
     <div>
        <SocketData />
     </div>
    );
  }
});

// React.render(<Images />, document.getElementById('images'));
React.render(<SocketData />, document.getElementById('images'));


var InitialView = React.createClass({
  render: function() {
    return (
      <div>
        <IniView />
      </div>
    )
  }
});

React.render(<InitialView />, document.getElementById('iniview'));
