import React, {useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppButton from '../components/Button';
import colors from '../config/colors';
import {connect} from 'react-redux';
import {UpdateCart} from '../redux/actions/AuthActions';

function ProductDetailScreen(props) {
  const [listing, setListing] = useState(props.route.params);

  const checkRestaurantId = item => {
    let restId;
    let obj = {
      ...item,
      quantity: 1,
    };
    if (props.cart.length == 0) {
      let array = [];
      array.push(obj);
      props.updateCart(array);
    } else {
      restId = props.cart[0].restaurant;
      if (item.restaurant == restId) {
        return true;
      } else {
        alert('Items should be ordered from the same restaurant!');
        return false;
      }
    }
    console.log('item: ', item);
    console.log(props.cart);
  };

  const onAddToCart = item => {
    let what = checkRestaurantId(item);
    console.log('WHAT: ', what);

    if (what) {
      console.log('STORE: props.cart: ', props.cart.length);

      let obj = {
        ...item,
        quantity: 1,
      };

      if (props.cart.length != 0) {
        let verdict = false;

        for (var i = 0; i < props.cart.length; i++) {
          if (props.cart[i]._id == item._id) {
            verdict = true;
            i = props.cart.length;
          }
        }

        if (verdict) {
          alert('Item already added');
        } else {
          let array = [...props.cart];
          array.push(obj);
          props.updateCart(array);
        }
      } else {
        let array = [];
        array.push(obj);
        props.updateCart(array);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentViewContainer}>
          <View style={styles.upperViewContainer}>
            <Image
              style={{
                width: wp(100),
                height: wp(100),
              }}
              source={{
                uri: listing.imageUrl,
              }}
            />
            {/* <Image
              style={{
                width: wp(100),
                height: wp(100),
                padding: wp(1),
              }}
              source={require('../assets/restaurant.jpg')}
            /> */}
          </View>
          <View style={styles.lowerViewContainer}>
            <Text style={styles.productNameText}>{listing.itemName}</Text>
            {/* <Text style={styles.companyNameText}>{listing.restaurantName}</Text> */}
            <View style={{marginVertical: wp(2)}}>
              <Text style={styles.unitText}>{listing.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {/* <View>
                <Image
                  style={{
                    width: wp(7),
                    height: wp(7),
                    padding: wp(1),
                  }}
                  source={require('../assets/star.png')}
                />
              </View> */}
              <View>
                {/* <Text style={styles.ratingText}>{listing.rating}</Text> */}
              </View>
            </View>
            <Text style={styles.priceText}>{listing.price}</Text>
            {/* <Text style={styles.discountedText}>{listing.discountedPrice}</Text> */}
            <View style={{marginVertical: wp(2), height: wp(12)}}>
              <Text numberOfLines={2} style={styles.descriptionText}>
                {listing.description}
              </Text>
            </View>
          </View>
          <View style={styles.buttonViewContainer}>
            <AppButton
              title={'add to cart'}
              onPress={() => onAddToCart(listing)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    marginTop: hp(5),
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
    // marginBottom: hp(8.5),
  },
  upperViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    justifyContent: 'center',
    margin: wp(1),
    padding: wp(1),
  },
  productNameText: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: wp(7),
  },
  companyNameText: {
    color: colors.tertiary,
    fontSize: wp(5.5),
  },
  unitText: {
    color: colors.tertiary,
    fontSize: wp(6),
  },
  priceText: {
    fontWeight: 'bold',
    color: colors.priceText,
    fontSize: wp(6.5),
  },
  discountedText: {
    color: colors.discountedPriceText,
    fontWeight: 'bold',
    fontSize: wp(6.5),
  },
  descriptionText: {
    color: colors.tertiary,
    fontSize: wp(5),
  },
  buttonViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(3),
  },
  bottomViewContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.ratingText,
    paddingHorizontal: wp(1),
    fontWeight: 'bold',
    fontSize: wp(6.5),
  },
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);
