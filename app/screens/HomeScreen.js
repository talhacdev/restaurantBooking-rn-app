import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          // padding: 50,
          width: wp(100),
        }}>
        {/* <Text style={{fontSize: 30}}>{item.title}</Text>
        <Text>{item.text}</Text> */}
        <Image
          style={{
            width: wp(100),
            height: wp(50),
          }}
          source={require('../assets/restaurant.jpg')}
        />
      </View>
    );
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    axios
      .get('http://192.168.18.203:3001/user/get-restaurants')
      .then(response => {
        console.log('DEBUG getRestaurants: ', response.data.data);
        storeData(response.data.data);
        setRestaurants(response.data.data);
      })
      .catch(error => {
        console.log('DEBUG getRestaurants ERROR: ', error);
      });
  };

  const storeData = async value => {
    console.log('DEBUG homeScreen @Restaurants: ', value);
    try {
      await AsyncStorage.setItem('@Restaurants', JSON.stringify(value));
    } catch (e) {
      console.log('\nError Storing Data\n', e);
    }
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
