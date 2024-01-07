import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
const EluaPage = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text variant="titleLarge">SkyFlySync 用户许可协议</Text>
      <Text variant="bodyLarge">
        SkyFlySync 是逐风890计算机科创小组开发的课堂管理软件。
      </Text>
      <Text variant="bodyLarge">
        使用者必须遵守以下原则：
        <Text variant="bodyLarge">① 2024年要天天开心。</Text>
        <Text variant="bodyLarge">② 2024年要天天快乐。</Text>
        <Text variant="bodyLarge">③ 2024年要好事连连。</Text>
      </Text>
    </View>
  );
};

export default EluaPage;
