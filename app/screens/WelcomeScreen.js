import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

  GoogleSignin.configure({
    webClientId:
      '816484953382-pr6gfesipg0slt2nh2r93e99rkscvhg7.apps.googleusercontent.com',
  });

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    console.log(result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const ProceedWithSocialUser = res => {
    firestore()
      .collection('UserRecords')
      // Filter results
      .where('uid', '==', res.user._user.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot._docs.length == 0) {
          CreateUserRecord(res);
        } else {
          // login user
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const CreateUserRecord = res => {
    let obj = {
      email: res.user._user.email,
      uid: res.user._user.uid,
      displayName: res.user._user.displayName,
      photoURL: res.user._user.photoURL,
      phoneNumber: res.user._user.phoneNumber,
      ChatThreads: [],
    };
    firestore()
      .collection('UserRecords')
      .doc(obj.uid)
      .set(obj)
      .then(() => {
        console.log('User added!');
        setLoading(false);
        toggleModal();
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        toggleModal();
        alert(error);
      });
  };

  onPressDemoButton = () => {
    toggleModal();
    setLoading(true);
    auth()
      .signInAnonymously()
      .then(res => {
        CreateUserRecord(res);
        console.log('User signed in anonymously');
        // alert('User signed in anonymously');
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        toggleModal();
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
        <View style={styles.buttonContainer}>
          <AppButton
            title="sign up with facebook"
            onPress={() =>
              onFacebookButtonPress().then(res => ProceedWithSocialUser(res))
            }
          />
        </View>

        <View style={styles.buttonContainer}>
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
        </View>

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

        <View style={styles.buttonContainer}>
          <AppButton title="demo" onPress={() => onPressDemoButton()} />
        </View>
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
    backgroundColor: colors.background,
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
  bottomViewContainer: {
    paddingVertical: hp(1),
    marginVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: hp(1),
  },
});

export default WelcomeScreen;

// facebook hash key
// keytool -exportcert -alias androiddebugkey -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\debug.keystore | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// Production.jks
// keytool -exportcert -alias Production.jks -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\Production.jks | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// google sha-1 key
// keytool -list -v -keystore C:\Users\Dell XPS\Downloads\Github\commerce\android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android
