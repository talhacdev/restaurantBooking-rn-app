import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import OrderProductCard from '../components/OrderProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import AppInput from '../components/Input';

function OrderDetailScreen(props) {
  const data = [
    {
      id: '0',
      itemName: 'itemName',
      restaurantName: 'restaurantName',
      price: '2500',
      discountedPrice: '2200',
      rating: '1',
      quantity: '1',
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

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'Order Detail'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.searchViewContainer}>
          <AppInput
            placeholder="product name"
            title="search"
            returnKeyType="search"
            style={styles.textInput}
          />
        </View>
        <View style={styles.upperViewContainer}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <View style={styles.wrapper}>
                <OrderProductCard
                  title={item.title}
                  itemName={item.itemName}
                  restaurantName={item.restaurantName}
                  rating={item.rating}
                  price={item.price}
                  discountedPrice={item.discountedPrice}
                  quantity={item.quantity}
                  onPress={() =>
                    navigation.navigate(routes.ORDER_PRODUCT_DETAIL, item)
                  }
                />
              </View>
            )}
          />
        </View>
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
  contentViewContainer: {
    flex: 0.8,
    top: hp(8.5),
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
});

export default OrderDetailScreen;
