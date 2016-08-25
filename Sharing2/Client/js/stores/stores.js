// var AppDispatcher = require('../dispatcher/app-dispatcher');
// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');
import cAppDispatcher from '../dispatcher/app-dispatcher';
let AppDispatcher = new cAppDispatcher();
// console.log(AppDispatcher);
import {EventEmitter} from 'events';
import assign from 'object-assign';

// let Stores = assign({}, EventEmitter.prototype, class {
class Stores extends EventEmitter {
  constructor(){
    super();
    this._IniDatas = {
      username:'',
      ip:''
    };
    this._data = '';
    this.emitChange = this.emitChange.bind(this);
    this.addChangeListener = this.addChangeListener.bind(this);
    this.removeChangeListener = this.removeChangeListener.bind(this);
    this.emitSend = this.emitSend.bind(this);
    this.addSendListener = this.addSendListener.bind(this);
    this.removeSendListener = this.removeSendListener.bind(this);
  }


  emitChange(action) {
    this._IniDatas.username = action.username;
    this._IniDatas.ip = action.ip;
    this.emit('change', this._IniDatas);
  }
  addChangeListener(callback) {
    this.on('change', callback, this._IniDatas);    //callback 裡是當store收到新的action任務時，用來通知react view更新state用。
  }
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  // _data: '',

  emitSend(data) {
    this._data = data;
    this.emit('send', this._data);    //callback 的參數放在 eventname 之後
  }
  addSendListener(callback){
    this.on('send', callback, this._data);  //callback 的參數放在 callback fn 之後
  }
  removeSendListener(callback) {
    this.removeListener('send', callback);
  }


// });
}

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

// module.exports = Stores;

export default Stores;
