import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function OnboardingScreen(props) {
  return (
    <Onboarding
      onNext={() => console.log('done')}
      onSkip={() => navigation.navigate(routes.WELCOME)}
      onDone={() => navigation.navigate(routes.WELCOME)}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{
                width: wp(25),
                height: wp(25),
              }}
              source={require('../assets/snapchatLogoBlack.jpg')}
            />
          ),
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{
                width: wp(25),
                height: wp(25),
              }}
              source={require('../assets/snapchatLogoBlack.jpg')}
            />
          ),
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={{
                width: wp(25),
                height: wp(25),
              }}
              source={require('../assets/snapchatLogoBlack.jpg')}
            />
          ),
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});

export default OnboardingScreen;
