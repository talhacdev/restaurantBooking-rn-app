import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import AppInput from '../components/Input';
import AppButton from '../components/Button';
import RestaurantCard from '../components/RestaurantCard';
import hardcodeCart from '../hardcode/hardcodeCart';

function SearchScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState();
  const [restaurants, setRestaurants] = useState();
  const [searchedProducts, setSearchedProducts] = useState();
  const [searchedRestaurants, setSearchedRestaurants] = useState();

  useEffect(() => {
    // toggleModal();
    // setLoading(true);
    // fetchRestaurants();
    // fetchProducts();

    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    axios
      .get('http://192.168.18.234:3001/user/get-restaurants')
      .then(response => {
        console.log('DEBUG searchScreen getRestaurants: ', response.data.data);
        setRestaurants(response.data.data);
      })
      .catch(error => {
        console.log('ERROR: searchScreen getRestaurants: ', error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitHandler = val => {
    console.log(val);

    if (val) {
      let searchFilterRestaurants = restaurants?.filter(m =>
        m?.restaurantName?.toLowerCase().includes(val?.toLowerCase()),
      );

      setSearchedRestaurants(searchFilterRestaurants);
    } else {
      setSearchedRestaurants(restaurants);
    }
  };

  const onAddToCart = item => {
    console.log('item: ', item);
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
        <AppHeader title={'search'} />
      </View> */}
      {!loading ? (
        <View style={{flex: 1}}>
          <View style={styles.contentViewContainer}>
            <View style={styles.searchViewContainer}>
              <AppInput
                placeholder="restaurant name"
                title="search"
                returnKeyType="search"
                style={styles.textInput}
                onChangeText={val => submitHandler(val)}
              />
            </View>

            {/* <View style={styles.buttonViewContainer}>
              <AppButton
                onPress={() => setToggle(false)}
                widthContainer={wp(50)}
                backgroundColorContainer={
                  !toggle ? colors.buttonColor : colors.secondary
                }
                buttonTextContainer={
                  !toggle ? colors.buttonTextColor : colors.buttonTextColor
                }
                title={'restaurant'}
              />
              <AppButton
                onPress={() => setToggle(true)}
                widthContainer={wp(50)}
                backgroundColorContainer={
                  toggle ? colors.buttonColor : colors.secondary
                }
                buttonTextContainer={
                  toggle ? colors.buttonTextColor : colors.buttonTextColor
                }
                title={'product'}
              />
            </View> */}

            {!toggle ? (
              <View style={styles.upperViewContainer}>
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={searchedRestaurants || restaurants}
                  keyExtractor={restaurants => restaurants.id}
                  renderItem={({item}) => (
                    <View
                      style={{
                        margin: wp(1),
                        elevation: wp(2),

                        // backgroundColor: 'purple',
                      }}>
                      <RestaurantCard
                        restaurantName={item?.restaurantName}
                        location={item?.address}
                        rating={item?.rating}
                        category={item?.category}
                        tables={item?.tables}
                        reviews={item?.reviews}
                        contact={item?.contact}
                        imageUrl={item?.imageUrl}
                        onPress={() =>
                          navigation.navigate(routes.RESTAURANT_DETAIL, item)
                        }
                      />
                    </View>
                  )}
                />
              </View>
            ) : null}

            {toggle ? (
              <View style={styles.upperViewContainer}>
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={searchedProducts || products}
                  keyExtractor={products => products.id}
                  renderItem={({item}) => (
                    <ProductCard
                      itemName={item?._data.itemName}
                      discountedPrice={item?._data.discountedPrice}
                      rating={item?._data?.rating}
                      restaurantName={item?._data?.restaurantName}
                      price={item?._data?.price}
                      imageUrl={item?._data?.imageUrl}
                      onPress={() =>
                        navigation.navigate(routes.PRODUCT_DETAIL, item?._data)
                      }
                      onBottomButtonPress={() => onAddToCart(item?._data)}
                    />
                  )}
                />
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    marginBottom: hp(12),
    marginTop: hp(5),
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
  },
  upperViewContainer: {
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: wp('100%'),
    height: hp('5%'),
    elevation: wp(1),
  },
  dividerText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(4.5),
    textTransform: 'uppercase',
  },

  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
