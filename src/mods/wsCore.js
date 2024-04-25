import {
  onReceivedMessage,
  onWsClosed,
  onWsOpened,
} from '../redux/Slices/WsController';
import StorageUtil from '../storage';
import {onSendingMessage} from '../redux/Slices/WsController';

export default function connect(dispatch, getState, api) {
  let interval  =  setInterval(() => {
    
    dispatch(
      onSendingMessage({
        command: 'heart',
        content: {
          timeStamp: Date.now(),
        },
      }),
    );
  }, 3000);
  api.onopen = function () {
    
    dispatch(onWsOpened());
    StorageUtil.getItem('LoginState').then(response => {
      if (response === 'logined') {
        StorageUtil.getItem('userLoginData').then(response => {
          dispatch(onSendingMessage(response));
        });
      }
    });
  };
  api.onclose = function () {
    dispatch(onWsClosed());
  };
  api.onmessage = function (evt) {
    console.log(evt.data);
    var data = JSON.parse(evt.data);
    dispatch(onReceivedMessage(data));
  };
}
