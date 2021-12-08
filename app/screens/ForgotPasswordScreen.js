import React, {useState} from 'react';
import {View, Image, Keyboard, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import AppButton from '../components/Button';
import AppInput from '../components/Input';
import colors from '../config/colors';

function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  onPressSendEmailButton = email => {
    console.log(email);
    Keyboard.dismiss();
    if (email == undefined) {
      alert('Email is mandatory.');
    } else {
      toggleModal();
      setLoading(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Password reset email sent!');
          setLoading(false);
          toggleModal();
          alert('Password reset email sent!');
        })
        .catch(error => {
          console.error(error);
          A;
          setLoading(false);
          toggleModal();
          alert(error);
        });
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
        <AppInput title={'email'} onChangeText={text => setEmail(text)} />
        <View style={styles.buttonContainer}>
          <AppButton
            title="send email"
            onPress={() => onPressSendEmailButton(email)}
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

export default ForgotPasswordScreen;
