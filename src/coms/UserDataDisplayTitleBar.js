import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider, Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AvaterDisplayer from './AvatarDisplayer';
import TinySection from './TinySection';

const UserDataDisplayTitleBar = props => {
  const theme = useTheme();
  const imgurl = useSelector(state => state.UserStateController.imgurl);
  const username = useSelector(state => state.UserStateController.username);
  const tag = useSelector(state => state.UserStateController.tag);
  return (
    <Provider theme={theme}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <AvaterDisplayer
          theme={theme}
          url={imgurl}
          username={username}
          size={38}
        />
        <TinySection theme={theme} title={username} children={tag} />
      </View>
    </Provider>
  );
};

export default UserDataDisplayTitleBar;
