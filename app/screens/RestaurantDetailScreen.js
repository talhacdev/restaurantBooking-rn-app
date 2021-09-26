import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AppHeader from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import AppButton from '../components/Button';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

import colors from '../config/colors';

function RestaurantDetailScreen(props) {
  const listing = props.route.params;
  console.log('listing=>', listing);
  return (
    <View style={styles.container}>
      <View style={styles.headerViewContainer}>
        <AppHeader title="detail" />
      </View>

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
              source={require('../assets/restaurant.jpg')}
            />
          </View>

          <View style={styles.lowerViewContainer}>
            <Text style={styles.productNameText}>{listing.restaurantName}</Text>
            <Text style={styles.companyNameText}>{listing.location}</Text>
            <View style={{marginVertical: wp(2)}}>
              <Text style={styles.unitText}>{listing.category}</Text>
            </View>
            <View>
              <Text style={styles.unitText}>{listing.contact}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View>
                <Image
                  style={{
                    width: wp(7),
                    height: wp(7),
                    padding: wp(1),
                  }}
                  source={require('../assets/star.png')}
                />
              </View>
              <View>
                <Text style={styles.ratingText}>{listing.rating}</Text>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listing.reviews}
              keyExtractor={data => data.id.toString()}
              renderItem={({item}) => (
                <View>
                  <ReviewCard user={item.user} comment={item.comment} />
                </View>
              )}
            />
          </View>
          <View style={styles.buttonViewContainer}>
            <AppButton
              onPress={() => navigation.navigate(routes.BOOK_NOW)}
              title={'book'}
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
    backgroundColor: colors.secondary,
  },
  headerViewContainer: {
    flex: 0.1,
    position: 'absolute',
    top: hp(0),
  },
  contentViewContainer: {
    flex: 0.8,
    top: hp(8.5),
    marginBottom: hp(8.5),
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
    color: colors.tertiary,
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
});

export default RestaurantDetailScreen;
