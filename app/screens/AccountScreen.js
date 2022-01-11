import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import TextCard from '../components/TextCard';

import {connect} from 'react-redux';
import {Logout} from '../redux/actions/AuthActions';

function AccountScreen(props) {
  const onPressLogOutButton = () => {
    updateLoggedIn();
    props.Logout();
  };

  const updateLoggedIn = async () => {
    try {
      await AsyncStorage.removeItem('@loggedIn');
      return true;
    } catch (e) {
      console.log('ERROR: loggedIn: ' + e);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'Account'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        {props.user.length == 0 ? (
          <View style={styles.upperViewContainer}>
            <TextCard
              title="Log In"
              leftIcon={'log-in'}
              onPress={() => navigation.navigate(routes.WELCOME)}
            />
          </View>
        ) : (
          <View style={styles.upperViewContainer}>
            <TextCard
              title="My Profile"
              leftIcon={'person-circle'}
              onPress={() => navigation.navigate(routes.PROFILE)}
            />
            <TextCard
              title="My Bookings"
              leftIcon={'list'}
              onPress={() => navigation.navigate(routes.BOOKINGS)}
            />
            <TextCard
              title="My Orders"
              leftIcon={'list'}
              onPress={() => navigation.navigate(routes.ORDERS)}
            />
            <TextCard
              title="Log Out"
              leftIcon={'log-out'}
              onPress={() => onPressLogOutButton()}
            />
          </View>
        )}
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
});

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Logout: payload => dispatch(Logout(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
