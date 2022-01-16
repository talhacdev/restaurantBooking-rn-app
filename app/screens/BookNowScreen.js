import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import SelectionButton from '../components/SelectionButton';
import AppButton from '../components/Button';
import AppInput from '../components/Input';

import {connect} from 'react-redux';
import {Login} from '../redux/actions/AuthActions';

function BookNowScreen(props) {
  const [person, setPerson] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [user, setUser] = useState(props.user[0]);

  const onPressBookNow = () => {
    if (props.user.length == 0) {
      alert('No User found.');
      navigation.navigate(routes.LOGIN);
    } else {
      let reservationData = {
        numberOfPersons: person,
        reservationDate: date,
        reservationTime: time,
        customer: {
          customerName: user.customer.firstName + ' ' + user.customer.lastName,
          customerId: user.customer.id,
        },
        restaurant: {
          restaurantName: props?.route?.params.restaurantName,
          restaurantId: props?.route?.params.id,
        },
      };

      console.log('bookingnowscreen: ', reservationData);

      requestBooking(reservationData);
    }
  };

  const requestBooking = reservationData => {
    let token = user.token;
    let config = {
      headers: {
        authorization: token,
      },
    };

    axios
      .post(
        `http://192.168.18.203:3001/user/book-table`,
        reservationData,
        config,
      )
      .then(response => {
        console.log('RESPONSE: booking:', response);
        alert('Reservation Request Placed');
        navigation.navigate(routes.HOME);
      })
      .catch(error => {
        console.log('ERROR: booking: ', error);
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentViewContainer}>
        <View style={styles.lowerViewContainer}>
          <AppInput
            title={'person'}
            placeholder={'4'}
            onChangeText={text => setPerson(text)}
          />
          <AppInput
            title={'date'}
            placeholder={'30-12-21'}
            onChangeText={text => setDate(text)}
          />
          <AppInput
            title={'time'}
            placeholder={'13:00'}
            onChangeText={text => setTime(text)}
          />
          <View style={styles.buttonContainer}>
            <AppButton
              disabled={(date, time, person) ? false : true}
              title="book now"
              onPress={() => onPressBookNow()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    marginTop: hp(5),
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
  },
  upperViewContainer: {
    marginVertical: hp(1),
  },
  dividerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dividerColor,
    width: wp('100%'),
    height: hp('5%'),
    elevation: wp(1),
  },
  dividerText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(4.5),
    textTransform: 'uppercase',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginVertical: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    flex: 1,
    paddingVertical: hp(1),
    marginVertical: hp(1),
    // justifyContent: 'center',
    alignItems: 'center',
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNowScreen);
