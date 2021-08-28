import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';

function TextCard({
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
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.textContainer} onPress={onPress}>
      <View
        style={styles.leftIconView}
        onPress={
          onPressLeftIcon
            ? onPressLeftIcon
            : () => console.log('Left icon pressed.')
        }>
        <Icon
          name={leftIcon}
          size={leftIconSize ? leftIconSize : 25}
          color={leftIconColor ? leftIconColor : colors.tertiary}
        />
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
          {title ? title : 'title'}
        </Text>
      </View>
      <View
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    width: wp('100%'),
    height: hp('8.5%'),
    elevation: wp(1),
    borderWidth: wp(0.05),
    borderColor: colors.primary,
  },
  leftIconView: {
    marginLeft: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
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

export default TextCard;
