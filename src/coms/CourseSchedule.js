import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import {FAB, Portal, Provider, Modal} from 'react-native-paper';

const CourseSchedule = () => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [courses, setCourses] = useState([
    {day: 'Monday', period: 1, name: 'Math', time: '9:00 AM - 9:50 AM'},
    {day: 'Monday', period: 2, name: 'History', time: '10:00 AM - 10:50 AM'},
    // Add more initial courses as needed
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
    setCourses([...courses, {...newCourse}]);
    setNewCourse({day: '', period: 1, name: '', time: ''});
    closeModal();
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Display the course schedule */}
        {daysOfWeek.map(day => (
          <View key={day}>
            <Text style={{fontWeight: 'bold', marginVertical: 8}}>{day}</Text>
            {Array.from({length: 9}).map((_, index) => {
              const period = index + 1;
              const course = courses.find(
                c => c.day === day && c.period === period,
              );
              return (
                <View
                  key={period}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <Text>{`${period}. `}</Text>
                  <Text>
                    {course ? `${course.name} (${course.time})` : '-'}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}

        {/* Add a button to open the course editor */}
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

      {/* Course Editor Modal */}
      <Portal>
        <Modal visible={isModalVisible} onDismiss={closeModal}>
          <View style={{padding: 16}}>
            <TextInput
              label="Day"
              value={newCourse.day}
              onChangeText={text => setNewCourse({...newCourse, day: text})}
            />
            <TextInput
              label="Period"
              value={newCourse.period.toString()}
              keyboardType="numeric"
              onChangeText={text =>
                setNewCourse({...newCourse, period: parseInt(text, 10)})
              }
            />
            <TextInput
              label="Course Name"
              value={newCourse.name}
              onChangeText={text => setNewCourse({...newCourse, name: text})}
            />
            <TextInput
              label="Time"
              value={newCourse.time}
              onChangeText={text => setNewCourse({...newCourse, time: text})}
            />
            <Button onPress={addCourse} title="Add Course" />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default CourseSchedule;
