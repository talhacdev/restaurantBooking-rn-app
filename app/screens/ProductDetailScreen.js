import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppButton from '../components/Button';
import AppHeader from '../components/Header';
import colors from '../config/colors';

function ProductDetailScreen(props) {
  const listing = props.route.params;
  console.log('listing=>', listing);
  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title="detail" />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <Image
            style={{
              width: wp(100),
              height: wp(100),
            }}
            source={require('../assets/snapchatLogoBlack.jpg')}
          />
        </View>
        <View style={styles.lowerViewContainer}>
          <Text style={styles.productNameText}>{listing.itemName}</Text>
          <Text style={styles.companyNameText}>{listing.restaurantName}</Text>
          <View style={{marginVertical: wp(2)}}>
            <Text style={styles.unitText}>{listing.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View>
              <Image
                style={{
                  width: wp(7),
                  height: wp(7),
                  padding: wp(1),
                }}
                source={require('../assets/star.png')}
              />
            </View>
            <View>
              <Text style={styles.ratingText}>{listing.rating}</Text>
            </View>
          </View>
          <Text style={styles.priceText}>{listing.price}</Text>
          <Text style={styles.priceText}>{listing.discountedPrice}</Text>
          <View style={{marginVertical: wp(2), height: wp(19)}}>
            <Text numberOfLines={3} style={styles.descriptionText}>
              {listing.description}
            </Text>
          </View>
        </View>
        <View style={styles.buttonViewContainer}>
          <AppButton title={'add to cart'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: hp(0),
  },
  contentViewContainer: {
    flex: 0.8,
    top: hp(8.5),
  },
  upperViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    justifyContent: 'center',
    margin: wp(1),
    padding: wp(1),
  },
  productNameText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(7),
  },
  companyNameText: {
    color: colors.tertiary,
    fontSize: wp(5.5),
  },
  unitText: {
    color: colors.tertiary,
    fontSize: wp(6),
  },
  priceText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(6.5),
  },
  descriptionText: {
    color: colors.tertiary,
    fontSize: wp(5),
  },
  buttonViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.ratingText,
    paddingHorizontal: wp(1),
    fontWeight: 'bold',
    fontSize: wp(6.5),
  },
});

export default ProductDetailScreen;
