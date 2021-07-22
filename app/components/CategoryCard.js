import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function CategoryCard({title, stylesTitleText, onPress}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <Text
        numberOfLines={1}
        style={
          stylesTitleText
            ? stylesTitleText
            : {
                fontWeight: 'bold',
                color: colors.tertiary,
                fontSize: wp(4),
                textTransform: 'uppercase',
              }
        }>
        {title ? title : 'title'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: wp('50%'),
    height: hp('12.5%'),
    elevation: wp(1),
    padding: wp(4),
  },
});

export default CategoryCard;
