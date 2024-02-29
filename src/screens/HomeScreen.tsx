import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SearchInput} from '../components';

const HomeScreen = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#9969C7', '#804FB3']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.screenContainer}>
      <SearchInput navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
  },
});

export default HomeScreen;
