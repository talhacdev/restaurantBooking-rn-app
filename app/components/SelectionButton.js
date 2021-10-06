import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../config/colors';

function SelectionButton({title, onPress, selected}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginHorizontal: wp(1),
        width: wp(33),
        height: hp(5),
        backgroundColor: selected ? colors.primary : colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: selected ? hp(1) : hp(0),
      }}>
      <Text
        style={{
          color: colors.tertiary,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default SelectionButton;
