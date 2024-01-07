import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {
  FAB,
  Portal,
  Provider,
  ToggleButton,
  useTheme,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import {useGlobalSnackbar} from './mods/useGlobalSnackbar';
import DocumentPicker from 'react-native-document-picker';

const MessageEditorScreen = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const navigation = useNavigation(); // Initialize the navigation hook

  const handleAttachmentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result);

      setAttachment(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('Error picking document:', err);
      }
    }
  };
  const showSnackbar = useGlobalSnackbar();
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

      // Navigate back to the previous screen

      showSnackbar({
        message: '信息发送成功！',
        actionLabel: '确定',
        onActionPress: () => {
          // Handle action press if needed
        },
      });
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
        {/* Remove Appbar.Header */}

        <View style={styles.editorContainer}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="在此输入消息..."
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>

        {/* Add Toolbar */}
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
});

export default MessageEditorScreen;
