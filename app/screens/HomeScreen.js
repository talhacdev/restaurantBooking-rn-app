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
import Carousel from 'react-native-snap-carousel';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ]);

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 200,
          padding: 50,
          width: wp(95),
        }}>
        <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };
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
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    axios
      .get('http://magicmeal.herokuapp.com/user/get-restaurants')
      .then(response => {
        console.log('DEBUG getRestaurants: ', response.data.data);
        setRestaurants(response.data.data);
      })
      .catch(error => {
        console.log('DEBUG getRestaurants ERROR: ', error);
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

            {/* <View style={styles.dividerView}>
              <Text style={styles.dividerText}>Top Rated restaurants</Text>
            </View> */}
            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={filteredRestaurants}
                keyExtractor={filteredRestaurants => filteredRestaurants.id}
                renderItem={({item}) => (
                  <RestaurantVerticalCard
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
            <View
              style={{
                backgroundColor: colors.cardColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Carousel
                layout={'default'}
                // ref={ref => (carousel = ref)}
                data={carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem={index => setActiveIndex(index)}
              />
            </View>
            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>restaurants</Text>
            </View>
            <View style={styles.lowerViewContainer}>
              <FlatList
                // horizontal
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={restaurants}
                keyExtractor={restaurants => restaurants.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      margin: wp(5),
                      elevation: wp(2),
                      // backgroundColor: 'purple',
                    }}>
                    <RestaurantVerticalCard
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
  lowerViewContainer: {
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
