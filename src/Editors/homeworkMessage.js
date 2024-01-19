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
  Checkbox,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useGlobalSnackbar} from '../mods/useGlobalSnackbar';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {onSendingMessage} from '../redux/Slices/WsController';
import {template} from '@babel/core';

const HomeworkMessageEditor = ({route}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [ifDialogChecked, setIfDialogChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [attachment, setAttachment] = useState({});
  const [title, setTitle] = useState('');

  const userName = useSelector(state => state.UserStateController.username);

  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigation = useNavigation();
  const showSnackbar = useGlobalSnackbar();

  const handleAttachmentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setAttachment(result);

      console.log(result);

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
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var responseData = xhr.responseText;
            console.log('Response:', responseData);
            let temp = [] || attachments;
            temp.push({
              filename: fileObj[0].name,
              url: 'http://106.53.58.190:8900/download/' + responseData,
            });
            setAttachments(temp);
          } else if (xhr.readyState === 4) {
            console.error('Error:', xhr.status);
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
      if (attachments) {
        console.log('Attached file:', attachments);
      }

      // Reset message and attachment after sending
      setMessage('');
      setAttachments([]);
      route.params.users.forEach(user => {
        dispatch(
          onSendingMessage({
            command: 'sendMessage',
            content: {
              recipient: user.userId,
              type: 'homeworkMessage',
              data: {
                id: Date.now(),
                subject: title,
                sender: userName,
                content: message,
                time: Date.now(),
                attachments: attachments,
              },
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
            placeholder="作业科目"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            multiline
            placeholder="作业内容..."
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>

        <View style={styles.toolbar}>
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

        {/*{attachment && (*/}
        {/*  <View style={styles.attachmentCard}>*/}
        {/*    <Text>{attachment.name}</Text>*/}
        {/*    <ProgressBar*/}
        {/*      progress={uploadProgress / 100}*/}
        {/*      color={theme.colors.primary}*/}
        {/*    />*/}
        {/*  </View>*/}
        {/*)}*/}

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
    margin: 15,
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

export default HomeworkMessageEditor;
