import AppSocketDispatcher from '../dispatcher/app-dispatcher';

// module.exports = {
//
//   createSocket: function(iniData){
//     console.log('Active here');
//     // console.log(iniData);
//     var action = {
//       actionType: "CREATE_SOCKET",
//       username: iniData.usernameNode,
//       ip: iniData.ipNode
//     };
//
//     AppSocketDispatcher.dispatch(action);
//   },
//
//   sendFile: function(file){
//     console.log('SEND_FILE');
//     var action = {
//       actionType: "SEND_FILE",
//       data: file
//     };
//     AppSocketDispatcher.dispatch(action);
//   }
// };

export default class Actions{
  // constructor(){
  //   this.createSocket = this.createSocket.bind(this);
  //   this.sendFile = this.sendFile.bind(this);
  // }

  createSocket(iniData){
    console.log('Active here');
    let action = {
      actionType: "CREATE_SOCKET",
      username: iniData.usernameNode,
      ip: iniData.ipNode
    };
    AppSocketDispatcher.dispatch(action);
  }

  sendFile(file){
    console.log('SEND_FILE');
    let action = {
      actionType: "SEND_FILE",
      data: file
    };
    AppSocketDispatcher.dispatch(action);
  }
}
