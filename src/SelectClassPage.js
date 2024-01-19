import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import WhiteboardSelectionList from './coms/WhiteboardSelectionModal';
import {useNavigation} from '@react-navigation/native';

const SelectClassPage = ({route}) => {
  const navigation = useNavigation();
  const handleWhiteboardSelect = selectedWhiteboards => {
    console.log(route.params);
    if (route.params.messageType === 'homeworkMessage') {
      navigation.navigate('homeworkMessage', {
        users: selectedWhiteboards,
        messageType: route.params,
      });
    } else if (route.params.messageType === 'remoteExecuteMessage') {
      navigation.navigate('remoteExecuteMessage', {
        users: selectedWhiteboards,
        messageType: route.params,
      });
    } else {
      navigation.navigate('ordinaryMessage', {
        users: selectedWhiteboards,
        messageType: route.params,
      });
    }
  };

  return (
    <View style={styles.container}>
      <WhiteboardSelectionList onWhiteboardSelect={handleWhiteboardSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SelectClassPage;
