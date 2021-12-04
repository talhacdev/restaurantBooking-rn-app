import React, {useEffect} from 'react';
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
import hardcodeCart from '../hardcode/hardcodeCart';

function OrderSuccessScreen(props) {
  useEffect(() => {
    hardcodeCart.removeItem();

    setTimeout(function () {
      navigation.navigate(routes.HOME);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'order success'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}></View>
      </View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.background,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default OrderSuccessScreen;
