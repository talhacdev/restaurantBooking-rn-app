import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import VerticalProductCardButton from '../components/VerticalProductCardButton';
import colors from '../config/colors';

function ProductCard({productName, companyName, price, onPress}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View>
        <Image
          style={{
            width: wp(36),
            height: wp(36),
            margin: wp(1),
          }}
          source={require('../assets/snapchatLogoBlack.jpg')}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.detailMainText}>
          {productName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {companyName}
        </Text>
        <View style={styles.priceContainer}>
          <Text numberOfLines={1} style={styles.priceText}>
            ${price}
          </Text>
        </View>
      </View>
      <View>
        <VerticalProductCardButton title={'add to cart'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: wp('50%'),
    height: hp('35%'),
    elevation: wp(1),
    padding: wp(4),
  },
  detailContainer: {
    margin: wp(1),
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    width: '100%',
  },
  priceContainer: {
    margin: wp(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  detailMainText: {
    color: colors.tertiary,
    fontSize: wp(3.3),
  },
  detailSubText: {
    color: colors.tertiary,
    fontSize: wp(3),
  },
  priceText: {
    color: colors.tertiary,
    fontSize: wp(3.8),
  },
});

export default ProductCard;
