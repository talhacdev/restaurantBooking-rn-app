import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function OrderCard({
  orderTime,
  status,
  total,
  address,
  stylesTitleText,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.textContainer} onPress={onPress}>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {status ? status : 'status'}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {orderTime ? orderTime : 'orderTime'}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          ${total ? total : 'total'}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {address ? address : 'address'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.secondary,
    width: wp('100%'),
    height: hp('20%'),
    padding: wp(5),
    elevation: wp(1),
    borderWidth: wp(0.05),
    borderColor: colors.primary,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(1),
  },
});

export default OrderCard;
