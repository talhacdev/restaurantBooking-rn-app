import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import VerticalProductCardButton from '../components/VerticalProductCardButton';
import colors from '../config/colors';

function RestaurantCard({restaurantName, location, category, onPress, rating}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View>
        <Image
          style={{
            width: wp(30),
            height: wp(30),
            padding: wp(1),
          }}
          source={require('../assets/restaurant.jpg')}
        />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.ratingContainer}>
          <View>
            <Image
              style={{
                width: wp(5),
                height: wp(5),
                padding: wp(1),
              }}
              source={require('../assets/star.png')}
            />
          </View>
          <View>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.detailMainText}>
          {restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {location}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    // backgroundColor: 'pink',
    width: wp('50'),
    height: hp('32'),
    elevation: wp(1),
    padding: wp(4),
    borderColor: colors.primary,
    borderWidth: wp(0.05),
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
  discountedPriceText: {
    color: colors.discountedPriceText,
    fontSize: wp(3.8),
  },
  priceText: {
    color: colors.priceText,
    fontSize: wp(3.8),
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.ratingText,
    fontSize: wp(3.8),
    paddingHorizontal: wp(1),
  },
  priceContainer: {
    flexDirection: 'row',
    // backgroundColor: 'orange',
    margin: wp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RestaurantCard;