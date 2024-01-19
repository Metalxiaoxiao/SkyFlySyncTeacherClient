import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  FAB,
  Portal,
  Provider,
  ToggleButton,
  useTheme,
  ProgressBar,
  Text,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useGlobalSnackbar} from '../../mods/useGlobalSnackbar';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {onSendingMessage} from '../../redux/Slices/WsController';

const fileMessage = ({route}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [title, setTitle] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigation = useNavigation();
  const showSnackbar = useGlobalSnackbar();

  const handleAttachmentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result);

      setAttachment(result);
      uploadFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const uploadFile = async fileObj => {
    try {
      if (fileObj) {
        var FileController = 'http://106.53.58.190:8900/upload'; // 接收上传文件的后台地址
        // FormData 对象
        var form = new FormData();
        // var file = {
        //   name: fileObj[0].name,
        //   size: fileObj[0].size,
        //   type: fileObj[0].type,
        //   uri: fileObj[0].uri,
        // };
        console.log(fileObj);
        form.append('file', fileObj[0]); // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open('POST', FileController, true);
        xhr.upload.onprogress = function (ev) {
          var process = ((100 * ev.loaded) / ev.total).toFixed(2);
          console.log('进度：' + process + '%');
          setUploadProgress(Number(process));
          if (process == 100) {
            Alert.alert('上传成功', '文件已成功上传');
          }
        };
        xhr.send(form);
      } else {
        Alert.alert('请先选择文件');
      }

      console.log('File uploaded successfully');

      // Handle the response as needed
    } catch (error) {
      console.error('Error uploading file:', error);

      // Handle the error as needed
    }
  };

  const handleSend = () => {
    // Start sending
    setIsSending(true);

    // Simulate sending delay (you can replace this with actual sending logic)
    setTimeout(() => {
      // Stop sending
      setIsSending(false);

      // Perform the sending logic here
      console.log('Sending message:', message);
      if (attachment) {
        console.log('Attached file:', attachment);
      }

      // Reset message and attachment after sending
      setMessage('');
      setAttachment(null);
      route.params.users.forEach(user => {
        dispatch(
          onSendingMessage({
            command: 'sendMessage',
            recipient: user.userId,
            content: {
              type: route.params.messageType,
              data: {},
            },
          }),
        );
      });

      // Navigate back to the previous screen
      Alert.prompt('信息发送成功！');
      navigation.goBack();
    }, 2000); // Simulated delay of 2 seconds (adjust as needed)
  };

  useEffect(() => {
    // Clean up loading state when the component is unmounted
    return () => setIsSending(false);
  }, []);

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <View style={styles.editorContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="标题..."
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            multiline
            placeholder="在此输入消息..."
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>

        <View style={styles.toolbar}>
          <Checkbox.Item
            label="弹窗提醒"
            status={showReminder ? 'checked' : 'unchecked'}
            onPress={() => setShowReminder(!showReminder)}
            color={theme.colors.primary}
          />
          <ToggleButton.Row
            onValueChange={value => {
              if (value === 'attach') {
                handleAttachmentPick();
              }
            }}
            value={''}
            style={styles.toolbarRow}>
            <ToggleButton icon="format-bold" value="bold" />
            <ToggleButton icon="format-italic" value="italic" />
            <ToggleButton icon="attachment" value="attach" />
          </ToggleButton.Row>
        </View>

        {attachment && (
          <View style={styles.attachmentCard}>
            <Text>{attachment.name}</Text>
            <ProgressBar
              progress={uploadProgress / 100}
              color={theme.colors.primary}
            />
          </View>
        )}

        {isSending && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}

        <Portal>
          <FAB
            style={styles.sendButton}
            icon="send"
            onPress={handleSend}
            disabled={!message && !attachment}
          />
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  editorContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  sendButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 18,
  },
  toolbarRow: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  attachmentCard: {
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleInput: {
    fontSize: 24, // Adjust the font size as needed
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default fileMessage;