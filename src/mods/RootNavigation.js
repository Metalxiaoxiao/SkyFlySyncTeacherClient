import * as React from 'react';

export const navigationRef = React.createRef();

const naviagte = {
  navigate: function (name, params) {
    navigationRef.current?.navigate(name, params);
  },
  reset: function (obj) {
    navigationRef.current?.reset(obj);
  },
};

export default naviagte;
