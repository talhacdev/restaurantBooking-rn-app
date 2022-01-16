// import React, {useEffect, useState} from 'react';
// import {View, FlatList, StyleSheet} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import {UIActivityIndicator} from 'react-native-indicators';
// import Modal from 'react-native-modal';
// import axios from 'axios';

// import AppHeader from '../components/Header';
// import colors from '../config/colors';
// import OrderCard from '../components/OrderCard';
// import routes from '../navigation/routes';
// import navigation from '../navigation/rootNavigation';

// // "pending", "cancelled", "reserved", "free"

// function MyBookingsScreen(props) {
//   const [loading, setLoading] = useState();
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [data, setData] = useState();

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const getOrders = async () => {
//     console.log('DEBUG GET ORDERS');
//     let token =
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MWJlZWFiOWMzNjBjNjM5MzgwMzE2MjEiLCJpYXQiOjE2NDA5NzUzMTR9.n-kcWny5bSG7vIQMM-jGWELZcL5dJCYAEq6B-vJvo2A';
//     let customerId = '61beeab9c360c63938031621';
//     // to-do async token
//     let config = {
//       headers: {
//         authorization: token,
//       },
//     };

//     axios
//       .get(
//         `http://192.168.18.203:3001/user/get-my-reservations/${customerId}`,
//         config,
//       )
//       .then(response => {
//         console.log('DEBUG getBookings: ', response);
//       })
//       .catch(error => {
//         console.log('DEBUG getBookings ERROR: ', error);
//       });
//   };

//   // complete or cancelled go in past otherwise active

//   // useEffect(async () => {
//   //     .then(res => {
//   //       //if (res) console.log("Response", res);
//   //       const updatedOrders = res.data.updatedOrder;
//   //       //console.log("orderss", updatedOrders);
//   //       setOrders(updatedOrders);
//   //       setLoading(true);
//   //       //window.alert("Orders Imported");
//   //     })
//   //     .catch(err => {
//   //       console.log('Error in FE', err);
//   //     });
//   // }, []);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Modal
//           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
//           isVisible={isModalVisible}>
//           <View
//             style={{
//               position: 'absolute',
//               padding: wp(5),
//               borderRadius: wp(10),
//               backgroundColor: 'black',
//             }}>
//             <UIActivityIndicator color="white" />
//           </View>
//         </Modal>
//       ) : null}
//       {/* <View style={styles.headerViewContainer}>
//         <AppHeader title={'Orders'} />
//       </View> */}
//       <View style={styles.contentViewContainer}>
//         <View style={styles.upperViewContainer}>
//           <FlatList
//             showsVerticalScrollIndicator={false}
//             data={data}
//             keyExtractor={data => data.id.toString()}
//             renderItem={({item}) => (
//               <OrderCard
//                 orderTime={item._data.orderTime}
//                 address={item.address}
//                 status={item._data.status}
//                 total={item._data.totalPrice}
//                 onPress={() =>
//                   navigation.navigate(routes.ORDER_DETAIL, item._data.products)
//                 }
//               />
//             )}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundColor,
//   },
//   // headerViewContainer: {
//   //   flex: 0.1,
//   //   position: 'absolute',
//   //   top: hp(0),
//   // },
//   contentViewContainer: {
//     flex: 1,
//     // top: hp(8.5),
//   },
// });

// export default MyBookingsScreen;

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

import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BookingVerticalCard from '../components/BookingVerticalCard';
import SearchInput from '../components/SearchInput';
import axios from 'axios';

import {connect} from 'react-redux';
import {Login} from '../redux/actions/AuthActions';

function MyBookingsScreen(props) {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [reservedBookings, setReservedBookings] = useState([]);
  const [ccBookings, setCCBookings] = useState([]);
  const [tabView, setTabView] = useState(1);
  const [user, setUser] = useState(props.user[0]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    // setLoading(true);
    // toggleModal();

    let token = user.token;
    let config = {
      headers: {
        authorization: token,
      },
    };

    let customerId = user.customer.id;

    console.log('token: ', token);
    console.log('customerId: ', customerId);
    axios
      .get(
        `http://192.168.18.234:3001/user/get-my-reservations/${customerId}`,
        config,
      )
      .then(response => {
        toggleModal();
        setLoading(false);
        console.log('RESPONSE: getBookings: ', response);
        setBookings(response.data.reservations);
        filterBookings(response.data.reservations);
      })
      .catch(error => {
        toggleModal();
        setLoading(false);
        console.log('ERROR: getBookings: ', error);
      });
  };

  const filterBookings = async b => {
    console.log('Bookings b: ', b);

    let pending = [];
    b.filter(i => (i.reservationStatus == 'pending' ? pending.push(i) : null));
    setPendingBookings(pending);

    let ccBookings = [];
    b.filter(i =>
      i.reservationStatus == 'cancelled' || 'completed'
        ? ccBookings.push(i)
        : null,
    );
    setCCBookings(ccBookings);

    let reserved = [];
    b.filter(i =>
      i.reservationStatus == 'reserved' ? reserved.push(i) : null,
    );
    setReservedBookings(reserved);
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
          {/* <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate(routes.SEARCH)}>
            <SearchInput
              bookingScreen
              placeholder="product name"
              title="search by id"
              returnKeyType="search"
            />
          </TouchableOpacity> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentViewContainer}>
            <View style={styles.dividerView}>
              <TouchableOpacity
                onPress={() => setTabView(1)}
                style={styles.dividerButton}>
                <Text style={styles.dividerText}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTabView(2)}
                style={styles.dividerButton}>
                <Text style={styles.dividerText}>Reserved</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTabView(3)}
                style={styles.dividerButton}>
                <Text style={styles.dividerText}>Completed/Cancelled</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lowerViewContainer}>
              <FlatList
                // horizontal
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={
                  tabView == 1
                    ? pendingBookings
                    : tabView == 2
                    ? reservedBookings
                    : tabView == 3
                    ? ccBookings
                    : null
                }
                keyExtractor={
                  tabView == 1
                    ? pendingBookings => pendingBookings._id
                    : tabView == 2
                    ? reservedBookings => reservedBookings._id
                    : tabView == 3
                    ? ccBookings => ccBookings._id
                    : null
                }
                renderItem={({item}) => (
                  <View
                    style={{
                      margin: wp(1),
                      elevation: wp(2),
                    }}>
                    <BookingVerticalCard
                      status={item?.reservationStatus}
                      restID={item?.restaurant?.restaurantId}
                      restaurantName={item?.restaurant?.restaurantName}
                      numOfPersons={item?.numberOfPersons}
                      reqDate={item?.reservationDate}
                      reqTime={item?.reservationTime}
                      // imageUrl={item?.imageUrl}
                      // onPress={() =>
                      //   navigation.navigate(routes.RESTAURANT_DETAIL, item)
                      // }
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
    marginTop: hp(5),
  },
  contentViewContainer: {
    flex: 1,
  },
  dividerView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dividerColor,
    width: wp('100%'),
    height: hp('5%'),
    elevation: wp(1),
    flexDirection: 'row',
  },
  dividerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.33,
  },
  dividerText: {
    fontWeight: 'bold',
    color: colors.buttonTextColor,
    fontSize: wp(3.5),
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: payload => dispatch(UpdateCart(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsScreen);
