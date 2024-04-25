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
      
      let responseChache = null;
      try{
        responseChache = response[0].show;
      }catch{
        
      }
      if(! responseChache){
        setDailySchedule(
          [
            { turn: 1, time: '07:40', subject: '语文', show: true },
            { turn: 2, time: '08:30', subject: '英语', show: true },
            { turn: 3, time: '09:20', subject: '数学', show: true },
            { turn: 4, time: '10:00', subject: '大课间', show: false },
            { turn: 5, time: '10:30', subject: '自习', show: true },
            { turn: 6, time: '11:20', subject: '数学', show: true },
            { turn: 7, time: '13:15', subject: '午休', show: false },
            { turn: 8, time: '14:30', subject: '政治', show: true },
            { turn: 9, time: '15:20', subject: '物理', show: true },
            { turn: 10, time: '16:10', subject: '自习', show: true },
            { turn: 11, time: '16:50', subject: '大课间', show: false },
            { turn: 12, time: '17:20', subject: '化学', show: true },
            { turn: 13, time: '19:30', subject: '自习', show: true },
            { turn: 14, time: '20:10', subject: '自习', show: true },
            { turn: 15, time: '21:10', subject: '自习', show: true },
          ],
        );
      }else{
        setDailySchedule(
        response || [
          { turn: 1, time: '07:40', subject: '语文', show: true },
          { turn: 2, time: '08:30', subject: '英语', show: true },
          { turn: 3, time: '09:20', subject: '数学', show: true },
          { turn: 4, time: '10:00', subject: '大课间', show: false },
          { turn: 5, time: '10:30', subject: '自习', show: true },
          { turn: 6, time: '11:20', subject: '数学', show: true },
          { turn: 7, time: '13:15', subject: '午休', show: false },
          { turn: 8, time: '14:30', subject: '政治', show: true },
          { turn: 9, time: '15:20', subject: '物理', show: true },
          { turn: 10, time: '16:10', subject: '自习', show: true },
          { turn: 11, time: '16:50', subject: '大课间', show: false },
          { turn: 12, time: '17:20', subject: '化学', show: true },
          { turn: 13, time: '19:30', subject: '自习', show: true },
          { turn: 14, time: '20:10', subject: '自习', show: true },
          { turn: 15, time: '21:10', subject: '自习', show: true },
        ],
      );
      }
      
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
        item.turn === turn ? {...item, subject: text ,show:true,} : item,
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
