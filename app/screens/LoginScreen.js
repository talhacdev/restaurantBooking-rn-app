import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';

import AppButton from '../components/Button';
import AppInput from '../components/Input';
import colors from '../config/colors';
import {connect} from 'react-redux';
import {Login} from '../redux/actions/AuthActions';

function LoginScreen(props) {
  const [email, setEmail] = useState('nob786@gmail.com');
  const [password, setPassword] = useState('5b2e3bf858');
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressLogin = async () => {
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
        console.log('RESPONSE: login: ', response);
        onPressLoginRedux(response.data);
      })
      .catch(error => {
        setLoading(false);
        toggleModal();
        console.log('ERROR: ', error);
        alert(error);
      });
  };

  const onPressLoginRedux = async obj => {
    if (props.user.length != 0) {
      alert('ERROR: User already exists');
      console.log('STORE: props.user: ', props.user);
    } else {
      let array = [];
      array.push(obj);
      props.login(array);
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
          <AppButton title="login" onPress={() => onPressLogin()} />
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
    flex: 0.8,
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: payload => dispatch(Login(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
