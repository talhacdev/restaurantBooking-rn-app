import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

import AppButton from '../components/Button';
import AppInput from '../components/Input';
import colors from '../config/colors';

function RegisterScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  onPressRegisterButton = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.topViewContainer}>
        <AppHeader title="commerce" />
      </View> */}
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
        <AppInput title={'email'} onChangeText={text => setEmail(text)} />
        <AppInput title={'password'} onChangeText={text => setPassword(text)} />
        <AppButton
          title="register"
          onPress={() => onPressRegisterButton(email, password)}
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

export default RegisterScreen;
