import React from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CategoryCard from '../components/CategoryCard';
import VerticalProductCard from '../components/VerticalProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function HomeScreen(props) {
  const data = [
    {
      id: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
    {
      id: '1',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
    {
      id: '2',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
    {
      id: '3',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
    {
      id: '4',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
    {
      id: '5',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: 'reviews',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title="commerce" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <View style={styles.wrapper}>
                <CategoryCard
                  title={item.title}
                  onPress={() => navigation.navigate(routes.PRODUCT, item)}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.dividerView}>
          <Text style={styles.dividerText}>Suggested</Text>
        </View>
        <View style={styles.lowerViewContainer}>
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <View style={styles.wrapper}>
                <VerticalProductCard
                  itemName={item.itemName}
                  discountedPrice={item.discountedPrice}
                  rating={item.rating}
                  restaurantName={item.restaurantName}
                  price={item.price}
                  onPress={() =>
                    navigation.navigate(routes.PRODUCT_DETAIL, item)
                  }
                />
              </View>
            )}
          />
        </View>
        <View style={styles.dividerView}>
          <Text style={styles.dividerText}>Trending</Text>
        </View>
        <View style={styles.lowerViewContainer}>
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <View style={styles.wrapper}>
                <VerticalProductCard
                  itemName={item.itemName}
                  discountedPrice={item.discountedPrice}
                  rating={item.rating}
                  restaurantName={item.restaurantName}
                  price={item.price}
                  onPress={() =>
                    navigation.navigate(routes.PRODUCT_DETAIL, item)
                  }
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
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
