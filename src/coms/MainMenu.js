import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, Provider, IconButton} from 'react-native-paper';

const MainMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="plus" onPress={openMenu} />}>
      <Menu.Item
        trailingIcon="qrcode-scan"
        onPress={() => {
          navigation.navigate('QRScanPage');
          closeMenu();
        }}
        title="扫一扫"
      />
      <Menu.Item
        trailingIcon="account-plus"
        onPress={() => {
          navigation.navigate('AddClassPage');
          closeMenu();
        }}
        title="添加任教班级"
      />
      <Divider />
      <Menu.Item
        trailingIcon="cog"
        onPress={() => {
          navigation.navigate('SettingPage');
          closeMenu();
        }}
        title="设置"
      />
    </Menu>
  );
};

export default MainMenu;
