import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../config/colors';

function SelectionButton({title}) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(1),
    width: wp(33),
    height: hp(5),
    backgroundColor: colors.selectionButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectionButton;
