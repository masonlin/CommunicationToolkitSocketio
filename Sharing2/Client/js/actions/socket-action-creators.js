// import AppSocketDispatcher from '../dispatcher/app-dispatcher';
import * as AppSocketDispatcher from '../dispatcher/app-dispatcher';

export default class Actions{
  createSocket(iniData){
    console.log('Active here');
    let action = {
      actionType: "CREATE_SOCKET",
      username: iniData.usernameNode,
      ip: iniData.ipNode
    };
    console.log(AppSocketDispatcher);
    AppSocketDispatcher.default.dispatch(action);
  }

  sendFile(file){
    console.log('SEND_FILE');
    let action = {
      actionType: "SEND_FILE",
      data: file
    };
    AppSocketDispatcher.default.dispatch(action);
  }
}
