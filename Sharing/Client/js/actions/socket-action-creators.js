var AppSocketDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {

  createSocket: function(iniData){
    console.log('Active here');
    // console.log(iniData);
    var action = {
      actionType: "CREATE_SOCKET",
      username: iniData.usernameNode,
      ip: iniData.ipNode
    };

    AppSocketDispatcher.dispatch(action);
  },

  sendFile: function(file){
    console.log('SEND_FILE');
    var action = {
      actionType: "SEND_FILE",
      data: file
    };
    AppSocketDispatcher.dispatch(action);
  }
};
