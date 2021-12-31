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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import AppInput from '../components/Input';
import AppButton from '../components/Button';

function ProfileScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(auth()._user);
  const [photoURL, setPhotoURL] = useState();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   fetchUserRecords();
  // }, []);

  // const fetchUserRecords = async () => {
  //   await firestore()
  //     .collection('UserRecords')
  //     .doc(auth()._user.uid)
  //     .get()
  //     .then(res => {
  //       console.log(res._data);
  //       setUser(res._data);
  //       setDisplayName(res._data.displayName);
  //       setPhoneNumber(res._data.phoneNumber);
  //       setAddress(res._data.address);
  //       setPhotoURL(res._data.photoURL);
  //     })
  //     .catch(error => alert(error));
  // };

  // const onPressUpdateButton = () => {
  //   displayName && phoneNumber && address && photoURL
  //     ? uploadImage()
  //     : console.log(displayName, phoneNumber, address, photoURL);
  // };

  // const onPressImage = () => {
  //   let options = {
  //     mediaType: 'photo',
  //     // cameraType: 'front',
  //     // saveToPhotos: true,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log(response);
  //     const source = response.assets[0].uri;
  //     setImage(source.toString());
  //   });
  // };

  // const uploadImage = async () => {
  //   toggleModal();
  //   setLoading(true);

  //   const uploadUri = image;
  //   let fileName = auth()._user.uid;

  //   try {
  //     await storage().ref(fileName).putFile(uploadUri);
  //     const url = await storage().ref(fileName).getDownloadURL();
  //     updateUserRecords(url);
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  // const updateUserRecords = async url => {
  //   let obj = {
  //     displayName,
  //     phoneNumber,
  //     address,
  //     email: user?.email,
  //     photoURL: url,
  //   };
  //   console.log('UserRecords: ', obj);
  //   firestore()
  //     .collection('UserRecords')
  //     .doc(user.uid)
  //     .update(obj)
  //     .then(() => {
  //       alert('Profile updated!');
  //       setLoading(false);
  //       toggleModal();
  //       navigation.navigate(routes.ACCOUNT);
  //     })
  //     .catch(err => {
  //       alert(err);
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
              placeholder="first name"
              title="first name"
              defaultValue={user?.displayName}
              onChangeText={val => setFirstname(val)}
            />

            <AppInput
              placeholder="last name"
              title="last name"
              defaultValue={user?.displayName}
              onChangeText={val => setLastname(val)}
            />

            <AppInput
              placeholder="email"
              title="email"
              keyboardType={'email-address'}
              value={user?.email}
              onChangeText={val => setEmail(val)}
            />
            <AppInput
              placeholder="phone"
              title="phone"
              keyboardType={'phone-pad'}
              defaultValue={user?.phoneNumber}
              onChangeText={val => setPhoneNumber(val)}
            />
            <AppInput
              placeholder="address"
              title="address"
              defaultValue={user?.address}
              onChangeText={val => setAddress(val)}
            />
          </View>

          <View style={{margin: hp(1)}}>
            <AppButton
              // onPress={() => onPressUpdateButton()}
              disabled={true}
              title={'update'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ProfileScreen;
