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
import {createIconSetFromFontello} from 'react-native-vector-icons';

function PhoneNumberScreen(props) {
  const [phone, setPhone] = useState();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log('phoneNumber: ', phoneNumber);
    const confirmation = await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(response => console.log('response: ', response))
      .catch(error => console.log('error: ', error));
    console.log('phoneNumber: ', phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
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
          <AppInput
            keyboardType={'phone-pad'}
            title={'phone'}
            onChangeText={text => setPhone(text)}
          />
          <AppButton
            title="send code"
            onPress={() => signInWithPhoneNumber(phone)}
          />
        </View>
      </View>
    );
  }

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
        <AppInput title={'code'} onChangeText={text => setCode(text)} />
        <AppButton title="confirm code" onPress={() => confirmCode()} />
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

export default PhoneNumberScreen;
