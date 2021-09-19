import React from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CategoryCard from '../components/CategoryCard';
import VerticalProductCard from '../components/VerticalProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import RestaurantVerticalCard from '../components/RestaurantVerticalCard';
import ReviewCard from '../components/ReviewCard';
import SelectionButton from '../components/SelectionButton';
import AppButton from '../components/Button';
import AppInput from '../components/Input';

function BookNowScreen(props) {
  const tables = [
    {
      id: '0',
      title: 'table1',
    },
    {
      id: '1',
      title: 'table2',
    },
    {
      id: '2',
      title: 'table3',
    },
    {
      id: '3',
      title: 'table4',
    },
  ];

  const timeslot = [
    {
      id: '0',
      slot: '9am to 12pm',
    },
    {
      id: '1',
      slot: '12pm to 3pm',
    },
    {
      id: '2',
      slot: '3pm to 6pm',
    },
    {
      id: '3',
      slot: '6pm to 9pm',
    },
    {
      id: '4',
      slot: '9pm to 12am',
    },
  ];

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
              <View style={styles.wrapper}>
                <SelectionButton
                  title={item.title}
                  onPress={() => navigation.navigate(routes.PRODUCT, item)}
                />
              </View>
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
              <View style={styles.wrapper}>
                <SelectionButton
                  title={item.slot}
                  onPress={() => navigation.navigate(routes.PRODUCT, item)}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.lowerViewContainer}>
          <View style={styles.buttonContainer}>
            <AppButton
              title="book now"
              onPress={() => navigation.navigate(routes.BOOKING_SUCCESS)}
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
  upperViewContainer: {},
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
