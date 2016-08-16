var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Stores = assign({}, EventEmitter.prototype, {

  // emitChange: function() {
  //   this.emit('change');
  // },
  // addChangeListener: function(callback) {
  //   this.on('change', callback);    //callback 裡是當store收到新的action任務時，用來通知react view更新state用。
  // },
  _IniDatas: {
    username:'',
    ip:''
  },
  emitChange: function(action) {
    this._IniDatas.username = action.username;
    this._IniDatas.ip = action.ip;
    this.emit('change', this._IniDatas);
  },
  addChangeListener: function(callback) {
    this.on('change', callback, this._IniDatas);    //callback 裡是當store收到新的action任務時，用來通知react view更新state用。
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  _data: '',

  emitSend: function(data) {
    this._data = data;
    this.emit('send', this._data);    //callback 的參數放在 eventname 之後
  },
  addSendListener: function(callback){
    this.on('send', callback, this._data);  //callback 的參數放在 callback fn 之後
  },
  removeSendListener: function(callback) {
    this.removeListener('send', callback);
  }


});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case "CREATE_SOCKET":
      // Stores.emitChange();
      Stores.emitChange(action);
      break;

    case "SEND_FILE":
      // console.log('SEND_MSG...');
      Stores.emitSend(action.data);
      break;

    default:
  }
});

module.exports = Stores;
