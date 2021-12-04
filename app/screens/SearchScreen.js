import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

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
    toggleModal();
    setLoading(true);
    fetchRestaurants();
    fetchProducts();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchRestaurants = async () => {
    await firestore()
      .collection('Restaurants')
      .get()
      .then(res => {
        setRestaurants(res._docs);
      })
      .catch(error => alert(error));
  };

  const fetchProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(res => {
        setProducts(res._docs);
        setLoading(false);
        toggleModal();
      })
      .catch(error => alert(error));
  };

  const submitHandler = val => {
    console.log(val);
    // Keyboard.dismiss();
    if (val) {
      let searchFilterProducts = products.filter(m =>
        m._data.itemName.toLowerCase().includes(val.toLowerCase()),
      );
      let searchFilterRestaurants = restaurants.filter(m =>
        m._data.restaurantName.toLowerCase().includes(val.toLowerCase()),
      );

      setSearchedProducts(searchFilterProducts);
      setSearchedRestaurants(searchFilterRestaurants);
    } else {
      setSearchedProducts(products);
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
                placeholder="product name"
                title="search"
                returnKeyType="search"
                style={styles.textInput}
                onChangeText={val => submitHandler(val)}
              />
            </View>
            <View style={styles.buttonViewContainer}>
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
            </View>

            {!toggle ? (
              <View style={styles.upperViewContainer}>
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={searchedRestaurants || restaurants}
                  keyExtractor={restaurants => restaurants.id}
                  renderItem={({item}) => (
                    <RestaurantCard
                      restaurantName={item._data.restaurantName}
                      location={item._data.location}
                      rating={item._data.rating}
                      category={item._data.category}
                      tables={item._data.tables}
                      reviews={item._data.reviews}
                      contact={item._data.contact}
                      imageUrl={item._data.imageUrl}
                      onPress={() =>
                        navigation.navigate(
                          routes.RESTAURANT_DETAIL,
                          item._data,
                        )
                      }
                    />
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
                      itemName={item._data.itemName}
                      discountedPrice={item._data.discountedPrice}
                      rating={item._data.rating}
                      restaurantName={item._data.restaurantName}
                      price={item._data.price}
                      imageUrl={item._data.imageUrl}
                      onPress={() =>
                        navigation.navigate(routes.PRODUCT_DETAIL, item._data)
                      }
                      onBottomButtonPress={() => onAddToCart(item._data)}
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
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    top: hp(0),
  },
  upperViewContainer: {},
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
  lowerViewContainer: {},
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchViewContainer: {
    margin: wp(5),
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
