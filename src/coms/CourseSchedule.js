import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { FAB, Portal, Provider, Modal, useTheme } from "react-native-paper";

const CourseSchedule = () => {
  const daysOfWeek = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日',
  ];

  const [courses, setCourses] = useState([
    { day: '星期一', period: 1, name: '数学', time: '9:00 AM - 9:50 AM' },
    { day: '星期一', period: 2, name: '历史', time: '10:00 AM - 10:50 AM' },
    // 添加更多初始化课程
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    day: '',
    period: 1,
    name: '',
    time: '',
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const addCourse = () => {
    setCourses([...courses, { ...newCourse }]);
    setNewCourse({ day: '', period: 1, name: '', time: '' });
    closeModal();
  };
  const theme = useTheme();
  return (
    <View theme = {theme} style={{ flex: 1 }}>
      <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
        {/* 显示课程表 */}
        {daysOfWeek.map((day) => (
          <View key={day}>
            <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>{day}</Text>
            {Array.from({ length: 9 }).map((_, index) => {
              const period = index + 1;
              const course = courses.find(
                (c) => c.day === day && c.period === period,
              );
              return (
                <View
                  key={period}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <Text>{`${period}. `}</Text>
                  <Text>{course ? `${course.name} (${course.time})` : '-'}</Text>
                </View>
              );
            })}
          </View>
        ))}

        {/* 添加按钮以打开课程编辑器 */}
        <Provider>
          <Portal>
            <FAB
              icon="plus"
              onPress={openModal}
              style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
              }}
            />
          </Portal>
        </Provider>
      </ScrollView>

      {/* 课程编辑器模态框 */}
      <Portal>
        <Modal visible={isModalVisible} onDismiss={closeModal}>
          <View style={{ padding: 16 }}>
            <TextInput
              label="星期"
              value={newCourse.day}
              onChangeText={(text) => setNewCourse({ ...newCourse, day: text })}
            />
            <TextInput
              label="课时"
              value={newCourse.period.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewCourse({
                  ...newCourse,
                  period: parseInt(text, 10),
                })
              }
            />
            <TextInput
              label="课程名称"
              value={newCourse.name}
              onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
            />
            <TextInput
              label="时间"
              value={newCourse.time}
              onChangeText={(text) => setNewCourse({ ...newCourse, time: text })}
            />
            <Button onPress={addCourse} title="添加课程" />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default CourseSchedule;
