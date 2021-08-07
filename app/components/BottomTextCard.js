import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';

function BottomTextCard({
  title,
  leftTitle,
  stylesLeftTitleText,
  rightTitle,
  stylesRightTitleText,
  stylesTitleText,
  stylesContainer,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={
        stylesContainer
          ? stylesContainer
          : {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.primary,
              width: wp('100%'),
              height: hp('8.5%'),
              elevation: wp(1),
              borderWidth: wp(0.05),
              borderColor: colors.primary,
            }
      }
      onPress={onPress}>
      <View style={styles.titleView}>
        <Text
          style={
            stylesLeftTitleText
              ? stylesLeftTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {leftTitle}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {title}
        </Text>
      </View>
      <View style={styles.titleView}>
        <Text
          style={
            stylesRightTitleText
              ? stylesRightTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(5),
                }
          }>
          {rightTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stylesLeftTitleText: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
  titleView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
  stylesRightTitleText: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
});

export default BottomTextCard;
