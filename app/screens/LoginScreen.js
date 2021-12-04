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
import AppURLText from '../components/URLText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function LoginScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  onPressLoginButton = () => {
    Keyboard.dismiss();
    console.log(email, password);
    if (email == undefined || password == undefined) {
      alert('Credentials are mandatory.');
    } else {
      toggleModal();
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          toggleModal();
          console.log('User signed in!');
          // alert('User signed in!');
        })
        .catch(error => {
          console.error(error);
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
        <AppInput title={'password'} onChangeText={text => setPassword(text)} />

        <View style={styles.buttonContainer}>
          <AppButton title="login" onPress={() => onPressLoginButton()} />
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
