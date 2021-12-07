import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import colors from '../config/colors';
import CategoryCard from '../components/CategoryCard';
import VerticalProductCard from '../components/VerticalProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import RestaurantVerticalCard from '../components/RestaurantVerticalCard';
import hardcodeCart from '../hardcode/hardcodeCart';
import SearchInput from '../components/SearchInput';
import axios from 'axios';

function HomeScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [restaurants, setRestaurants] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   toggleModal();
  //   setLoading(true);
  //   fetchCategories();
  //   fetchRestaurants();
  //   fetchProducts();
  // }, []);

  const fetchCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(res => {
        setCategories(res._docs);
      })
      .catch(error => alert(error));
  };

  const fetchRestaurants = async () => {
    await firestore()
      .collection('Restaurants')
      .get()
      .then(res => {
        setRestaurants(res._docs);
        filterSuggestedRestaurants(res._docs);
      })
      .catch(error => alert(error));
  };

  const filterSuggestedRestaurants = restaurants => {
    let filteredList = restaurants.filter(m => m._data.sponsored == true);
    setFilteredRestaurants(filteredList);
  };

  const fetchProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(res => {
        setProducts(res._docs);
        filterSuggestedProducts(res._docs);
      })
      .catch(error => alert(error));
  };

  const filterSuggestedProducts = products => {
    let filteredList = products.filter(m => m._data.sponsored == true);
    setFilteredProducts(filteredList);
    setLoading(false);
    toggleModal();
  };

  const onPressCategoryCard = item => {
    console.log('onPress item: ', item.title.toLowerCase());
    let filteredList = products.filter(
      m => m._data.category == item.title.toLowerCase(),
    );
    console.log('filteredList: ', filteredList);

    navigation.navigate(routes.PRODUCT, {item, filteredList});
  };

  const onAddToCart = item => {
    console.log('item: ', item);
    hardcodeCart.checkAlreadyAdded(item);
  };

  useEffect(() => {
    // getRestaurants();
    // getMenu();
  }, []);

  const getRestaurants = async () => {
    axios
      .get('http://magicmeal.herokuapp.com/user/get-restaurants')
      .then(response => {
        console.log('DEBUG getRestaurants: ', response);
      })
      .catch(error => {
        console.log('DEBUG getRestaurants ERROR: ', error);
      });
  };

  const getMenu = async () => {
    let restId = '61956881a675b200167ff63f';
    axios
      .get(`http://magicmeal.herokuapp.com/user/get-restaurant-menu/${restId}`)
      .then(response => {
        console.log('DEBUG getMenu: ', response);
      })
      .catch(error => {
        console.log('DEBUG getMenu ERROR: ', error);
      });
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

      {!loading ? (
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate(routes.SEARCH)}>
            <SearchInput
              placeholder="product name"
              title="search"
              returnKeyType="search"
            />
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentViewContainer}>
            {/* <View style={styles.upperViewContainer}>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={categories}
                keyExtractor={categories => categories.id}
                renderItem={({item}) => (
                  <CategoryCard
                    title={item._data.title}
                    imageUrl={item._data.imageUrl}
                    onPress={() => onPressCategoryCard(item._data)}
                  />
                )}
              />
            </View> */}

            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>Top Rated restaurants</Text>
            </View>
            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={filteredRestaurants}
                keyExtractor={filteredRestaurants => filteredRestaurants.id}
                renderItem={({item}) => (
                  <RestaurantVerticalCard
                    restaurantName={item._data.restaurantName}
                    location={item._data.location}
                    rating={item._data.rating}
                    category={item._data.category}
                    tables={item._data.tables}
                    reviews={item._data.reviews}
                    contact={item._data.contact}
                    imageUrl={item._data.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.RESTAURANT_DETAIL, item._data)
                    }
                  />
                )}
              />
            </View>

            {/* <View style={styles.dividerView}>
              <Text style={styles.dividerText}>sponsored products</Text>
            </View>

            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={filteredProducts}
                keyExtractor={filteredProducts => filteredProducts.id}
                renderItem={({item}) => (
                  <VerticalProductCard
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
            </View> */}

            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>restaurants</Text>
            </View>
            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={restaurants}
                keyExtractor={restaurants => restaurants.id.toString()}
                renderItem={({item}) => (
                  <RestaurantVerticalCard
                    restaurantName={item._data.restaurantName}
                    location={item._data.location}
                    rating={item._data.rating}
                    category={item._data.category}
                    tables={item._data.tables}
                    reviews={item._data.reviews}
                    contact={item._data.contact}
                    imageUrl={item._data.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.RESTAURANT_DETAIL, item._data)
                    }
                  />
                )}
              />
            </View>

            {/* <View style={styles.dividerView}>
              <Text style={styles.dividerText}>products</Text>
            </View>

            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={products}
                keyExtractor={products => products.id}
                renderItem={({item}) => (
                  <VerticalProductCard
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
            </View> */}
          </ScrollView>
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
  contentViewContainer: {
    flex: 1,
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
  lowerViewContainer: {},
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
