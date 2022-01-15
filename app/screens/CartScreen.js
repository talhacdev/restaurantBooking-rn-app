import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';

import {connect} from 'react-redux';
import {UpdateCart} from '../redux/actions/AuthActions';

function CartScreen(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setProducts(props.cart);
  };

  let totalQuantity = 0;
  let totalPrice = 0;

  if (products) {
    products.forEach(item => {
      totalQuantity += item.quantity;
    });

    products.forEach(item => {
      // totalPrice += item.quantity * item.discountedPrice;
      totalPrice += item.quantity * item.price;
    });
  }

  const onAdd = item => {
    const productsNow = [...products];
    var idx = productsNow.indexOf(item);
    productsNow[idx].quantity += 1;
    setProducts(productsNow);
    props.updateCart(productsNow);
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
    props.updateCart(productsNow);
  };

  const onDel = item => {
    const productsNow = [...products];
    var idx = productsNow.indexOf(item);
    productsNow.splice(idx, 1);
    setProducts(productsNow);
    props.updateCart(productsNow);
  };

  const onCheckoutPress = () => {
    if (products) {
      if (products.length > 0) {
        navigation.navigate(routes.PAYMENT_METHOD, {
          products,
          totalPrice,
          totalQuantity,
        });
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
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={products}
            keyExtractor={products => products.id}
            renderItem={({item}) => (
              <View style={{margin: wp(1), elevation: hp(1)}}>
                <CartProductCard
                  productName={item.itemName}
                  description={item.description}
                  price={item.price}
                  discountedPrice={item.discountedPrice}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  onDel={() => onDel(item)}
                  onAdd={() => onAdd(item)}
                  onSub={() => onSub(item)}
                  // onPress={() =>
                  //   navigation.navigate(routes.CART_PRODUCT_DETAIL, item)
                  // }
                />
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomViewContainer}>
        <BottomTextCard
          leftTitle={products.length != 0 ? totalQuantity + ' goods' : null}
          title={products.length == 0 ? ':(' : 'CHECK OUT'}
          onPress={() => onCheckoutPress()}
          rightTitle={products.length != 0 ? 'Total $' + totalPrice : null}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  bottomViewContainer: {
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 0.9,
  },
});

function mapStateToProps(state) {
  return {
    cart: state.auth.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
