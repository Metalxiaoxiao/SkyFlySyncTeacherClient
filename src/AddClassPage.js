import React, { useEffect, useState } from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  TextInput,
  Button,
  List,
  useTheme,
  Portal,
  Dialog,
  Text,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  onClearMessage,
  onReceivedMessage,
  onSendingMessage,
} from './redux/Slices/WsController';
import {displayLoginFaildAlert, onLoadClass, onLoadClasses} from './redux/Slices/UserStateController';

const AddClassPage = ({ route }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [classCode, setClassCode] = useState('');
  useEffect(()=>{
    route.params?
    setClassCode(String(route.params.userId)):null;
  },[])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      marginBottom: 16,
    },
    suggestionList: {
      maxHeight: 150,
      marginBottom: 16,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
    },
  });

  const handleInputChange = text => {
    setClassCode(text);
  };
  const classes = useSelector(state => state.UserStateController.ClassesListData);
  const handleAddClass = () => {
    let send = true;
    classes.forEach(element => {
      if (element == classCode){
        send = false;
      }
    });
    console.log('添加的班级代码:', classCode);
    if(send){
      dispatch(
      onSendingMessage({
        command: 'addClass',
        content: {
          class: classCode,
        },
      }),
    );
    }
    
  };
  const [isAlertVisible, displayAlert] = useState(false);
  const message = useSelector(state => state.WsController.receivedMessage);
  if (message !== null && isAlertVisible === false) {
    if(message.command === 'addClass' && message.status === 'success'){
      displayAlert(true)
      dispatch(onLoadClass(classCode))
    }
  }
  return (
    <View style={styles.container}>
      <Portal>
        <Dialog
          visible={isAlertVisible}
          onDismiss={() => {
            displayAlert(false);
            dispatch(onClearMessage());
          }}>
          <Dialog.Title>添加班级成功</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{classCode}班现在是您的任教班级</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                displayAlert(false);
                dispatch(onClearMessage());
              }}>
              确定
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TextInput
        label="输入班级代码"
        value={classCode}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddClass}
        style={styles.addButton}>
        添加班级
      </Button>
    </View>
  );
};

export default AddClassPage;
