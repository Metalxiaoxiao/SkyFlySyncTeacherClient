import React, {useState} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {TextInput, Button, Chip, Portal, Dialog, Text} from 'react-native-paper';

const RigisterArea = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userId = await response.text(); // Assuming the response is the user ID
      Alert.alert('注册成功', `您的用户ID是: ${userId}`);
      setLoading(false);
      // Handle success, e.g., navigate to the next screen
    } catch (error) {
      Alert.alert('注册失败', '请检查您的网络连接或输入信息');
      setLoading(false);
      // Handle error
    }
  };

  return (
    <>
      {isLoading && (
        <Chip avatar={<ActivityIndicator size="small" color="#999999" />}>
          正在注册...
        </Chip>
      )}
      <Portal>
        <Dialog visible={isAlertVisible} onDismiss={handleDismiss}>
          <Dialog.Title>注册结果</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              { /* Message based on the registration response */ }
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
          onChangeText={setUserName}
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
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Button mode="contained" onPress={register}>
          注册
        </Button>
      </View>
    </>
  );
};
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
export default RigisterArea;
