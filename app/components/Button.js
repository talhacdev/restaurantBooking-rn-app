import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function Button({
  title,
  noElevation,
  widthContainer,
  stylesButtonContainer,
  stylesTitleText,
  backgroundColorContainer,
  buttonTextContainer,
  onPress,
  disabled,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        stylesButtonContainer
          ? stylesButtonContainer
          : {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: backgroundColorContainer
                ? backgroundColorContainer
                : colors.buttonColor,
              width: widthContainer ? widthContainer : wp(85),
              height: hp(5),
              borderRadius: wp(1),
              paddingVertical: hp(1),
              elevation: noElevation ? hp(0) : hp(1),
            }
      }
      onPress={onPress ? onPress : () => console.log('Button pressed.')}>
      <Text
        numberOfLines={1}
        style={
          stylesTitleText
            ? stylesTitleText
            : {
                // fontWeight: 'bold',
                color: buttonTextContainer
                  ? buttonTextContainer
                  : colors.buttonTextColor,
                fontSize: wp(4),
                textTransform: 'uppercase',
              }
        }>
        {title ? title : 'title'}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
