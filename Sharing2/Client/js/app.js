import React from 'react';
import ReactDOM from 'react-dom';
import SocketActionCreators from './actions/socket-action-creators';
import SocketData from './views/sockets';
import IniView from './views/select_file_view';


// var IniData = React.createClass({
//   render: function() {
//     return (
//      <div>
//         <IniView data_spec="INI_DATA"/>
//      </div>
//     );
//   }
// });
//
// React.render(<IniData />, document.getElementById('ini_data'));

// console.log(React);
// console.log(React.Component);
class IniData extends React.Component {

  render() {
    return (
     <div>
        <IniView data_spec="INI_DATA"/>
     </div>
    );
  }
}

// let oIniData = new IniData();

ReactDOM.render(<IniData />, document.getElementById('ini_data'));

// export default IniData;


// var Images = React.createClass({
//   render: function() {
//     // var ar = React.Children.map(SocketData, function(child){
//     //   console.log('child::');
//     //   console.log(child.props);
//     // })
//
//     return (
//      <div>
//         <SocketData />
//      </div>
//     );
//   }
// });
//
// // React.render(<Images />, document.getElementById('images'));
// React.render(<SocketData />, document.getElementById('images'));

class Images extends React.Component {
  render() {
    return (
     <div>
        <SocketData />
     </div>
    );
  }
}

ReactDOM.render(<SocketData />, document.getElementById('images'));


// var InitialView = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <IniView />
//       </div>
//     )
//   }
// });
//
// React.render(<InitialView />, document.getElementById('iniview'));

class InitialView extends React.Component{
  render() {
    return (
      <div>
        <IniView />
      </div>
    )
  }
}

ReactDOM.render(<InitialView />, document.getElementById('iniview'));
