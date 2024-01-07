import { useEffect } from 'react';
import StorageUtil from '../storage';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, useTheme, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import UserStateController, { UserStateSlice } from '../redux/Slices/UserStateController';

const FirstCom = (props) => {
  const theme = useTheme();
  const loginState = useSelector((state) => state.UserStateController.IsLogined);

  useEffect(() => {
    if (loginState === true) {
      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'IndexPage',
          },
        ],
      });
    }
    StorageUtil.getItem('LoginState').then((response) => {
      if (response !== 'logined') {
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoginPage',
            },
          ],
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
      <Text style={styles.loadingText}>自动登录中...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
});

export default FirstCom;
