import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';

function URLText({title, stylesUrlText, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => console.log('URL text pressed.')}
      style={styles.urlContainer}>
      <Text
        style={
          stylesUrlText
            ? stylesUrlText
            : {
                fontWeight: 'bold',
                color: colors.hyperlinkTextColor,
                fontSize: wp(4),
                fontStyle: 'italic',
              }
        }>
        {title ? title : 'title'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  urlContainer: {
    padding: wp(1),
  },
});

export default URLText;
