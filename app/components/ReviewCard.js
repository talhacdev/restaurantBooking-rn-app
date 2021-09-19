import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function ReviewCard({user, comment}) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: wp(15),
            height: wp(15),
            borderRadius: wp(7.5),
          }}
          source={require('../assets/user.jpg')}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.userContainer}>
          <Text numberOfLines={1} style={styles.userText}>
            {user}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.commentText}>
          {comment}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: wp(1),
    marginBottom: wp(1),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: wp(80),
    paddingLeft: wp(2),
    justifyContent: 'center',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userText: {
    fontSize: wp(4),
  },
  commentText: {
    fontSize: wp(3.5),
  },
});

export default ReviewCard;
