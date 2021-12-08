import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// const _ = require('lodash');
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import AppInput from '../components/Input';
import AppButton from '../components/Button';
import AppHeader from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import colors from '../config/colors';
import hardcodeCart from '../hardcode/hardcodeCart';

function ProductDetailScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState();
  const [listing, setListing] = useState(props.route.params);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressPostButton = () => {
    toggleModal();
    setLoading(true);
    console.log(comment);
    fetchUserRecords();
  };

  const fetchUserRecords = async () => {
    await firestore()
      .collection('UserRecords')
      .doc(auth()._user.uid)
      .get()
      .then(res => {
        console.log(res);
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
      .collection('Products')
      .doc(listing.id)
      .update(obj)
      .then(() => {
        fetchProducts();
      })
      .catch(err => {
        alert(err);
      });
  };

  const fetchProducts = async () => {
    await firestore()
      .collection('Products')
      .doc(listing.id)
      .get()
      .then(res => {
        setListing(res._data);
        setLoading(false);
        toggleModal();
      })
      .catch(error => alert(error));
  };

  const onAddToCart = item => {
    hardcodeCart.checkAlreadyAdded(item);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Modal
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          isVisible={isModalVisible}>
          <View
            style={{
              position: 'absolute',
              padding: wp(5),
              borderRadius: wp(10),
              backgroundColor: 'black',
            }}>
            <UIActivityIndicator color="white" />
          </View>
        </Modal>
      ) : null}
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title="detail" />
      </View> */}

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
            <Text style={styles.productNameText}>{listing.itemName}</Text>
            {/* <Text style={styles.companyNameText}>{listing.restaurantName}</Text> */}
            <View style={{marginVertical: wp(2)}}>
              <Text style={styles.unitText}>{listing.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {/* <View>
                <Image
                  style={{
                    width: wp(7),
                    height: wp(7),
                    padding: wp(1),
                  }}
                  source={require('../assets/star.png')}
                />
              </View> */}
              <View>
                {/* <Text style={styles.ratingText}>{listing.rating}</Text> */}
              </View>
            </View>
            <Text style={styles.priceText}>{listing.price}</Text>
            {/* <Text style={styles.discountedText}>{listing.discountedPrice}</Text> */}
            <View style={{marginVertical: wp(2), height: wp(12)}}>
              <Text numberOfLines={2} style={styles.descriptionText}>
                {listing.description}
              </Text>
            </View>
            {/* <View>
              <FlatList
                // inverted
                showsVerticalScrollIndicator={false}
                data={listing.reviews}
                keyExtractor={data => data.id}
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
            </View> */}
          </View>
          <View style={styles.buttonViewContainer}>
            {/* <View style={styles.commentContainer}>
              <AppInput
                multiline
                maxLength={256}
                title={'comment'}
                onChangeText={val => setComment(val)}
              />
              <AppButton onPress={() => onPressPostButton()} title={'post'} />
            </View> */}
            <AppButton
              title={'add to cart'}
              onPress={() => onAddToCart(listing)}
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
    backgroundColor: colors.backgroundColor,
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
    // marginBottom: hp(8.5),
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
    color: colors.priceText,
    fontSize: wp(6.5),
  },
  discountedText: {
    color: colors.discountedPriceText,
    fontWeight: 'bold',
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
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
});

export default ProductDetailScreen;
