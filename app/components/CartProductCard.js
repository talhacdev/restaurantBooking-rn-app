import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import VerticalProductCardButton from '../components/VerticalProductCardButton';
import colors from '../config/colors';

function CartProductCard({
  productName,
  restaurantName,
  price,
  discountedPrice,
  quantity,
  onPress,
  onDel,
  onAdd,
  onSub,
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress ? onPress : () => console.log('Card pressed.')}>
      <View>
        <Image
          style={{
            width: wp(25),
            height: wp(25),
            margin: wp(1),
          }}
          source={require('../assets/burger.png')}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.detailMainText}>
          {productName}
        </Text>
        <Text numberOfLines={1} style={styles.detailSubText}>
          {restaurantName}
        </Text>
        <View style={styles.priceContainer}>
          <Text numberOfLines={1} style={styles.priceText}>
            ${price}
          </Text>
          <Text numberOfLines={1} style={styles.discountedPriceText}>
            ${discountedPrice}
          </Text>
        </View>
        <View style={styles.allIconsContainer}>
          <View style={styles.deleteContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={onDel}>
                <Icon name="trash" size={24} color={colors.tertiary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={onAdd}>
                <Icon name="add" size={24} color={colors.tertiary} />
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                <Text numberOfLines={1} style={styles.quantityText}>
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity style={styles.icon} onPress={onSub}>
                <Icon name="remove" size={24} color={colors.tertiary} />
              </TouchableOpacity>
            </View>
          </View>
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
    width: wp('50'),
    height: hp('42'),
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
  quantityContainer: {
    margin: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
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
  quantityText: {
    color: colors.tertiary,
    fontSize: wp(4),
  },
  iconContainer: {
    padding: wp(1),
    marginHorizontal: wp(1),
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderStyle: 'dotted',
    borderColor: colors.light,
    borderWidth: 0.5,
  },
  deleteContainer: {
    padding: wp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    padding: wp(1),
    marginHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allIconsContainer: {
    padding: wp(1),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {},
  priceContainer: {
    margin: wp(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  priceText: {
    color: colors.priceText,
    fontSize: wp(3.8),
  },
  discountedPriceText: {
    color: colors.discountedPriceText,
    fontSize: wp(3.8),
  },
});

export default CartProductCard;
