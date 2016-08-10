var AppSocketDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {

  createSocket: function(){
    console.log('Active here');
    var action = {
      actionType: "CREATE_SOCKET"
    };

    AppSocketDispatcher.dispatch(action);
  }
};
