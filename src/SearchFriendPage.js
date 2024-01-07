import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Searchbar, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AvaterDisplayer from './coms/AvatarDisplayer';
import {onSendingMessage} from './redux/Slices/WsController';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
const SearchFriend = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [item, changeItem] = React.useState(null);
  const listdata = useSelector(
    state => state.UserStateController.lookupedlistdata,
  );
  const friendlist = useSelector(state => state.UserStateController.friendlist);
  const [disPlayingFriend, setDisPlayingFriend] = React.useState('');
  const [isFriendAdded, setFriendAddState] = React.useState(false);
  const dispatch = useDispatch();
  const onChangeSearch = query => {
    setSearchQuery(query);
    dispatch(
      onSendingMessage({
        type: 'lookup',
        body: query,
      }),
    );
  };
  React.useEffect(() => {
    listdata.forEach(element => {
      if (element.id == searchQuery) {
        friendlist.forEach(element => {
          setFriendAddState(element == searchQuery);
        });
        changeItem(element);
        setDisPlayingFriend(element.id);
      }
    });
  }, [searchQuery, listdata]);
  return (
    <View style={styles.sectionContainer}>
      <Searchbar
        placeholder="输入好友ID以查找"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {item ? (
        <>
          <List.Item
            title={item.username}
            description={item.tags}
            left={props => (
              <AvaterDisplayer url={item.imgs} username={item.username} />
            )}
          />
          <Button
            disabled={isFriendAdded}
            mode="outlined"
            onPress={() => {
              dispatch(
                onSendingMessage({
                  type: 'addfriend',
                  body: disPlayingFriend,
                }),
              );
            }}>
            {isFriendAdded ? '该好友已添加' : '添加好友'}
          </Button>
        </>
      ) : null}
    </View>
  );
};

export default SearchFriend;
