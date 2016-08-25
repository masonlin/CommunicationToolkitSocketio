import React from 'react';
import ReactDOM from 'react-dom';
import SocketActionCreators from './actions/socket-action-creators';
import SocketData from './views/sockets';
import IniView from './views/select_file_view';


// class IniData extends React.Component {
//
//   render() {
//     return (
//      <div>
//         <IniView data_spec="INI_DATA"/>
//      </div>
//     );
//   }
// }

ReactDOM.render(<IniView data_spec="INI_DATA" />, document.getElementById('ini_data'));


// class Images extends React.Component {
//   render() {
//     return (
//      <div>
//         <SocketData />
//      </div>
//     );
//   }
// }

ReactDOM.render(<SocketData />, document.getElementById('images'));


// class InitialView extends React.Component{
//   render() {
//     return (
//       <div>
//         <IniView />
//       </div>
//     )
//   }
// }

ReactDOM.render(<IniView />, document.getElementById('iniview'));
