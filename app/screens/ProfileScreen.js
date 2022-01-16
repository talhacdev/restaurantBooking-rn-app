import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import AppInput from '../components/Input';
import AppButton from '../components/Button';
import {connect} from 'react-redux';
import {UpdateCart} from '../redux/actions/AuthActions';
function ProfileScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [user, setUser] = useState(props.user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log('USER: ', user);
  });

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
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'my profile'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <TouchableOpacity
          // onPress={() => onPressImage()}
          >
            {photoURL ? (
              <Image
                style={{
                  width: wp(50),
                  height: wp(50),
                  marginTop: wp(2.5),
                  marginBottom: wp(2.5),
                }}
                source={{
                  uri: user.photoURL,
                }}
              />
            ) : (
              <Image
                style={{
                  width: wp(50),
                  height: wp(50),
                  marginTop: wp(2.5),
                  marginBottom: wp(2.5),
                }}
                source={require('../assets/snapchatLogoBlack.jpg')}
              />
            )}
          </TouchableOpacity>
          <View style={{marginTop: hp(5)}}>
            <AppInput
              disable
              value={user[0]?.customer?.firstName}
              placeholder="first name"
              title="first name"
              defaultValue={user[0]?.customer?.firstName}
              onChangeText={val => setFirstname(val)}
            />

            <AppInput
              disable
              value={user[0]?.customer?.lastName}
              placeholder="last name"
              title="last name"
              defaultValue={user[0]?.customer?.lastName}
              onChangeText={val => setLastname(val)}
            />

            <AppInput
              disable
              placeholder="email"
              title="email"
              keyboardType={'email-address'}
              value={user[0]?.email}
              onChangeText={val => setEmail(val)}
            />
            <AppInput
              disable
              value={user[0]?.customer?.contact}
              placeholder="phone"
              title="phone"
              keyboardType={'phone-pad'}
              defaultValue={user[0]?.customer?.contact}
              onChangeText={val => setPhoneNumber(val)}
            />
            {/* <AppInput
              placeholder="address"
              title="address"
              defaultValue={user[0]?.address}
              onChangeText={val => setAddress(val)}
            /> */}
          </View>

          <View style={{margin: hp(1)}}>
            {/* <AppButton
              // onPress={() => onPressUpdateButton()}
              disabled={true}
              title={'update'}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(5),
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
    backgroundColor: colors.backgroundColor,
  },
  upperViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
