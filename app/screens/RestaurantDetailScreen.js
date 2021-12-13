import React, {useEffect, useState} from 'react';
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
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';

import AppButton from '../components/Button';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import colors from '../config/colors';
import VerticalProductCard from '../components/VerticalProductCard';
import hardcodeCart from '../hardcode/hardcodeCart';

function RestaurantDetailScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState();
  const [listing, setListing] = useState(props.route.params);
  const [menu, setMenu] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    console.log('DEBUG item.id: ', listing.account);
    let restId = listing.id;

    axios
      .get(`http://magicmeal.herokuapp.com/user/get-restaurant-menu/${restId}`)
      .then(response => {
        console.log('DEBUG getMenu: ', response);
        setMenu(response.data.data.items);
      })
      .catch(error => {
        console.log('DEBUG getMenu ERROR: ', error);
      });
  };

  const onAddToCart = item => {
    console.log('DEBUG item: ', item);
    let obj = {
      ...item,
      quantity: 1,
    };
    console.log('DEBUG obj: ', obj);
    hardcodeCart.checkAlreadyAdded(obj);
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

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentViewContainer}>
          <View style={styles.upperViewContainer}>
            {/* <Image
              style={{
                width: wp(100),
                height: wp(100),
              }}
              source={{
                uri: listing?.imageUrl,
              }}
            /> */}
            <Image
              style={{
                width: wp(100),
                height: wp(100),
                padding: wp(1),
              }}
              source={require('../assets/restaurant.jpg')}
            />
          </View>

          <View style={styles.lowerViewContainer}>
            <Text style={styles.productNameText}>{listing.restaurantName}</Text>
            <Text style={styles.companyNameText}>{listing.address}</Text>
            <View style={{marginVertical: wp(2)}}>
              <Text style={styles.unitText}>{listing.category}</Text>
            </View>
            <View>
              <Text style={styles.unitText}>{listing.contact}</Text>
            </View>
          </View>

          <View style={styles.buttonViewContainer}>
            <AppButton
              onPress={() => navigation.navigate(routes.BOOK_NOW, listing)}
              title={'book'}
            />
          </View>
          {menu.length >= 1 ? (
            <View>
              <View style={styles.dividerView}>
                <Text style={styles.dividerText}>products</Text>
              </View>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={menu}
                keyExtractor={menu => menu.id}
                renderItem={({item}) => (
                  <VerticalProductCard
                    itemName={item?.itemName}
                    discountedPrice={item?.discountedPrice}
                    rating={item?.rating}
                    description={item?.description}
                    price={item?.price}
                    imageUrl={item?.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.PRODUCT_DETAIL, item)
                    }
                    onBottomButtonPress={() => onAddToCart(item)}
                  />
                )}
              />
            </View>
          ) : null}
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
  dividerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dividerColor,
    width: wp('100%'),
    height: hp('5%'),
    elevation: wp(1),
  },
  dividerText: {
    fontWeight: 'bold',
    color: colors.buttonTextColor,
    fontSize: wp(4.5),
    textTransform: 'uppercase',
  },
});

export default RestaurantDetailScreen;
