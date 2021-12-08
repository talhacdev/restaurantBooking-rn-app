import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import Button from '../components/Button';
import moment from 'moment';
import AppInput from '../components/Input';
import axios from 'axios';

function PaymentMethodScreen(props) {
  const [address, setAddress] = useState();
  const [notes, setNotes] = useState();

  const onPressPlaceOrder = () => {
    // const orderObject = {
    //   status: 'in-progress',
    //   products: props?.route?.params?.products,
    //   totalPrice: props?.route?.params?.totalPrice,
    //   totalQuantity: props?.route?.params?.totalQuantity,
    //   uid: auth().currentUser._user.uid,
    //   orderTime: moment().format('hh:mm:ss A'),
    // };
    // console.log('orderObject', orderObject);
    // createOrder(orderObject);
  };

  const createOrder = async orderObject => {
    firestore()
      .collection('Orders')
      .add(orderObject)
      .then(() => {
        console.log('Order Placed!');
        navigation.navigate(routes.ORDER_SUCCESS);
      })
      .catch(err => {
        alert(err);
      });
  };

  // const createRestaurants = async () => {
  //   let obj = {
  //     id: Date.now().toString(),
  //     category: ['fast-food'],
  //     contact: '042-111-116-787',
  //     imageUrl:
  //       'https://pbs.twimg.com/profile_images/1397098771394215936/W72q-pDv_400x400.jpg',
  //     location:
  //       '39-C Abul Hassan Isfashani Rd, Block C Faisal Town, Lahore, Punjab',
  //     rating: '5',
  //     restaurantName: 'OPTP',
  //     reviews: [
  //       {
  //         id: Math.random().toString(),
  //         comment: 'OPTP sucks!',
  //         displayName: 'Fawad Khan',
  //         imageUrl:
  //           'https://i.pinimg.com/222x/80/d2/50/80d25096a32c10afb9d39acdd051e45e.jpg',
  //       },
  //     ],
  //     sponsored: 'true',
  //     tables: [
  //       {id: 1, title: 'Table 1'},
  //       {id: 2, title: 'Table 2'},
  //       {id: 3, title: 'Table 3'},
  //       {id: 4, title: 'Table 4'},
  //     ],
  //     timeslot: [
  //       {id: 0, slot: '9am to 12pm'},
  //       {id: 1, slot: '12pm to 3pm'},
  //       {id: 2, slot: '3pm to 6pm'},
  //       {id: 4, slot: '6pm to 9pm'},
  //       // {id: 5, slot: '9pm to 12am'},
  //     ],
  //   };
  //   console.log('createRestaurants');
  //   firestore()
  //     .collection('Restaurants')
  //     .doc(obj.id)
  //     .set(obj)
  //     .then(() => {
  //       console.log('Restaurants added!');
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  // const createProducts = async () => {
  //   let obj = {
  //     id: Date.now().toString(),
  //     category: ['fries'],
  //     description: "this is OPTP's finest flagship fries.",
  //     discountedPrice: '100',
  //     imageUrl:
  //       'https://www.optp.biz:3000/3000d9b0-a80f-11eb-8176-598fa979e369-Regular-Plain-Fries_variant_0-2021-04-28104754.jpg',
  //     itemName: 'Loaded Fries',
  //     price: '200',
  //     rating: '5',
  //     restaurantName: 'OPTP',

  //     quantity: 1,
  //     sponsored: false,
  //   };
  //   console.log('createProducts');
  //   firestore()
  //     .collection('Products')
  //     .doc(obj.id)
  //     .set(obj)
  //     .then(() => {
  //       console.log('Products added!');
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  // const createCategories = async () => {
  //   let obj = {
  //     id: Date.now().toString(),
  //     title: 'Drinks',
  //     imageUrl:
  //       'https://listimg.pinclipart.com/picdir/s/546-5460117_boba-pixel-art-clipart.png',
  //   };
  //   console.log('createCategories');
  //   firestore()
  //     .collection('Categories')
  //     .doc(obj.id)
  //     .set(obj)
  //     .then(() => {
  //       console.log('Categories added!');
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  useEffect(() => {
    // let restId = '61956881a675b200167ff63f';
    // let token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MTk1NjYzNzgzOTcyNDM2MDA4ZGQwZTkiLCJpYXQiOjE2Mzg4OTQwNzl9.G8c00HAcbvZre7nuqEi6XnXiTDtw2DUVh-lYVMFo8fk';
    // let obj = {
    //   firstName: 'Muhammad',
    //   lastName: 'Talha',
    //   email: 'thecorruptmob1@gmail.com',
    //   password: '123456',
    //   contact: '+923331049859',
    //   role: 'customer',
    // };
    // axios
    //   .get(`http://magicmeal.herokuapp.com/user/post-order/${restId}`, obj)
    //   .then(response => {
    //     console.log('DEBUG registerScreen: ', response);
    //   })
    //   .catch(error => {
    //     console.log('DEBUG registerScreen ERROR: ', error);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'payment method'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <AppInput title={'address'} onChangeText={text => setAddress(text)} />
          <AppInput title={'notes'} onChangeText={text => setNotes(text)} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          noElevation
          widthContainer={wp(100)}
          title={'place order'}
          onPress={() => onPressPlaceOrder()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  bottomViewContainer: {
    flex: 0.1,
    position: 'absolute',
    bottom: hp(0),
  },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
    backgroundColor: colors.backgroundColor,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  upperViewContainer: {
    alignItems: 'center',
  },
});

export default PaymentMethodScreen;
