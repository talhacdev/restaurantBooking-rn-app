import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';
import Button from '../components/Button';

function BookingSuccessScreen(props) {
  const data = [
    {
      id: '1',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '2',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '3',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '4',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '5',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '6',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '7',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
    {
      id: '8',
      title: 'five',
      productName: 'productName',
      companyName: 'companyName',
      price: 'price',
      quantity: 'quantity',
      unit: 'unit',
      description: 'description',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
    },
  ];

  let totalQuantity = 0;
  let totalPrice = 0;

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'booking success'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}></View>
      </View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  bottomViewContainer: {
    flex: 0.1,
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
    backgroundColor: colors.backgroundColor,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default BookingSuccessScreen;
