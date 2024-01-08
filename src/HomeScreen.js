import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  List,
  Avatar,
  TouchableRipple,
  Surface,
  FAB,
  Portal,
  Menu,
  Divider,
  Checkbox,
} from 'react-native-paper';
import naviagte from './mods/RootNavigation';
import {useIsFocused} from '@react-navigation/native';
import {GlobalSnackbarProvider} from './mods/useGlobalSnackbar';
import {useSelector} from 'react-redux';
import { navigate } from "@react-navigation/routers/src/CommonActions";

const HomeScreen = () => {
  const whiteboardsData = useSelector(
    state => state.UserStateController.ClassesListData,
  );
  console.log(JSON.stringify(whiteboardsData));

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setState({open: false});
    }
  }, [isFocused]);

  const [selectedWhiteboards, setSelectedWhiteboards] = useState([]);

  const WhiteboardItem = ({
    item,
    handleWhiteboardPress,
    showCheckbox,
    toggleCheckbox,
  }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [touchEvt, settouchEvt] = useState({
      x: 0,
      y: 0,
    });

    return (
      <>
        <Surface
          style={item.online ? styles.onlineSurface : styles.offlineSurface}>
          <TouchableRipple
            onPress={() => handleWhiteboardPress(item)}
            onLongPress={evt => {
              settouchEvt({
                x: evt.nativeEvent.locationX,
                y: evt.nativeEvent.locationY + 40,
              });
              setMenuVisible(true);
            }}
            rippleColor="rgba(0, 0, 0, 0.1)">
            <List.Item
              title={item.userName}
              description={item.online ? '在线' : '离线'}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={item.online ? 'desktop-mac' : 'desktop-mac'}
                  style={item.online ? styles.onlineIcon : styles.offlineIcon}
                />
              )}
              right={() => (
                <View
                  style={item.online ? styles.onlineDot : styles.offlineDot}>
                  {showCheckbox && (
                    <Checkbox
                      status={
                        selectedWhiteboards.includes(item.userId)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => toggleCheckbox(item.userId)}
                    />
                  )}
                </View>
              )}
            />
          </TouchableRipple>
        </Surface>
        <Menu
          visible={menuVisible}
          onDismiss={() => {
            setMenuVisible(false);
          }}
          anchor={touchEvt}>
          <Menu.Item onPress={() => {}} title="属性" />
          <Divider />
          <Menu.Item onPress={() => {}} title="设置日程" />
        </Menu>
      </>
    );
  };

  const handleWhiteboardPress = whiteboard => {
    // Handle checkbox selection here
    if (selectedWhiteboards.length > 0) {
      toggleCheckbox(whiteboard.userId);
    } else {
      // Handle regular press, for example, navigate to whiteboard details page
      console.log(`用户点击了 ${whiteboard.userId}`);
    }
  };

  const toggleCheckbox = userId => {
    // Update selected whiteboards state
    setSelectedWhiteboards(prevState => {
      if (prevState.includes(userId)) {
        return prevState.filter(id => id !== userId);
      } else {
        return [...prevState, userId];
      }
    });
  };

  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  const [isCheckboxShowed, showCheckbox] = useState(false);
  return (
    <GlobalSnackbarProvider>
      <View style={styles.container}>
        <FlatList
          data={whiteboardsData}
          keyExtractor={item => item.userId}
          renderItem={({item}) => {
            return (
              <WhiteboardItem
                item={item}
                handleWhiteboardPress={handleWhiteboardPress}
                showCheckbox={
                  selectedWhiteboards.length > 0 && isCheckboxShowed
                }
                toggleCheckbox={toggleCheckbox}
              />
            );
          }}
        />
        <Portal>
          <FAB.Group
            open={open}
            visible={isFocused}
            icon={open ? 'chevron-down-circle-outline' : 'compass-outline'}
            actions={[
              {
                icon: 'file',
                label: '传输文件',
                onPress: () => {
                  showCheckbox(true);
                  naviagte.navigate('SelectClassPage', {
                    messageType: 'fileMessage',
                  });
                },
              },
              {
                icon: 'message',
                label: '发送消息',
                onPress: () => {
                  showCheckbox(true);
                  naviagte.navigate('SelectClassPage', {
                    messageType: 'ordinaryMessage',
                  });
                },
              },
              {
                icon: 'remote',
                label: '远程控制',
                onPress: () => {
                  showCheckbox(true);
                  naviagte.navigate('SelectClassPage', {
                    messageType: 'controlMessage',
                  });
                },
              },
              {
                icon: 'alarm',
                label: '定时任务',
                onPress: () => {
                  showCheckbox(true);
                  naviagte.navigate('SelectClassPage', {
                    messageType: 'timerMessage',
                  });
                },
              },
              {
                icon: 'book',
                label: '布置作业',
                onPress: () => {
                  showCheckbox(true);
                  naviagte.navigate('SelectClassPage', {
                    messageType: 'homeworkMessage',
                  });
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </View>
    </GlobalSnackbarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onlineSurface: {
    elevation: 2, // 阴影效果
    margin: 8,
    backgroundColor: 'white', // 在线状态的背景颜色
  },
  offlineSurface: {
    elevation: 2,
    margin: 8,
    backgroundColor: 'lightgray', // 离线状态的背景颜色
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 10,
  },
  offlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c22c2c',
    marginRight: 10,
  },
  onlineIcon: {
    backgroundColor: 'transparent',
    color: 'green',
  },
  offlineIcon: {
    backgroundColor: 'transparent',
    color: 'red',
  },
});

export default HomeScreen;
