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
  editable,
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
  value = {},
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={1}
          style={
            stylesTitleText
              ? stylesTitleText
              : {
                  fontWeight: 'bold',
                  color: colors.tertiary,
                  fontSize: wp(3.5),
                  textTransform: 'uppercase',
                }
          }>
          {title ? title : 'title'}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          placeholderTextColor={placeholderTextColor}
          editable={editable ? editable : true}
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
    width: wp(85),
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
    backgroundColor: colors.primary,
  },
  textInputContainer: {
    width: wp(55),
    height: hp(5),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: wp(1.5),
  },
});

export default Input;
