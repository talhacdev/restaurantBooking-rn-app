import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';
import Button from '../components/Button';

function PaymentMethodScreen(props) {
  const onPressPlaceOrder = () => {
    const orderObject = {
      products: props?.route?.params?.products,
      totalPrice: props?.route?.params?.totalPrice,
      totalQuantity: props?.route?.params?.totalQuantity,
    };

    createOrder(orderObject);
  };

  const createOrder = async orderObject => {
    firestore()
      .collection('Orders')
      .add(orderObject)
      .then(() => {
        console.log('Order Placed!');
        navigation.navigate(routes.ORDER_SUCCESS);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'payment method'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          noElevation
          widthContainer={wp(100)}
          title={'place order'}
          onPress={() => onPressPlaceOrder()}
        />
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
    flex: 0.1,
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 1,
    top: hp(8.5),
    backgroundColor: colors.background,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default PaymentMethodScreen;
