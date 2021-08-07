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

function DefaultTextCard({title, stylesTitleText, stylesContainer, onPress}) {
  return (
    <TouchableOpacity
      style={
        stylesContainer
          ? stylesContainer
          : {
              width: wp('80%'),
              height: hp('30%'),
              elevation: wp(1),
              borderWidth: wp(0.05),
              margin: wp(1),
              borderColor: colors.primary,
            }
      }
      onPress={onPress}>
      <View style={styles.titleView}>
        <Text
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleView: {
    flex: 0.3,
    paddingVertical: wp(1),
    paddingHorizontal: wp(1),
  },
});

export default DefaultTextCard;
