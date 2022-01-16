import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

import {connect} from 'react-redux';
import {Login, UpdateCart} from '../redux/actions/AuthActions';

function PaymentMethodScreen(props) {
  const [orderType, setOrderType] = useState(0);
  const [restaurant, setRestaurant] = useState();
  const [user, setUser] = useState(props.user[0]);
  const [notes, setNotes] = useState('');
  const restId = props?.route?.params?.restId;

  useEffect(() => {
    getRestaurantDetail(restId);
  }, []);
  const getRestaurantDetail = async restId => {
    axios
      .get(`http://192.168.18.234:3001/user/get-restaurant-menu/${restId}`)
      .then(response => {
        // console.log('RESPONSE: getRestaurantDetail: ', response.data.data);
        setRestaurant(response.data.data);
      })
      .catch(error => {
        console.log('ERROR: getRestaurantDetail: ', error);
      });
  };

  const onPressPlaceOrder = () => {
    if (restaurant) {
      if (props.user.length == 0) {
        alert('No User found.');
        navigation.navigate(routes.LOGIN);
      } else {
        console.log('restId: ', props?.route?.params?.restId);
        console.log('USER: ', user);

        const orderObject = {
          customerData: {
            name: user.customer.firstName + ' ' + user.customer.lastName,
            contact: user.customer.contact,
            customerId: user.customer.id,
            customerAddress: '',
          },
          restaurantData: {
            restaurantName: restaurant?.restaurantName,
            contact: restaurant?.contact,
            restaurantId: restaurant?.id,
          },
          items: props?.route?.params?.products,
          grandTotal: props?.route?.params?.totalPrice,
          orderDate: new Date(),
          orderType: orderType == 0 ? 'pickup' : 'dinein',
          tableNumber: notes,
        };

        console.log('DEBUG orderObject: ', orderObject);

        postOrder(orderObject);
      }
    }
  };

  const postOrder = orderObject => {
    let token = user.token;
    let config = {
      headers: {
        authorization: token,
      },
    };

    // console.log('restId: ', restId);
    // console.log('token: ', token);

    axios
      .post(
        `http://192.168.18.234:3001/user/post-order/${restId}`,
        orderObject,
        config,
      )
      .then(response => {
        console.log('DEBUG postOrder response: ', response);
        alert(response.data.message);
        props.updateCart([]);
        navigation.navigate(routes.HOME);
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
        <View style={styles.dividerView}>
          <TouchableOpacity
            onPress={() => setOrderType(0)}
            style={styles.dividerButton}>
            <Text style={styles.dividerText}>Pick Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOrderType(1)}
            style={styles.dividerButton}>
            <Text style={styles.dividerText}>Dine In</Text>
          </TouchableOpacity>
        </View>
        {orderType == 1 ? (
          <View style={styles.upperViewContainer}>
            <AppInput
              tablenumber
              title={'table number'}
              onChangeText={text => setNotes(text)}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disabled={!restaurant}
          noElevation
          widthContainer={wp(100)}
          title={orderType == 1 ? 'place pick up order' : 'place dine in order'}
          onPress={() => onPressPlaceOrder()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(5),
  },
  bottomViewContainer: {
    flex: 0.1,
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 1,
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
  dividerView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('5%'),
    elevation: wp(1),
    flexDirection: 'row',
  },
  dividerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    margin: wp(1),
    padding: hp(1),
    backgroundColor: colors.dividerColor,
  },
  dividerText: {
    fontWeight: 'bold',
    color: colors.buttonTextColor,
    fontSize: wp(3.5),
    textTransform: 'uppercase',
  },
});

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: payload => dispatch(Login(payload)),
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethodScreen);
