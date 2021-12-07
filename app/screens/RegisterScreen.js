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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const onPressRegisterButton = (email, password) => {
  //   Keyboard.dismiss();

  //   if (email == undefined || password == undefined) {
  //     alert('Credentials are mandatory.');
  //   } else {
  //     toggleModal();
  //     setLoading(true);
  //     auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(res => {
  //         console.log('User account created & signed in!');
  //         CreateUserRecord(res);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setLoading(false);
  //         toggleModal();
  //         alert(error);
  //       });
  //   }
  // };

  // const CreateUserRecord = res => {
  //   let obj = {
  //     email: res.user._user.email,
  //     uid: res.user._user.uid,
  //     displayName: res.user._user.displayName,
  //     photoURL: res.user._user.photoURL,
  //     phoneNumber: res.user._user.phoneNumber,
  //   };
  //   firestore()
  //     .collection('UserRecords')
  //     .doc(obj.uid)
  //     .set(obj)
  //     .then(() => {
  //       setLoading(false);
  //       toggleModal();
  //       console.log('UserRecords updated!');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //       toggleModal();
  //       alert(error);
  //     });
  // };

  const onPressRegister = async () => {
    let obj = {
      firstName: 'Muhammad',
      lastName: 'Talha',
      email: 'thecorruptmob1@gmail.com',
      password: '123456',
      contact: '+923331049859',
      role: 'customer',
    };

    axios
      .post('http://magicmeal.herokuapp.com/auth/signup-customer', obj)
      .then(response => {
        console.log('DEBUG registerScreen: ', response);
      })
      .catch(error => {
        console.log('DEBUG registerScreen ERROR: ', error);
      });
  };

  // const onPressRegister = async () => {
  //   console.log('DEBUG HELLO');
  //   axios
  //     .get('http://magicmeal.herokuapp.com/user/get-restaurants')
  //     .then(response => {
  //       console.log('DEBUG registerScreen: ', response);
  //     })
  //     .catch(error => {
  //       console.log('DEBUG registerScreen ERROR: ', error);
  //     });
  // };

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
        <AppInput title={'first name'} onChangeText={text => setEmail(text)} />
        <AppInput title={'last name'} onChangeText={text => setEmail(text)} />
        <AppInput title={'email'} onChangeText={text => setEmail(text)} />
        <AppInput title={'password'} onChangeText={text => setPassword(text)} />
        <AppInput title={'phone'} onChangeText={text => setEmail(text)} />
        <View style={styles.buttonContainer}>
          <AppButton
            title="register"
            // onPress={() => onPressRegisterButton(email, password)}
            onPress={() => onPressRegister()}
          />
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
