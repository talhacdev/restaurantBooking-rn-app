import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function OrdersVerticalComponent({
  restaurantName,
  location,
  category,
  onPress,
  rating,
  imageUrl,
  totalRating,
  dineIn,
  takeaway,
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: wp(50),
            height: wp(30),
            padding: wp(1),
          }}
          source={{
            uri: imageUrl,
          }}
        />
        {/* <Image
          style={{
            width: wp(30),
            height: wp(30),
            padding: wp(1),
          }}
          source={require('../assets/restaurant.jpg')}
        /> */}
      </View>

      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.detailMainText}>
          {restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'ID: ' + restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Type: ' + restaurantName}
        </Text>
        {dineIn ? (
          <Text numberOfLines={1} style={styles.detailSubText}>
            {'Table Number: ' + restaurantName}
          </Text>
        ) : null}
        {takeaway ? (
          <Text numberOfLines={1} style={styles.detailSubText}>
            {'Estimated Ready Time: ' + restaurantName}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Date: ' + restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Restaurant: ' + restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Status: ' + restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Grand Total: ' + restaurantName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardColor,
    // backgroundColor: 'purple',
    width: wp('48'),
    height: hp('38'),
    elevation: wp(1),
    padding: wp(1),
    borderColor: colors.primary,
    borderWidth: wp(0.05),
  },
  detailContainer: {
    marginVertical: wp(1),
    width: '100%',
  },
  detailMainText: {
    color: colors.tertiary,
    fontSize: wp(3.4),
    fontWeight: 'bold',
  },
  detailSubText: {
    color: colors.tertiary,
    fontSize: wp(3),
    // fontWeight: 'bold',
  },
  discountedPriceText: {
    color: colors.discountedPriceText,
    fontSize: wp(3.8),
    fontWeight: 'bold',
  },
  priceText: {
    color: colors.priceText,
    fontSize: wp(3.8),
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  ratingText: {
    color: colors.ratingText,
    fontSize: wp(3.8),
    paddingHorizontal: wp(1),
  },
});

export default OrdersVerticalComponent;
