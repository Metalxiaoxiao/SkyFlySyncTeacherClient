import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {
  TextInput,
  Button,
  Chip,
  Portal,
  Dialog,
  Text,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  displayLoginFaildAlert,
  displayLoginRequestingCircle,
} from '../redux/Slices/UserStateController';
import {onSendingMessage} from '../redux/Slices/WsController';
import StorageUtil from '../storage';
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const LoginArea = () => {
  const dispatch = useDispatch();
  const connectionState = useSelector(state => state.WsController.WsConnected);
  const isLoading = useSelector(
    state => state.UserStateController.IsLoginRequesting,
  );
  const isLoginFailed = useSelector(
    state => state.UserStateController.IsDisplayLoginFailedAlert,
  );
  const IsLogined = useSelector(state => state.UserStateController.IsLogined);

  const [account, onChangeAccont] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  return (
    <>
      {connectionState ? null : (
        <Chip avatar={<ActivityIndicator size="small" color="#999999" />}>
          与服务器的连接断开，正在重连
        </Chip>
      )}
      <Portal>
        <Dialog
          visible={isLoginFailed}
          onDismiss={() => {
            dispatch(displayLoginFaildAlert(false));
          }}>
          <Dialog.Title>登录失败</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">账号或密码是不是输错啦~</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(displayLoginFaildAlert(false));
              }}>
              确定
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.sectionContainer}>
        <TextInput
          mode="outlined"
          label="账号"
          onChangeText={text => onChangeAccont(text)}
          value={account}
        />
      </View>
      <View style={styles.sectionContainer}>
        <TextInput
          autoComplete="password"
          textContentType="password"
          secureTextEntry={true}
          mode="outlined"
          label="密码"
          onChangeText={text => onChangePassword(text)}
          value={password}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Button
          loading={isLoading}
          mode="contained"
          onPress={() => {
            dispatch(displayLoginRequestingCircle(true));
            var data = {
              command: 'login',
              content: {
                userId: Number(account),
                userPassword: password,
                deviceType: 0,
              },
            };
            StorageUtil.setItem('userLoginData', data);
            dispatch(onSendingMessage(data));
          }}>
          登录
        </Button>
      </View>
    </>
  );
};

export default LoginArea;
