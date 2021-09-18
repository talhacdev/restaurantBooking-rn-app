import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../config/colors';

function BookingSuccessScreen(props) {
  return (
    <View style={styles.container}>
      <Text>BookingSuccessScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingSuccessScreen;
