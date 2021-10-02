import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CategoryCard from '../components/CategoryCard';
import VerticalProductCard from '../components/VerticalProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import RestaurantVerticalCard from '../components/RestaurantVerticalCard';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

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

  useEffect(() => {
    toggleModal();
    setLoading(true);
    fetchCategories();
    fetchRestaurants();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(res => {
        setCategories(res._docs[0]._data.categories);
        console.log('categories: ', res._docs[0]._data.categories);
      })
      .catch(error => alert(error));
  };

  const fetchRestaurants = async () => {
    await firestore()
      .collection('Restaurants')
      .get()
      .then(res => {
        setRestaurants(res._docs[0]._data.restaurants);
        console.log('Restaurants: ', res._docs[0]._data.restaurants);
        filterSuggestedRestaurants(res._docs[0]._data.restaurants);
      })
      .catch(error => alert(error));
  };

  const filterSuggestedRestaurants = restaurants => {
    let filteredList = restaurants.filter(m => m.sponsored == true);
    setFilteredRestaurants(filteredList);
  };

  const fetchProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(res => {
        setProducts(res._docs[0]._data.products);
        console.log('products: ', res._docs[0]._data.products);
        filterSuggestedProducts(res._docs[0]._data.products);
      })
      .catch(error => alert(error));
  };

  const filterSuggestedProducts = products => {
    let filteredList = products.filter(m => m.sponsored == true);
    setFilteredProducts(filteredList);
    setLoading(false);
    toggleModal();
  };

  const onPressCategoryCard = item => {
    console.log('onPress item: ', item.title.toLowerCase());
    let filteredList = products.filter(
      m => m.category[0].toLowerCase() == item.title.toLowerCase(),
    );
    console.log('filteredList: ', filteredList);
    navigation.navigate(routes.PRODUCT, {item, filteredList});
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
      <View style={styles.headerViewContainer}>
        <AppHeader title="commerce" />
      </View>
      {!loading ? (
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentViewContainer}>
            <View style={styles.upperViewContainer}>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={categories}
                keyExtractor={categories => categories.id.toString()}
                renderItem={({item}) => (
                  <CategoryCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                    onPress={() => onPressCategoryCard(item)}
                  />
                )}
              />
            </View>

            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>sponsored restaurants</Text>
            </View>
            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={filteredRestaurants}
                keyExtractor={filteredRestaurants =>
                  filteredRestaurants.id.toString()
                }
                renderItem={({item}) => (
                  <RestaurantVerticalCard
                    restaurantName={item.restaurantName}
                    location={item.location}
                    rating={item.rating}
                    category={item.category}
                    tables={item.tables}
                    reviews={item.reviews}
                    contact={item.contact}
                    imageUrl={item.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.RESTAURANT_DETAIL, item)
                    }
                  />
                )}
              />
            </View>

            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>sponsored products</Text>
            </View>

            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={filteredProducts}
                keyExtractor={filteredProducts =>
                  filteredProducts.id.toString()
                }
                renderItem={({item}) => (
                  <VerticalProductCard
                    itemName={item.itemName}
                    discountedPrice={item.discountedPrice}
                    rating={item.rating}
                    restaurantName={item.restaurantName}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.PRODUCT_DETAIL, item)
                    }
                  />
                )}
              />
            </View>

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
                    restaurantName={item.restaurantName}
                    location={item.location}
                    rating={item.rating}
                    category={item.category}
                    tables={item.tables}
                    reviews={item.reviews}
                    contact={item.contact}
                    imageUrl={item.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.RESTAURANT_DETAIL, item)
                    }
                  />
                )}
              />
            </View>

            <View style={styles.dividerView}>
              <Text style={styles.dividerText}>products</Text>
            </View>

            <View style={styles.lowerViewContainer}>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={products}
                keyExtractor={products => products.id.toString()}
                renderItem={({item}) => (
                  <VerticalProductCard
                    itemName={item.itemName}
                    discountedPrice={item.discountedPrice}
                    rating={item.rating}
                    restaurantName={item.restaurantName}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onPress={() =>
                      navigation.navigate(routes.PRODUCT_DETAIL, item)
                    }
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
});

export default HomeScreen;
