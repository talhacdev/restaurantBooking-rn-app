import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import AppButton from '../components/Button';
import AppURLText from '../components/URLText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function WelcomeScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
        {/* <View style={styles.buttonContainer}>
          <AppButton
            title="sign up with facebook"
            onPress={() =>
              onFacebookButtonPress().then(res => ProceedWithSocialUser(res))
            }
          />
        </View> */}

        {/* <View style={styles.buttonContainer}>
          <AppButton
            title="sign up with google"
            onPress={() =>
              onGoogleButtonPress()
                .then(res => ProceedWithSocialUser(res))
                .catch(error => {
                  alert(error);
                })
            }
          />
        </View> */}

        {/* <AppButton
          title="sign up with twitter"
          onPress={() =>
            onTwitterButtonPress()
              .then(() => console.log('Signed in with Twitter!'))
              .catch(error => {
                console.log(error);
              })
          }
        /> */}

        {/* <AppButton
          title="sign up with phone"
          onPress={() => navigation.navigate(routes.PHONE_NUMBER)}
        /> */}

        <View style={styles.buttonContainer}>
          <AppButton
            title="register"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </View>

        {/* <View style={styles.buttonContainer}>
          <AppButton title="demo" onPress={() => onPressDemoButton()} />
        </View> */}
      </View>

      <View style={styles.bottomViewContainer}>
        <AppURLText
          title={'Already have an account?'}
          onPress={() => navigation.navigate(routes.LOGIN)}
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
    marginTop: hp(5),
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
  },
  lowerViewContainer: {
    flex: 0.8,
    paddingVertical: hp(1),
    marginVertical: hp(1),
    justifyContent: 'flex-end',
  },
  bottomViewContainer: {
    paddingVertical: hp(1),
    marginVertical: hp(1),
  },
});

export default WelcomeScreen;

// facebook hash key
// keytool -exportcert -alias androiddebugkey -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\debug.keystore | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// Production.jks
// keytool -exportcert -alias Production.jks -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\Production.jks | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// google sha-1 key
// keytool -list -v -keystore C:\Users\Dell XPS\Downloads\Github\commerce\android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android
