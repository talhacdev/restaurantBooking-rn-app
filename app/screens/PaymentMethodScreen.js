import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import Button from '../components/Button';
import moment from 'moment';
import AppInput from '../components/Input';
import axios from 'axios';
import hardcodeCart from '../hardcode/hardcodeCart';

function PaymentMethodScreen(props) {
  const [address, setAddress] = useState();
  const [notes, setNotes] = useState();
  const [customer, setCustomer] = useState();
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    getCustomer()
      .then(json => {
        setCustomer(json);
      })
      .catch(error => alert(error));
    getRestaurants()
      .then(json => {
        setRestaurants(json);
      })
      .catch(error => alert(error));
  }, []);

  const getCustomer = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LoginResponse');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('\nError Getting Data\n', e);
    }
  };

  const getRestaurants = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Restaurants');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('\nError Getting Data\n', e);
    }
  };

  const onPressPlaceOrder = () => {
    // console.log('orderObject', orderObject);
    // console.log('DEBUG all restaurants', restaurants);
    const filteredRestaurant = restaurants.filter(
      i => i.id === props?.route?.params?.products[0].restaurant,
    );

    // console.log('DEBUG customer', customer);
    // console.log('DEBUG restaurant', filteredRestaurant);
    const orderObject = {
      customerData: {
        name: customer.customer.firstName + ' ' + customer.customer.lastName,
        contact: customer.customer.contact,
        customerId: customer.customer.id,
        customerAddress: address,
      },
      restaurantData: {
        restaurantName: filteredRestaurant[0].restaurantName,
        contact: filteredRestaurant[0].contact,
        restaurantId: filteredRestaurant[0].id,
      },
      items: props?.route?.params?.products,
      // items: {
      //   category: props?.route?.params?.products[0].category,
      //   itemDescription: props?.route?.params?.products[0].description,
      //   itemName: props?.route?.params?.products[0].itemName,
      //   price: props?.route?.params?.products[0].price,
      //   // quantity: props?.route?.params?.products[0].quantity,
      //   quantity: 1,
      //   restaurant: props?.route?.params?.products[0].restaurant,
      //   _id: props?.route?.params?.products[0].category,
      // },
      grandTotal: props?.route?.params?.totalPrice,
      // grandTotal: 23000,
      orderDate: new Date(),
      orderType: 'pickup',
      // orderType: "dinein",
      tableNumber: '14',
    };

    console.log('DEBUG orderObject: ', orderObject);

    postOrder(orderObject);
  };

  const postOrder = orderObject => {
    let restId = orderObject.restaurantData.restaurantId;
    // to-do async login token
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MTk1NjYzNzgzOTcyNDM2MDA4ZGQwZTkiLCJpYXQiOjE2Mzg4OTQwNzl9.G8c00HAcbvZre7nuqEi6XnXiTDtw2DUVh-lYVMFo8fk';
    let config = {
      headers: {
        authorization: token,
      },
    };

    console.log('restId: ', restId);
    console.log('token: ', token);

    axios
      .post(
        `http://magicmeal.herokuapp.com/user/post-order/${restId}`,
        orderObject,
        config,
      )
      .then(response => {
        console.log('DEBUG postOrder response: ', response);
        // navigation.navigate(routes.ORDER_SUCCESS);
      })
      .catch(error => {
        console.log('DEBUG postOrder ', error);
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'payment method'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <AppInput title={'address'} onChangeText={text => setAddress(text)} />
          <AppInput title={'notes'} onChangeText={text => setNotes(text)} />
        </View>
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
  upperViewContainer: {
    alignItems: 'center',
  },
});

export default PaymentMethodScreen;
