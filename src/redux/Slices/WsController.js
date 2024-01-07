import {createSlice} from '@reduxjs/toolkit';

export const WsControllerSlice = createSlice({
  name: 'WsController',
  initialState: {
    receivedMessage: null,
    unsentMessages: null,
    WsConnected: true,
    ws: undefined,
  },
  reducers: {
    onReceivedMessage: (state, action) => {
      state.receivedMessage = action.payload;
    },
    onSendingMessage: (state, action) => {
      state.unsentMessages = action.payload;
    },
    onClearMessage: (state, acton) => {
      state.receivedMessage = null;
    },
    onWsClosed: state => {
      state.WsConnected = false;
    },
    onWsOpened: (state, action) => {
      state.WsConnected = true;
      state.ws = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  onReceivedMessage,
  onSendingMessage,
  onWsClosed,
  onWsOpened,
  onClearMessage,
} = WsControllerSlice.actions;

export default WsControllerSlice.reducer;
