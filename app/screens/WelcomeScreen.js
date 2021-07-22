import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import AppButton from '../components/Button';
import AppURLText from '../components/URLText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.upperViewContainer}>
        <Image
          style={{
            width: wp(50),
            height: wp(50),
            margin: wp(5),
          }}
          source={require('../assets/snapchatLogoBlack.jpg')}
        />
      </View>
      <View style={styles.lowerViewContainer}>
        <AppButton title="sign up with facebook"   onPress={() => navigation.navigate(routes.HOME)} />
        <AppButton title="sign up with google" />
        <AppButton
          title="register"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>

      <View style={styles.bottomViewContainer}>
        <AppURLText
          title={'Already have an account?'}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  topViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: 0,
  },
  upperViewContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
