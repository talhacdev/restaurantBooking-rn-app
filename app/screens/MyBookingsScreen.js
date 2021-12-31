import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import axios from 'axios';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import OrderCard from '../components/OrderCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

// "pending", "cancelled", "reserved", "free"

function MyBookingsScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    console.log('DEBUG GET ORDERS');
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI2MWJlZWFiOWMzNjBjNjM5MzgwMzE2MjEiLCJpYXQiOjE2NDA5NzUzMTR9.n-kcWny5bSG7vIQMM-jGWELZcL5dJCYAEq6B-vJvo2A';
    let customerId = '61beeab9c360c63938031621';
    // to-do async token
    let config = {
      headers: {
        authorization: token,
      },
    };

    axios
      .get(
        `http://192.168.18.203:3001/user/get-my-reservations/${customerId}`,
        config,
      )
      .then(response => {
        console.log('DEBUG getBookings: ', response);
      })
      .catch(error => {
        console.log('DEBUG getBookings ERROR: ', error);
      });
  };

  // complete or cancelled go in past otherwise active

  // useEffect(async () => {
  //     .then(res => {
  //       //if (res) console.log("Response", res);
  //       const updatedOrders = res.data.updatedOrder;
  //       //console.log("orderss", updatedOrders);
  //       setOrders(updatedOrders);
  //       setLoading(true);
  //       //window.alert("Orders Imported");
  //     })
  //     .catch(err => {
  //       console.log('Error in FE', err);
  //     });
  // }, []);

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
      {/* <View style={styles.headerViewContainer}>
        <AppHeader title={'Orders'} />
      </View> */}
      <View style={styles.contentViewContainer}>
        <View style={styles.upperViewContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={data => data.id.toString()}
            renderItem={({item}) => (
              <OrderCard
                orderTime={item._data.orderTime}
                address={item.address}
                status={item._data.status}
                total={item._data.totalPrice}
                onPress={() =>
                  navigation.navigate(routes.ORDER_DETAIL, item._data.products)
                }
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
    backgroundColor: colors.backgroundColor,
  },
  // headerViewContainer: {
  //   flex: 0.1,
  //   position: 'absolute',
  //   top: hp(0),
  // },
  contentViewContainer: {
    flex: 1,
    // top: hp(8.5),
  },
});

export default MyBookingsScreen;