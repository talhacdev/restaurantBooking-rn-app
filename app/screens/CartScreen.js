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

function CartScreen(props) {
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
      <View style={styles.headerViewContainer}>
        <AppHeader title={'cart'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <CartProductCard
                productName={item.productName}
                unit={item.unit}
                orderTime={item.orderTime}
                address={item.address}
                status={item.status}
                total={item.total}
                onPress={() =>
                  navigation.navigate(routes.CART_PRODUCT_DETAIL, item)
                }
              />
            )}
          />
        </View>
      </View>
      <View style={styles.bottomViewContainer}>
        <BottomTextCard
          leftTitle={totalQuantity + ' goods'}
          rightTitle={'Total $' + totalPrice}
        />
        <View style={styles.buttonContainer}>
          <Button
            widthContainer={wp(100)}
            title={'CHECK OUT'}
            onPress={() => navigation.navigate(routes.CHECKOUT)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: hp(0),
  },
  bottomViewContainer: {
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 0.72,
    top: hp(8.5),
  },
  buttonContainer: {
    paddingVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;