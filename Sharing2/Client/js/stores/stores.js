import AppDispatcher from '../dispatcher/app-dispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

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

}

AppDispatcher.register(function(action) {
  let oStores = new Stores();

  switch(action.actionType) {

    case "CREATE_SOCKET":
      console.log("=CREATE_SOCKET=");
      oStores.emitChange(action);
      break;

    case "SEND_FILE":
      console.log("=SEND_FILE=");
      oStores.emitSend(action.data);
      break;

    default:
  }
});


export default Stores;
