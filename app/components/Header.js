import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';

function Header({
  title,
  leftIcon,
  leftIconColor,
  leftIconSize,
  onPressLeftIcon,
  rightIcon,
  rightIconColor,
  rightIconSize,
  onPressRightIcon,
  stylesTitleText,
}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.leftIconView}
        onPress={
          onPressLeftIcon
            ? onPressLeftIcon
            : () => console.log('Left icon pressed.')
        }>
        <Icon
          name={leftIcon}
          size={leftIconSize ? leftIconSize : 30}
          color={leftIconColor ? leftIconColor : colors.tertiary}
        />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(6),
                  textTransform: 'uppercase',
                }
          }>
          {title ? title : 'title'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.rightIconView}
        onPress={
          onPressRightIcon
            ? onPressRightIcon
            : () => console.log('Right icon pressed.')
        }>
        <Icon
          name={rightIcon}
          size={rightIconSize ? rightIconSize : 30}
          color={rightIconColor ? rightIconColor : colors.tertiary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: wp('100%'),
    height: hp('8.5%'),
    elevation: wp(1),
  },
  leftIconView: {
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
  rightIconView: {
    flex: 0.15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: wp(5),
    paddingHorizontal: wp(1),
  },
});

export default Header;
