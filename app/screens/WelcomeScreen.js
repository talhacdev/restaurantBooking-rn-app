import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

// secondary implementation
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import AppButton from '../components/Button';
import AppURLText from '../components/URLText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import {NativeModules} from 'react-native';
const {RNTwitterSignIn} = NativeModules;

function WelcomeScreen(props) {
  const [userInfo, setUserInfo] = useState();

  GoogleSignin.configure({
    webClientId:
      '816484953382-pr6gfesipg0slt2nh2r93e99rkscvhg7.apps.googleusercontent.com',
  });

  RNTwitterSignIn.init('TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET').then(
    () => console.log('Twitter SDK initialized'),
  );

  // secondary implementation

  // getInfoFromToken = token => {
  //   const PROFILE_REQUEST_PARAMS = {
  //     fields: {
  //       string: 'id,name,first_name,last_name',
  //     },
  //   };
  //   const profileRequest = new GraphRequest(
  //     '/me',
  //     {token, parameters: PROFILE_REQUEST_PARAMS},
  //     (error, user) => {
  //       if (error) {
  //         console.log('login info has error: ' + error);
  //       } else {
  //         setUserInfo(user);
  //         console.log('result:', user);
  //       }
  //     },
  //   );
  //   new GraphRequestManager().addRequest(profileRequest).start();
  // };

  // loginWithFacebook = () => {
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithPermissions(['public_profile']).then(
  //     login => {
  //       if (login.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           const accessToken = data.accessToken.toString();
  //           this.getInfoFromToken(accessToken);
  //         });
  //       }
  //     },
  //     error => {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };

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

  async function onTwitterButtonPress() {
    // Perform the login request
    const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();

    // Create a Twitter credential with the tokens
    const twitterCredential = auth.TwitterAuthProvider.credential(
      authToken,
      authTokenSecret,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(twitterCredential);
  }

  onPressDemoButton = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperViewContainer}>
        <Image
          style={{
            width: wp(50),
            height: wp(50),
            margin: wp(5),
          }}
          source={require('../assets/snapchatLogoBlack.jpg')}
        />
      </View>
      <View style={styles.lowerViewContainer}>
        <AppButton
          title="sign up with facebook"
          onPress={() =>
            onFacebookButtonPress().then(() =>
              console.log('Signed in with Facebook!'),
            )
          }
        />
        <AppButton
          title="sign up with google"
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(error => {
                console.log(error);
              })
          }
        />
        <AppButton
          title="sign up with twitter"
          onPress={() =>
            onTwitterButtonPress()
              .then(() => console.log('Signed in with Twitter!'))
              .catch(error => {
                console.log(error);
              })
          }
        />
        <AppButton
          title="sign up with phone"
          onPress={() => navigation.navigate(routes.PHONE_NUMBER)}
        />
        <AppButton
          title="register"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
        <AppButton title="demo" onPress={() => onPressDemoButton()} />
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
  topViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: 0,
  },
  upperViewContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;

// facebook hash key
// keytool -exportcert -alias androiddebugkey -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\debug.keystore | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// Production.jks
// keytool -exportcert -alias Production.jks -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\Production.jks | C:\openssl-0.9.8k_X64\bin\openssl.exe sha1 -binary | C:\openssl-0.9.8k_X64\bin\openssl.exe base64

// google sha-1 key
// keytool -list -v -keystore C:\Users\GNG\Downloads\Github\commerce\android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android
