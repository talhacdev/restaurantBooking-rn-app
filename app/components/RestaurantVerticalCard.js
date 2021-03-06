import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function RestaurantVerticalCard({
  restaurantName,
  location,
  category,
  onPress,
  rating,
  imageUrl,
  totalRating,
  horizontal,
}) {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.cardColor,
        // backgroundColor: 'purple',
        width: horizontal ? wp(45) : wp(48),
        height: hp('30'),
        elevation: wp(1),
        padding: wp(1),
        borderColor: colors.primary,
        borderWidth: wp(0.05),
      }}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: horizontal ? wp(45) : wp(48),
            height: wp(35),
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
            <Text style={styles.ratingText}>
              {/* {rating != 0 && totalRating != 0
                ? parseFloat(rating / totalRating)
                : rating} */}
              {rating}
            </Text>
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
    backgroundColor: colors.cardColor,
    // backgroundColor: 'purple',
    width: wp('48'),
    height: hp('30'),
    elevation: wp(1),
    padding: wp(1),
    borderColor: colors.primary,
    borderWidth: wp(0.05),
  },
  detailContainer: {
    margin: wp(1),
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    width: '100%',
    //  backgroundColor: 'pink',
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

export default RestaurantVerticalCard;
