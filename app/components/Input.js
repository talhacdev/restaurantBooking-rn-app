import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function Input({
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
  disable,
  tablenumber,
  value = {},
}) {
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          width: tablenumber ? wp(35) : wp(30),
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
                  fontSize: wp(3),
                  textTransform: 'uppercase',
                }
          }>
          {title ? title : 'title'}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        {disable ? (
          <Text
            style={{
              width: wp(50),
              color: colors.tertiary,
              fontSize: wp(3.2),
            }}>
            {value}
          </Text>
        ) : (
          <TextInput
            placeholder={placeholder}
            value={value}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline ? true : false}
            maxLength={maxLength ? maxLength : 32}
            numberOfLines={numberOfLines ? numberOfLines : 1}
            onChangeText={onChangeText}
            defaultValue={defaultValue}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            keyboardAppearance={keyboardAppearance}
            textContentType={textContentType}
            keyboardType={keyboardType}
            style={
              stylesInputText
                ? stylesInputText
                : {
                    width: wp(50),
                    color: colors.tertiary,
                    fontSize: wp(3.2),
                  }
            }
          />
        )}
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
    width: wp(95),
    height: hp(5),
    elevation: wp(1),
    borderRadius: wp(1),
    margin: wp(1),
  },
  titleContainer: {
    width: wp(30),
    height: hp(5),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    backgroundColor: colors.buttonColor,
  },
  textInputContainer: {
    width: wp(90),
    height: hp(5),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: wp(1.5),
  },
});

export default Input;
