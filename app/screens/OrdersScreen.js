import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import OrderCard from '../components/OrderCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function OrdersScreen(props) {
  const data = [
    {
      id: '1',
      status: 'status',
      orderTime: 'orderTime',
      total: 'total',
      address: 'address',
      items: [
        {
          id: '0',
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
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={'Orders'} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <OrderCard
                orderTime={item.orderTime}
                address={item.address}
                status={item.status}
                total={item.total}
                onPress={() => navigation.navigate(routes.ORDER_DETAIL, item)}
              />
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
    flex: 0.91,
    top: hp(8.5),
  },
});

export default OrdersScreen;
