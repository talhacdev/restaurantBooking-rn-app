import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function CategoryCard({title, stylesTitleText, imageUrl, onPress}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <Image
        style={{
          width: wp(20),
          height: wp(20),
          padding: wp(1),
        }}
        source={{
          uri: imageUrl,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardColor,
    // backgroundColor: colors.categoryCardBackground,
    width: wp('50%'),
    height: hp('12.5%'),
    elevation: wp(1),
    padding: wp(4),
    borderColor: colors.primary,
    borderWidth: wp(0.05),
  },
});

export default CategoryCard;
