import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet} from 'react-native';
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
import hardcodeCart from '../hardcode/hardcodeCart';

function CartScreen(props) {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    hardcodeCart
      .getData()
      .then(json => {
        setProducts(json);
      })
      .catch(error => alert(error));
  };

  let totalQuantity = 0;
  let totalPrice = 0;

  if (products) {
    products.forEach(item => {
      totalQuantity += item.quantity;
    });

    products.forEach(item => {
      totalPrice += item.quantity * item.discountedPrice;
    });
  }

  const onAdd = item => {
    const productsNow = [...products];
    var idx = productsNow.indexOf(item);
    productsNow[idx].quantity += 1;
    setProducts(productsNow);
    const jsonArray = JSON.stringify(productsNow);
    hardcodeCart.changeInCart(idx, productsNow[idx]);
    hardcodeCart.storeData(jsonArray);
  };

  const onSub = item => {
    const productsNow = [...products];
    var idx = productsNow.indexOf(item);
    if (productsNow[idx].quantity > 1) {
      productsNow[idx].quantity -= 1;
      setProducts(productsNow);
    } else {
      setProducts(productsNow);
    }
    const jsonArray = JSON.stringify(productsNow);
    hardcodeCart.changeInCart(idx, productsNow[idx]);
    hardcodeCart.storeData(jsonArray);
  };

  const onDel = item => {
    const productsNow = [...products];
    var idx = productsNow.indexOf(item);
    productsNow.splice(idx, 1);
    setProducts(productsNow);
    const jsonArray = JSON.stringify(productsNow);
    hardcodeCart.deleteCartItem(idx, jsonArray);
  };

  const onCheckoutPress = () => {
    if (products) {
      if (products.length > 0) {
        navigation.navigate(routes.CHECKOUT, products);
      } else {
        Alert.alert('OOPS!', 'Cart is currently empty.', [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate(routes.HOME),
          },
        ]);
      }
    } else {
      Alert.alert('OOPS!', 'Cart is currently empty.', [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.navigate(routes.HOME),
        },
      ]);
    }
  };

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
            data={products}
            keyExtractor={products => products.id}
            renderItem={({item}) => (
              <CartProductCard
                productName={item.itemName}
                restaurantName={item.restaurantName}
                price={item.price}
                discountedPrice={item.discountedPrice}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                onDel={() => onDel(item)}
                onAdd={() => onAdd(item)}
                onSub={() => onSub(item)}
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
          onPress={() => onCheckoutPress()}
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
