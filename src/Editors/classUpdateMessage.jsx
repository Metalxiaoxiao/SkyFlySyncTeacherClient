import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native';
import {
  FAB,
  Portal,
  Provider,
  ActivityIndicator,
  Appbar,
  useTheme, // 导入 Appbar 组件
} from 'react-native-paper';
import StorageUtil from '../storage';
import {useDispatch} from 'react-redux';
import {onSendingMessage} from '../redux/Slices/WsController';

const DailyScheduleEditor = ({route}) => {
  useEffect(() => {
    StorageUtil.getItem('schedule' + new Date().getDay()).then(response => {
      setDailySchedule(
        response || [
          {turn: 1, subject: '', time: '07:40'},
          {turn: 2, subject: '', time: '08:30'},
          {turn: 3, subject: '', time: '09:20'},
          {turn: 4, subject: '', time: '10:30'},
          {turn: 5, subject: '', time: '11:20'},
          {turn: 6, subject: '', time: '14:40'},
          {turn: 7, subject: '', time: '15:30'},
          {turn: 8, subject: '', time: '16:20'},
          {turn: 9, subject: '', time: '17:10'},
        ],
      );
    });
  }, []);
  const [selectedDay, setSelectedDay] = useState('Monday'); // 添加选中的一周的哪一天
  const [dailySchedule, setDailySchedule] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    const day = new Date().getDay();
    // 开始保存
    setIsSaving(true);
    dispatch(
      onSendingMessage({
        command: 'sendMessage',
        content: {
          recipient: route.params,
          type: 'classUpdateMessage',
          data: {
            classList: dailySchedule,
            day: String(day),
          },
        },
      }),
    );
    StorageUtil.setItem('schedule' + day, dailySchedule);

    setTimeout(() => {
      setIsSaving(false);
      console.log('Saved schedule:', dailySchedule);

      // 返回到上一个屏幕或执行其他操作
    }, 2000); // 模拟延迟2秒（根据需要调整）
  };

  const renderItem = ({item}) => (
    <View style={styles.scheduleItem}>
      <Text>{`第${item.turn}节: `}</Text>
      <TextInput
        style={styles.input}
        placeholder={`输入第${item.turn}节的科目`}
        value={item.subject}
        onChangeText={text => handleSubjectChange(item.turn, text)}
      />
    </View>
  );

  const handleSubjectChange = (turn, text) => {
    setDailySchedule(prevSchedule =>
      prevSchedule.map(item =>
        item.turn === turn ? {...item, subject: text} : item,
      ),
    );
  };
  const theme = useTheme();
  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <FlatList
          data={dailySchedule}
          renderItem={renderItem}
          keyExtractor={item => item.turn.toString()}
        />

        {isSaving && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <Portal>
          <FAB
            style={styles.saveButton}
            icon="content-save"
            onPress={handleSave}
            disabled={!dailySchedule.some(item => item.subject)}
          />
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  saveButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DailyScheduleEditor;
