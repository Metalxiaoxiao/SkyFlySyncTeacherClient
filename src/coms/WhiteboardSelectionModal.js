import React, {useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {List, Checkbox, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

const WhiteboardSelectionList = ({onWhiteboardSelect}) => {
  const whiteboardsData = useSelector(
    state => state.UserStateController.ClassesListData,
  );
  const [selectedWhiteboards, setSelectedWhiteboards] = useState([]);
  const theme = useTheme();
  const handleWhiteboardPress = whiteboard => {
    // Toggle selection
    if (selectedWhiteboards.includes(whiteboard)) {
      setSelectedWhiteboards(
        selectedWhiteboards.filter(wb => wb !== whiteboard),
      );
    } else {
      setSelectedWhiteboards([...selectedWhiteboards, whiteboard]);
    }
  };

  const renderItem = ({item}) => (
    <List.Item
      title={item.userName}
      description={item.online ? '在线' : '离线'}
      left={() => (
        <Checkbox.Android
          status={selectedWhiteboards.includes(item) ? 'checked' : 'unchecked'}
          onPress={() => handleWhiteboardPress(item)}
          color={theme.colors.primary}
        />
      )}
      right={() => (
        <View style={item.online ? styles.onlineDot : styles.offlineDot} />
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={whiteboardsData}
        keyExtractor={item => item.userId}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <Checkbox.Android
          status={selectedWhiteboards.length > 0 ? 'checked' : 'unchecked'}
          onPress={() =>
            setSelectedWhiteboards(
              selectedWhiteboards.length > 0 ? [] : whiteboardsData,
            )
          }
          color={theme.colors.primary}
        />
        <List.Item
          title="全选"
          onPress={() =>
            setSelectedWhiteboards(
              selectedWhiteboards.length > 0 ? [] : whiteboardsData,
            )
          }
        />
        <List.Item
          title="确定"
          onPress={() => onWhiteboardSelect(selectedWhiteboards)}
          disabled={selectedWhiteboards.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default WhiteboardSelectionList;
