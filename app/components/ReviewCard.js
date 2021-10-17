import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function ReviewCard({user, comment, imageUrl, onPressImage, disabled}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={disabled} onPress={onPressImage}>
        <Image
          style={{
            width: wp(15),
            height: wp(15),
            borderRadius: wp(7.5),
          }}
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text numberOfLines={1} style={styles.userText}>
              {user}
            </Text>
          </View>
        </View>
        <View style={styles.userCommentContaine}>
          <Text
            // numberOfLines={1}
            style={styles.commentText}>
            {comment}
          </Text>
        </View>
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
  usernameContainer: {
    // backgroundColor: 'pink',
    marginRight: wp(10),
  },
  userCommentContaine: {
    // backgroundColor: 'pink',
    marginRight: wp(10),
  },
});

export default ReviewCard;
