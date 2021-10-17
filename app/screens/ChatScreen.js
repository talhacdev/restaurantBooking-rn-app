import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Alert, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';

import AppHeader from '../components/Header';
import colors from '../config/colors';
import CartProductCard from '../components/CartProductCard';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import BottomTextCard from '../components/BottomTextCard';
import hardcodeCart from '../hardcode/hardcodeCart';

function ChatScreen(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('PROPS: ', props.route.params);
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{right: {color: colors.primary}}}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <Icon
            name="send"
            color={'#2e64e5'}
            size={25}
            style={{marginBottom: 8, marginRight: 5}}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <Icon name="arrow-round-down " color={'black'} size={22} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title={props.route.params.user.displayName} />
      </View>
      <View style={styles.contentViewContainer}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          textInputProps={{
            color: colors.tertiary,
            marginRight: wp(1),
          }}
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
  contentViewContainer: {
    flex: 0.86,
    top: hp(8.5),
    backgroundColor: colors.secondary,
  },
});

export default ChatScreen;
