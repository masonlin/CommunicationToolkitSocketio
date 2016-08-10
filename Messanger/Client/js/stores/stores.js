var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Stores = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);    //callback 裡是當store收到新的action任務時，用來通知react view更新state用。
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },


  emitSend: function() {
    this.emit('send');
  },
  addSendListener: function(callback){
    this.on('send', callback);
  },
  removeSendListener: function(callback) {
    this.removeListener('send', callback);
  }



  // getAll: function() {
  //   return comments;
  // }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case "CREATE_SOCKET":
      console.log('CREATE_SOCKET');
      Stores.emitChange();
      break;

    // case "CREATE_SOCKET_PG":
    //   Stores.emitChange();
    //   break;

    default:
  }
});

module.exports = Stores;
