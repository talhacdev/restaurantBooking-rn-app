import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import moment from 'moment';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';
import hardcodeCart from '../hardcode/hardcodeCart';

function MessagesScreen(props) {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState();
  const [currentUser, setCurrentUser] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const DATA = [
    {
      id: '0',
      username: 'Jenny Doe',
      imageUrl: require('../assets/user.jpg'),
      messageTime: '1 day ago',
      messageText:
        'hey there, this is my text for a post of my social app in React Native.',
    },
    {
      id: '1',
      username: 'John Doe',
      imageUrl: require('../assets/user.jpg'),
      messageTime: '1 day ago',
      messageText:
        'hey there, this is my text for a post of my social app in React Native.',
    },
    {
      id: '2',
      username: 'Ken William',
      imageUrl: require('../assets/user.jpg'),
      messageTime: '1 day ago',
      messageText:
        'hey there, this is my text for a post of my social app in React Native.',
    },
    {
      id: '3',
      username: 'Selina Paul',
      imageUrl: require('../assets/user.jpg'),
      messageTime: '1 day ago',
      messageText:
        'hey there, this is my text for a post of my social app in React Native.',
    },
    {
      id: '4',
      username: 'Christy Alex',
      imageUrl: require('../assets/user.jpg'),
      messageTime: '1 day ago',
      messageText:
        'hey there, this is my text for a post of my social app in React Native.',
    },
  ];

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
      <View style={styles.headerViewContainer}>
        <AppHeader title={'messages'} />
      </View>
      <View style={styles.contentViewContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={messages}
          keyExtractor={messages => messages.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.CHAT, item)}
              style={styles.messageCard}>
              <View style={styles.messageUserInfo}>
                <View style={styles.messageUserImgWrapper}>
                  <Image
                    source={{
                      uri:
                        currentUser === item._data.user1.uid
                          ? item._data.user2.photoURL
                          : item._data.user1.photoURL,
                    }}
                    style={styles.messageUserImg}
                  />
                </View>
                <View style={styles.messageTextSection}>
                  <View style={styles.messageUserInfoText}>
                    <Text style={styles.messageUserName}>
                      {currentUser === item._data.user1.uid
                        ? item._data.user2.displayName
                        : item._data.user1.displayName}
                    </Text>
                    <Text style={styles.messagePostTime}>
                      {item._data.messageTime}
                    </Text>
                  </View>
                  <Text style={styles.messageMessageText}>
                    {item._data.messageText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: wp(5),
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
    flex: 0.9,
    top: hp(8.5),
  },
  messageCard: {
    backgroundColor: colors.primary,
  },
  messageUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageUserImgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageUserImg: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
  },
  messageUserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageUserName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  messagePostTime: {
    fontSize: 12,
    color: '#666',
  },
  messageMessageText: {
    fontSize: 14,
    color: '#333333',
  },
  messageTextSection: {
    justifyContent: 'center',
    paddingVertical: hp(1),
    paddingRight: wp(4),
    width: wp(75),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default MessagesScreen;
