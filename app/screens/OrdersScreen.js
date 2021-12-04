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

import AppHeader from '../components/Header';
import colors from '../config/colors';
import OrderCard from '../components/OrderCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

function OrdersScreen(props) {
  const [loading, setLoading] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    toggleModal();
    setLoading(true);
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    firestore()
      .collection('Orders')
      // Filter results
      .where('uid', '==', auth().currentUser._user.uid)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot._docs);
        setLoading(false);
        toggleModal();
        console.log('data: ', data);
      })
      .catch(err => alert(err));
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
    backgroundColor: colors.primary,
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

export default OrdersScreen;
