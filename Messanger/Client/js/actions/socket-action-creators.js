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

  sendMsg: function(type_msg){
    console.log('SEND_MSG');
    var action = {
      actionType: "SEND_MSG",
      msg: type_msg
    };

    AppSocketDispatcher.dispatch(action);
  }
};
