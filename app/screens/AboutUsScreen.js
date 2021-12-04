import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import AppInput from '../components/Input';

function AboutUsScreen(props) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'about us'} />
      </View> */}
      <View style={styles.contentViewContainer}></View>
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
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
  },
});

export default AboutUsScreen;
