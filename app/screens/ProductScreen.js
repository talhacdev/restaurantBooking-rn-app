import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function ProductScreen(props) {
  const item = props.route.params.item;
  const data = props.route.params.filteredList;

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={item.title} />
      </View>
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <View style={styles.wrapper}>
                <ProductCard
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
    flex: 0.91,
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
});

export default ProductScreen;
