// SettingsScreen.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Colors, Button, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {onLogout} from './redux/Slices/UserStateController';

const SettingsScreen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(onLogout());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginPage',
        },
      ],
    });
  };

  return (
    <View
      style={[styles.container]}>
      <List.Section>
        <List.Subheader style={{color: theme.colors.text}}>
          通用 Settings
        </List.Subheader>
        <List.Item
          title="账户"
          description=" - 开发中，暂不可用 -"
          left={() => <List.Icon icon="account" />}
        />
        <List.Item
          title="通知"
          description=" - 开发中，暂不可用 -"
          left={() => <List.Icon icon="bell" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader style={{color: theme.colors.text}}>
          操作 Actions
        </List.Subheader>
        <List.Item
          title="退出登录"
          description="退出当前账号并返回到登录页面"
          left={() => <List.Icon color={theme.colors.error} icon="logout" />}
          onPress={handleLogout}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
