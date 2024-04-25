import {createSlice} from '@reduxjs/toolkit';

export const UserStateSlice = createSlice({
  name: 'UserStateController',
  initialState: {
    username: null,
    password: null,
    userid: null,
    imgurl: null,
    tag: '未知学科',
    teachingClasses: [],
    ClassesListData: [],
    lookupedlistdata: [{}], //JS双列表结构
    IsLogined: false,
    IsLoginRequesting: false,
    IsDisplayLoginFailedAlert: false,
  },
  reducers: {
    onLogin: (state, action) => {
      state.IsLogined = true;
      state.userid = action.payload.userId;
      state.username = action.payload.userName;
      // state.imgurl = action.payload.img;
      state.tag = action.payload.userTag;
    },
    onLogout: state => {
      state.userid = null;
      state.IsLogined = false;
      state.password = null;
      state.username = null;
    },
    onLoadClasses: (state, action) => {
      state.teachingClasses = action.payload;
    },
    onLoadClass:(state,action)=>{
      state.teachingClasses = [...state.teachingClasses,action];
    },
    onLookUpClass: (state, action) => {
      state.lookupedlistdata.push(action.payload);
      state.teachingClasses.forEach(element => {
        if (Number(element) === action.payload.userId) {
          state.ClassesListData.push(action.payload);
        }
      });
    },
    displayLoginFaildAlert: (state, action) => {
      state.IsDisplayLoginFailedAlert = action.payload;
    },
    displayLoginRequestingCircle: (state, action) => {
      state.IsLoginRequesting = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  onLogin,
  onLogout,
  displayLoginFaildAlert,
  displayLoginRequestingCircle,
  onLoadClasses,
  onLookUpClass,
  onLoadClass,
} = UserStateSlice.actions;

export default UserStateSlice.reducer;
