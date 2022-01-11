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

function BookNowScreen(props) {
  const [selectedTable, setSelectedTable] = useState();
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const tables = props?.route?.params.tables;
  const timeslot = props?.route?.params.timeslot;
  const [customer, setCustomer] = useState();
  const [restaurants, setRestaurants] = useState();

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [person, setPerson] = useState();

  useEffect(() => {
    console.log('BOOKNOW props: ', props?.route?.params);
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

  const onPressBookNow = () => {
    let reservationData = {
      numberOfPersons: person,
      reservationDate: new Date(),
      reservationTime: time,
      customer: {
        customerName:
          customer.customer.firstName + ' ' + customer.customer.lastName,
        customerId: customer.customer.id,
      },
      restaurant: {
        restaurantName: props?.route?.params.restaurantName,
        restaurantId: props?.route?.params.id,
      },
    };

    console.log('bookingnowscreen: ', reservationData);

    postOrder(reservationData);
  };

  const postOrder = reservationData => {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MWJlZWFiOWMzNjBjNjM5MzgwMzE2MjEiLCJpYXQiOjE2NDA5NzUzMTR9.n-kcWny5bSG7vIQMM-jGWELZcL5dJCYAEq6B-vJvo2A';
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
        console.log('Reservation Request Placed', response);
        alert('Reservation Request Placed');
        navigation.navigate(routes.HOME);
      })
      .catch(error => {
        console.log('DEBUG booking: ', error);
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentViewContainer}>
        <View style={styles.lowerViewContainer}>
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
          <AppInput
            title={'person'}
            placeholder={'4'}
            onChangeText={text => setPerson(text)}
          />
          <View style={styles.buttonContainer}>
            <AppButton
              disabled={(date, time, person) ? false : true}
              title="book now"
              onPress={() => onPressBookNow()}
            />
          </View>
        </View>
        {/* <View style={styles.dividerView}>
          <Text style={styles.dividerText}>Tables</Text>
        </View>
        <View style={styles.upperViewContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tables}
            keyExtractor={tables => tables.id.toString()}
            renderItem={({item}) => (
              <SelectionButton
                title={item.title}
                onPress={() => setSelectedTable(item)}
                selected={selectedTable == item ? true : false}
              />
            )}
          />
        </View> */}

        {/* <View style={styles.dividerView}>
          <Text style={styles.dividerText}>timeslot</Text>
        </View>
        <View style={styles.upperViewContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={timeslot}
            keyExtractor={timeslot => timeslot.id.toString()}
            renderItem={({item}) => (
              <SelectionButton
                title={item.slot}
                onPress={() => setSelectedTimeslot(item)}
                selected={selectedTimeslot == item ? true : false}
              />
            )}
          />
        </View> */}

        {/* <View style={styles.lowerViewContainer}>
          <View style={styles.buttonContainer}>
            <AppButton
              disabled={(selectedTable, selectedTimeslot) ? false : true}
              title="book now"
              onPress={() => onPressBookNow()}
            />
          </View>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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

export default BookNowScreen;
