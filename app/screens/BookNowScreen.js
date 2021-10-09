import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import SelectionButton from '../components/SelectionButton';
import AppButton from '../components/Button';

function BookNowScreen(props) {
  const [selectedTable, setSelectedTable] = useState();
  const [selectedTimeslot, setSelectedTimeslot] = useState();
  const tables = props?.route?.params.tables;
  const timeslot = props?.route?.params.timeslot;

  const onPressBookNow = () => {
    const bookingObject = {
      restaurantId: props?.route?.params?.id,
      selectedTable,
      selectedTimeslot,
    };

    bookingStatus(bookingObject);
  };

  const bookingStatus = async bookingObject => {
    firestore()
      .collection('Booking')
      .where('restaurantId', '==', props?.route?.params?.id)
      .where('selectedTable', '==', selectedTable)
      .where('selectedTimeslot', '==', selectedTimeslot)
      .get()
      .then(querySnapshot => {
        querySnapshot._docs.length != 0
          ? alert('Booking already exists!\nTry a different combination.')
          : createBooking(bookingObject);
      })
      .catch(err => {
        alert(err);
      });
  };

  const createBooking = async bookingObject => {
    firestore()
      .collection('Booking')
      .add(bookingObject)
      .then(() => {
        console.log('Booking Reserved!');
        navigation.navigate(routes.BOOKING_SUCCESS);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title="book now" />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.dividerView}>
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
        </View>

        <View style={styles.dividerView}>
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
        </View>

        <View style={styles.lowerViewContainer}>
          <View style={styles.buttonContainer}>
            <AppButton
              disabled={(selectedTable, selectedTimeslot) ? false : true}
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
    backgroundColor: colors.background,
  },
  headerViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: hp(0),
  },
  contentViewContainer: {
    flex: 0.9,
    top: hp(8.5),
  },
  upperViewContainer: {
    marginVertical: hp(1),
  },
  dividerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookNowScreen;
