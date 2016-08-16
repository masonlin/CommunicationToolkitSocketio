var React = require('react');
var socketio = require('socket.io-client');
var SocketStore = require('../stores/stores');
var clsMasonConf = require('../masonconf');
var oMasonConf = new clsMasonConf();
var SocketActionCreators =  require('../actions/socket-action-creators');


var File_context = React.createClass({
  // handleClick: function(e){
  //   var msgNode = this.refs.input_text.getDOMNode();
  //   SocketActionCreators.sendMsg(msgNode.value);
  //   msgNode.value='';  //clean input box
  //   msgNode.focus();
  // },
  //
  handleJoinClick: function(e){
    var IniData = {
      usernameNode: this.refs.ini_data_username.getDOMNode().value,
      ipNode: this.refs.ini_data_ip.getDOMNode().value
    };
    SocketActionCreators.createSocket(IniData);
  },

  handleChange: function(e) {
    var fileNode = this.refs.select_file.getDOMNode();
    // var file = e.target.files[0];
    var file = fileNode.files[0];
    SocketActionCreators.sendFile(file);
  },


  getInitialState: function(){
    return {input_file: ''};
  },


  render: function(){



    switch(this.props.data_spec) {
      case "INI_DATA":
        return (
          <div>
            <div className="col-sm-3">
              <input ref='ini_data_username'
                     type='text'
                     name='username'
                     className='form-control'
                     placeholder="Type Your ID"
              />
            </div>
            <div className="col-sm-3">
              <input ref='ini_data_ip'
                     type='text'
                     name='ip'
                     className='form-control'
                     placeholder="Type Server IP"
              />
            </div>
            <div className="col-sm-3">
              <button ref='ini_data_join'
                      type="button"
                      className="btn btn-default"
                      data-toggle="collapse"
                      data-target="#demo"
                      onClick={this.handleJoinClick}
              >Join</button>
            </div>
            <div className="col-sm-3">
              {/*adjust bootstrap*/}
            </div>
          </div>
        );
        break;

      // case "INPUT_MSG":
      //   return (
      //     <div>
      //       <div className="col-sm-100">
      //         <input ref='input_text'
      //                type='text'
      //                name='msg_context'
      //               //  style={divStyle}
      //                onKeyDown={(e) => {
      //                  if (e.keyCode == 13) {
      //                      console.log(e.keyCode);
      //                      this.handleClick();
      //                      console.log(e.keyCode);
      //                  }
      //                }}
      //                className='form-control'
      //         />
      //       </div>
      //       <br/>
      //       <div className="col-sm-100">
      //         <input type='button' value='SEND' onClick={this.handleClick} className="btn btn-default"/>
      //       </div>
      //     </div>
      //   );

      default:
        return (
          <div>
            <input ref="select_file"
                   id="file"
                   type="file"
                   onChange={this.handleChange} />
          </div>
        );
    }



  }
});

// var divStyle = {
//   width: '500px'
// };

module.exports = File_context;
