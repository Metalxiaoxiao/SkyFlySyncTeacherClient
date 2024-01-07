import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import WhiteboardSelectionList from './coms/WhiteboardSelectionModal'
import { useNavigation } from "@react-navigation/native";

const SelectClassPage = () => {
  const navigation = useNavigation();
  const handleWhiteboardSelect = selectedWhiteboards => {
    navigation.navigate('MessageEditerPage', selectedWhiteboards);
    console.log('选择白板：', selectedWhiteboards);
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
