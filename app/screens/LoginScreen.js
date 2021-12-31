import React, {useState} from 'react';
import {View, Image, Keyboard, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../components/Button';
import AppInput from '../components/Input';
import AppURLText from '../components/URLText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function LoginScreen(props) {
  const [email, setEmail] = useState('nob786@gmail.com');
  const [password, setPassword] = useState('pakistan');
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressLogin = async () => {
    // let obj = {
    //   email: 'nob786@gmail.com',
    //   password: 'pakistan',
    // };

    console.log('loginscreen onPressLogin');

    toggleModal();
    setLoading(true);

    let obj = {
      email,
      password,
    };

    await axios
      .post('http://192.168.18.203:3001/auth/login', obj)
      .then(response => {
        setLoading(false);
        toggleModal();
        console.log('DEBUG loginScreen: ', response);
        storeData(response.data);
      })
      .catch(error => {
        setLoading(false);
        toggleModal();
        console.log('DEBUG catch: ', error);
        alert(error);
      });
  };

  const storeData = async value => {
    console.log('DEBUG loginScreen @LoginResponse: ', value);
    try {
      await AsyncStorage.setItem('@LoginResponse', JSON.stringify(value));
    } catch (e) {
      console.log('\nError Storing Data\n', e);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Modal
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          isVisible={isModalVisible}>
          <View
            style={{
              position: 'absolute',
              padding: wp(5),
              borderRadius: wp(10),
              backgroundColor: 'black',
            }}>
            <UIActivityIndicator color="white" />
          </View>
        </Modal>
      ) : null}
      <View style={styles.upperViewContainer}>
        <Image
          style={styles.image}
          source={require('../assets/snapchatLogoBlack.jpg')}
        />
      </View>
      <View style={styles.lowerViewContainer}>
        <AppInput
          value={email}
          title={'email'}
          onChangeText={text => setEmail(text)}
        />
        <AppInput
          value={password}
          title={'password'}
          onChangeText={text => setPassword(text)}
        />

        <View style={styles.buttonContainer}>
          <AppButton
            title="login"
            // onPress={() => onPressLoginButton()}
            onPress={() => onPressLogin()}
          />
        </View>
      </View>

      <View style={styles.bottomViewContainer}>
        <AppURLText
          title={'Forgot password?'}
          onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}
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
    backgroundColor: colors.backgroundColor,
  },
  image: {
    width: wp(50),
    height: wp(50),
    marginVertical: hp(5),
    paddingVertical: hp(5),
  },
  topViewContainer: {
    flex: 0.1,
    backgroundColor: 'purple',
    position: 'absolute',
    top: 0,
  },
  upperViewContainer: {
    paddingVertical: hp(1),
    marginVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    paddingVertical: hp(1),
    marginVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewContainer: {
    paddingVertical: hp(1),
    marginVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: hp(1),
  },
});

export default LoginScreen;
