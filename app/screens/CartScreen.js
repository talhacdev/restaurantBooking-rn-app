import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';
import Button from '../components/Button';

function CartScreen(props) {
  // {
  //   id: '1',
  //   title: 'five',
  //   productName: 'productName',
  //   companyName: 'companyName',
  //   price: 'price',
  //   quantity: 'quantity',
  //   unit: 'unit',
  //   description: 'description',
  //   status: 'status',
  //   orderTime: 'orderTime',
  //   total: 'total',
  //   address: 'address',
  // },

  const data = [
    {
      id: '0',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },

    {
      id: '1',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '2',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '3',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '4',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '5',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '6',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
    {
      id: '7',
      unit: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      category: 'category',
      description: 'description',
      reviews: [
        {
          id: '0',
          user: 'user1',
          comment: 'this is user1 comment.',
        },
        {
          id: '1',
          user: 'user2',
          comment: 'this is user2 comment.',
        },
      ],
    },
  ];

  let totalQuantity = 0;
  let totalPrice = 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'cart'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <CartProductCard
                productName={item.itemName}
                restaurantName={item.restaurantName}
                price={item.price}
                discountedPrice={item.discountedPrice}
                quantity={0}
                onPress={() =>
                  navigation.navigate(routes.CART_PRODUCT_DETAIL, item)
                }
              />
            )}
          />
        </View>
      </View>
      <View style={styles.bottomViewContainer}>
        <BottomTextCard
          leftTitle={totalQuantity + ' goods'}
          title={'CHECK OUT'}
          onPress={() => navigation.navigate(routes.CHECKOUT)}
          rightTitle={'Total $' + totalPrice}
        />
      </View>
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
  bottomViewContainer: {
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 0.8,
    top: hp(8.5),
  },
});

export default CartScreen;
