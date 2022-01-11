('use strict');
import React, {useState} from 'react';
import {
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import colors from '../config/colors';

function CameraScreen(props) {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const getRestaurants = async () => {
    setLoading(true);
    toggleModal();
    axios
      .get('http://192.168.18.203:3001/user/get-restaurants')
      .then(response => {
        toggleModal();
        setLoading(false);
        console.log('RESPONSE: getRestaurants: ', response.data.data);
        // setRestaurants(response.data.data);
        navigation.navigate(routes.RESTAURANT_DETAIL, item);
      })
      .catch(error => {
        toggleModal();
        setLoading(false);
        console.log('ERROR: getRestaurants: ', error);
      });
  };

  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );

    getRestaurants();
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

      {!loading ? (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={styles.centerText}>
              Go to{' '}
              <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
              your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default CameraScreen;
