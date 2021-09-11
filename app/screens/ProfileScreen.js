import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
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

function ProfileScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'MY PROFILE'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <Image
            style={{
              width: wp(50),
              height: wp(50),
              marginTop: wp(2.5),
              marginBottom: wp(2.5),
            }}
            source={require('../assets/snapchatLogoBlack.jpg')}
          />
          <AppInput
            placeholder="first name"
            title="first name"
            style={styles.textInput}
          />
          <AppInput
            placeholder="last name"
            title="last name"
            style={styles.textInput}
          />
          <AppInput
            placeholder="email"
            title="email"
            style={styles.textInput}
            keyboardType={'email-address'}
          />
          <AppInput
            placeholder="phone"
            title="phone"
            style={styles.textInput}
            keyboardType={'phone-pad'}
          />
          <AppInput
            placeholder="address"
            title="address"
            style={styles.textInput}
          />
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
    flex: 0.91,
    top: hp(8.5),
    backgroundColor: colors.primary,
  },
  upperViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
