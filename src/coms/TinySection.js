import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TinySection = ({children, title}): Node => {
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 0,
      paddingHorizontal: 7,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '400',
    },
    sectionDescription: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: '400',
    },
  });
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default TinySection;
