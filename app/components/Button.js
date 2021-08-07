import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function Button({title, stylesButtonContainer, stylesTitleText, onPress}) {
  return (
    <TouchableOpacity
      style={
        stylesButtonContainer
          ? stylesButtonContainer
          : {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              width: wp('85%'),
              height: hp('5%'),
              elevation: wp(1),
              borderRadius: wp(1),
              margin: wp(1),
            }
      }
      onPress={onPress ? onPress : () => console.log('Button pressed.')}>
      <Text
        numberOfLines={1}
        style={
          stylesTitleText
            ? stylesTitleText
            : {
                fontWeight: 'bold',
                color: colors.tertiary,
                fontSize: wp(5),
                textTransform: 'uppercase',
              }
        }>
        {title ? title : 'title'}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
