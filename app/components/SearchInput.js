import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function SearchInput({
  title,
  placeholder,
  placeholderTextColor,
  multiline,
  maxLength,
  numberOfLines,
  defaultValue,
  secureTextEntry,
  textContentType,
  keyboardAppearance,
  keyboardType,
  returnKeyType,
  onChangeText,
  stylesTitleText,
  stylesInputText,
  bookingScreen,
  value = {},
}) {
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          width: bookingScreen ? wp(33) : wp(30),
          height: hp(5),
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: wp(5),
          backgroundColor: colors.buttonColor,
        }}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.buttonTextColor,
                  fontSize: wp(3.3),
                  textTransform: 'uppercase',
                }
          }>
          {title ? title : 'title'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: wp(100),
    height: hp(5),
    elevation: wp(1),
    borderRadius: wp(1),
    margin: wp(1),
  },

  textInputContainer: {
    width: wp(55),
    height: hp(5),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: wp(1.5),
  },
});

export default SearchInput;
