import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';

import colors from '../config/colors';

function OrdersVerticalComponent({
  id,
  status,
  orderType,
  tableNumber,
  estimatedReadyTime,
  orderDate,
  restaurantName,
  grandTotal,
  onPress,
  imageUrl,
  dineIn,
  takeaway,
  past,
  onPressShareReview,
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View style={styles.imageContainer}>
        {/* <Image
          style={{
            width: wp(50),
            height: wp(30),
            padding: wp(1),
          }}
          source={{
            uri: imageUrl,
          }}
        /> */}
        <Image
          style={{
            width: wp('48'),
            height: wp(30),
          }}
          source={require('../assets/snapchatLogoBlackpng.png')}
        />
      </View>

      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.detailMainText}>
          {status}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'ID: ' + id.slice(-5)}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Type: ' + orderType}
        </Text>
        {orderType == 'dinein' ? (
          <Text numberOfLines={1} style={styles.detailSubText}>
            {'Table Number: ' + tableNumber}
          </Text>
        ) : null}
        {status == 'accepted' || status == 'ready' || status == 'completed' ? (
          <Text numberOfLines={1} style={styles.detailSubText}>
            {'Estimated Ready Time: ' + estimatedReadyTime}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Date: ' + orderDate}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Restaurant: ' + restaurantName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Status: ' + status}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {'Grand Total: ' + grandTotal}
        </Text>
        {past ? (
          <View style={styles.buttonContainer}>
            <Button
              widthContainer={wp(40)}
              title="share review"
              onPress={onPressShareReview}
            />
          </View>
        ) : null}
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
    elevation: wp(1),
    paddingHorizontal: wp(1),
    paddingBottom: wp(1),
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
  buttonContainer: {
    marginVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersVerticalComponent;
