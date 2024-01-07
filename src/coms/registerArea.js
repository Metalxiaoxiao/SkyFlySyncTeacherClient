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
import {onClearMessage, onSendingMessage} from '../redux/Slices/WsController';
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

const RigisterArea = () => {
  const dispatch = useDispatch();
  const connectionState = useSelector(state => state.WsController.WsConnected);
  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isAlertVisible, displayAlert] = useState(false);

  const navigation = useNavigation();
  const [isLoading, setLoadingState] = useState(false);
  const message = useSelector(state => state.WsController.receivedMessage);
  if (message !== null && isAlertVisible === false) {
    message?.command === 'register' ? displayAlert(true) : null;
    setLoadingState(false);
  }
  const handleDismiss = () => {
    displayAlert(false);
    dispatch(onClearMessage());
    navigation.goBack();
  }
  return (
    <>
      {connectionState ? null : (
        <Chip avatar={<ActivityIndicator size="small" color="#999999" />}>
          与服务器的连接断开，正在重连
        </Chip>
      )}
      <Portal>
        <Dialog visible={isAlertVisible} onDismiss={handleDismiss}>
          <Dialog.Title>
            {message !== null
              ? message.status === 'success'
                ? '注册成功'
                : '注册失败'
              : null}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {message !== null ? message.message : null}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDismiss}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.sectionContainer}>
        <TextInput
          mode="outlined"
          label="用户名"
          onChangeText={text => onChangeUserName(text)}
          value={userName}
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
            dispatch(
              onSendingMessage({
                command: 'register',
                content: {
                  userName: userName,
                  userPassword: password,
                  deviceType: 0,
                },
              }),
            );
            setLoadingState(true);
          }}>
          注册
        </Button>
      </View>
    </>
  );
};

export default RigisterArea;
