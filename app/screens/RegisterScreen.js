import React, {useState} from 'react';
import {View, Image, Keyboard, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';

import AppButton from '../components/Button';
import AppInput from '../components/Input';
import colors from '../config/colors';

function RegisterScreen(props) {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressRegister = async () => {
    toggleModal();
    setLoading(true);

    let obj = {
      firstname,
      lastname,
      email,
      password,
      contact: phone,
      role: 'customer',
    };

    console.log('DEBUG registerScreen obj: ', obj);

    axios
      .post('http://magicmeal.herokuapp.com/auth/signup-customer', obj)
      .then(response => {
        setLoading(false);
        toggleModal();
        console.log('DEBUG registerScreen: ', response);
      })
      .catch(error => {
        setLoading(false);
        toggleModal();
        console.log('DEBUG registerScreen ERROR: ', error);
        alert(error);
      });
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
          title={'first name'}
          onChangeText={text => setFirstname(text)}
        />
        <AppInput
          title={'last name'}
          onChangeText={text => setLastname(text)}
        />
        <AppInput title={'email'} onChangeText={text => setEmail(text)} />
        <AppInput title={'password'} onChangeText={text => setPassword(text)} />
        <AppInput title={'phone'} onChangeText={text => setPhone(text)} />
        <View style={styles.buttonContainer}>
          <AppButton title="register" onPress={() => onPressRegister()} />
        </View>
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
  buttonContainer: {
    marginVertical: hp(1),
  },
});

export default RegisterScreen;
