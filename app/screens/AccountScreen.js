import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import TextCard from '../components/TextCard';

function AccountScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'Account'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <TextCard
            title="My Profile"
            leftIcon={'person-circle'}
            onPress={() => navigation.navigate(routes.PROFILE)}
          />
          <TextCard
            title="My Orders"
            leftIcon={'list'}
            onPress={() => navigation.navigate(routes.ORDERS)}
          />

          <TextCard
            title="Promo Alerts"
            leftIcon={'notifications'}
            onPress={() => navigation.navigate(routes.PROMO_ALERT)}
          />
          <TextCard title="Rate Us" leftIcon={'star'} />
          <TextCard
            title="Contact Us"
            leftIcon={'call'}
            onPress={() => navigation.navigate(routes.CONTACT_US)}
          />
          <TextCard
            title="About Us"
            leftIcon={'information'}
            onPress={() => navigation.navigate(routes.ABOUT_US)}
          />
          <TextCard title="Log Out" leftIcon={'log-out'} />
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
  contentViewContainer: {
    flex: 0.8,
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
  lowerViewContainer: {},
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchViewContainer: {
    margin: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
