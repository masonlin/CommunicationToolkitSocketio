var AppSocketDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {

  createSocket: function(){
    console.log('Active here');
    var action = {
      actionType: "CREATE_SOCKET"
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
