import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AppInput from '../components/Input';
import AppHeader from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import AppButton from '../components/Button';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import colors from '../config/colors';

function RestaurantDetailScreen(props) {
  const [comment, setComment] = useState();
  const [listing, setListing] = useState(props.route.params);

  const onPressPostButton = val => {
    console.log(comment);
    fetchUserRecords();
  };

  const fetchUserRecords = async () => {
    await firestore()
      .collection('UserRecords')
      .doc(auth()._user.uid)
      .get()
      .then(res => {
        updateComments(res._data);
      })
      .catch(error => alert(error));
  };

  const updateComments = async user => {
    let comments = [];
    if (listing.reviews) {
      comments = [
        ...listing.reviews,
        {
          comment,
          user,
          id: Date.now(),
        },
      ];
    } else {
      comments = [
        {
          comment,
          user,
          id: Date.now(),
        },
      ];
    }
    let obj = {
      reviews: comments,
    };
    console.log('obj: ', obj);
    firestore()
      .collection('Restaurants')
      .doc(listing.id)
      .update(obj)
      .then(() => {
        fetchRestaurants();
      })
      .catch(err => {
        alert(err);
      });
  };

  const fetchRestaurants = async () => {
    await firestore()
      .collection('Restaurants')
      .doc(listing.id)
      .get()
      .then(res => {
        setListing(res._data);
      })
      .catch(error => alert(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title="detail" />
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentViewContainer}>
          <View style={styles.upperViewContainer}>
            <Image
              style={{
                width: wp(100),
                height: wp(100),
              }}
              source={{
                uri: listing.imageUrl,
              }}
            />
          </View>

          <View style={styles.lowerViewContainer}>
            <Text style={styles.productNameText}>{listing.restaurantName}</Text>
            <Text style={styles.companyNameText}>{listing.location}</Text>
            <View style={{marginVertical: wp(2)}}>
              <Text style={styles.unitText}>{listing.category}</Text>
            </View>
            <View>
              <Text style={styles.unitText}>{listing.contact}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View>
                <Image
                  style={{
                    width: wp(7),
                    height: wp(7),
                    padding: wp(1),
                  }}
                  source={require('../assets/star.png')}
                />
              </View>
              <View>
                <Text style={styles.ratingText}>{listing.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.commentsContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listing.reviews}
              keyExtractor={data => data.id.toString()}
              renderItem={({item}) => (
                <View>
                  <ReviewCard
                    disabled={auth()._user.uid === item.user.uid}
                    user={item?.user?.displayName}
                    comment={item?.comment}
                    imageUrl={item?.user.photoURL}
                    onPressImage={() => {
                      navigation.navigate(routes.CHAT, item);
                    }}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.buttonViewContainer}>
            <View style={styles.commentContainer}>
              <AppInput
                multiline
                maxLength={256}
                title={'comment'}
                onChangeText={val => setComment(val)}
              />
              <AppButton onPress={() => onPressPostButton()} title={'post'} />
            </View>
            <AppButton
              onPress={() => navigation.navigate(routes.BOOK_NOW, listing)}
              title={'book'}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  headerViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: hp(0),
  },
  contentViewContainer: {
    flex: 0.8,
    top: hp(8.5),
    marginBottom: hp(8.5),
  },
  upperViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    justifyContent: 'center',
    margin: wp(1),
    padding: wp(1),
  },
  productNameText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(7),
  },
  companyNameText: {
    color: colors.tertiary,
    fontSize: wp(5.5),
  },
  unitText: {
    color: colors.tertiary,
    fontSize: wp(6),
  },
  priceText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(6.5),
  },
  descriptionText: {
    color: colors.tertiary,
    fontSize: wp(5),
  },
  buttonViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.ratingText,
    paddingHorizontal: wp(1),
    fontWeight: 'bold',
    fontSize: wp(6.5),
  },
  commentsContainer: {
    paddingLeft: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
});

export default RestaurantDetailScreen;
