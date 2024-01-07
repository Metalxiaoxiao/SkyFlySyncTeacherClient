import * as React from 'react';
import {AppRegistry, useColorScheme, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme as ptheme} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/loginPage';
import RegisterPage from './src/RegisterPage';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EluaPage from './src/EluaPage';
import HomeScreen from './src/HomeScreen';
import FirstCom from './src/coms/FirstCom';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import connect from './src/mods/wsCore';
import {navigationRef} from './src/mods/RootNavigation';
import {GlobalSnackbarProvider} from './src/mods/useGlobalSnackbar';
import UserDataDisplayTitleBar from './src/coms/UserDataDisplayTitleBar';
import MainMenu from './src/coms/MainMenu';
import MessageEditerScreen from './src/MessageEditerScreen.js';
import SettingsScreen from './src/SettingsScreen';
import QRScaner from './src/QRScaner';
import AddClassPage from './src/AddClassPage';
import SelectClassPage from './src/SelectClassPage';

// import SearchFriend from './src/SearchFriendPage';
// import QRScaner from './src/QRScaner';
// import ChatPage from './src/ChatPage';

store.dispatch((dispatch, getstate, api) => {
  connect(dispatch, getstate, api); //链接ws
});

const Stack = createNativeStackNavigator();

export default function Main() {
  const scheme = useColorScheme(); //夜间模式
  const theme = {
    ...ptheme,
    colors: {
      ...ptheme.colors,
      primary: '#2196F3',
      primaryContainer: '#BBDEFB',
      secondary: '#64B5F6',
      secondaryContainer: '#E3F2FD',
      tertiary: '#90CAF9',
      tertiaryContainer: '#BBDEFB',
      surface: '#FFFFFF',
      surfaceVariant: '#F5F5F5',
      surfaceDisabled: '#BDBDBD',
      background: '#E3F2FD',
      error: '#FF5252',
      errorContainer: '#f5a0aa',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#1981d2',
      onSecondary: '#000000',
      onSecondaryContainer: '#000000',
      onTertiary: '#000000',
      onTertiaryContainer: '#000000',
      onSurface: '#000000',
      onSurfaceVariant: '#000000',
      onSurfaceDisabled: '#000000',
      outlineVariant: '#1d2326',
      inverseSurface: '#000000',
      inverseOnSurface: '#FFFFFF',
      inversePrimary: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.2)',
      scrim: 'rgba(0, 0, 0, 0.5)',
      backdrop: 'rgba(0, 0, 0, 0.7)',
      elevation: {
        ...ptheme.colors.elevation,
        level2: '#dce7f6',
      },
    },
  };

  return (
    <Provider store={store}>
      {scheme === 'dark' ? (
        <StatusBar
          barStyle="light-content"
          backgroundColor={DarkTheme.colors.card}
        />
      ) : (
        <StatusBar
          barStyle="dark-content"
          backgroundColor={DefaultTheme.colors.card}
        />
      )}
      <PaperProvider theme={theme}>
        <NavigationContainer
          ref={navigationRef}
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="FirstCon"
              component={FirstCom}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="IndexPage"
              component={HomeScreen}
              options={{
                title: null,
                headerLeft: () => {
                  return <UserDataDisplayTitleBar />;
                }, //定义导航栏的按钮
                headerRight: () => {
                  return <MainMenu />;
                },
              }}
            />
            <Stack.Screen
              name="ELUA"
              component={EluaPage}
              options={{title: '许可协议'}}
            />
            <Stack.Screen
              name="LoginPage"
              component={App}
              options={{title: 'Log In'}}
            />
            <Stack.Screen
              name="RegisterPage"
              component={RegisterPage}
              options={{title: 'Sign Up'}}
            />
            <Stack.Screen
              name="SettingPage"
              component={SettingsScreen}
              options={{title: '设置'}}
            />
            <Stack.Screen
              name="MessageEditerPage"
              component={MessageEditerScreen}
              options={{
                title: '编辑信息',
              }}
            />
            <Stack.Screen
              name="QRScanPage"
              component={QRScaner}
              options={{
                title: '扫描二维码',
              }}
            />
            <Stack.Screen
              name="AddClassPage"
              component={AddClassPage}
              options={{title: '添加班级'}}
            />
            <Stack.Screen
              name="SelectClassPage"
              component={SelectClassPage}
              options={{title: '选择班级'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
