import AsyncStorage from '@react-native-async-storage/async-storage';

var cartId = [];
const cart = [];

const checkAlreadyAdded = async item => {
  try {
    var alreadyInCart = cartId.includes(item.id);
    if (alreadyInCart === true) {
      console.log('item already in cart');
    } else {
      console.log('pushing item into cart');
      cartId.push(item.id);
      addToCart(item);
    }
  } catch (e) {
    console.log(e);
  }
};

const changeInCart = async (idx, value) => {
  try {
    cart.splice(idx, 1);
    cart[idx] = value;
  } catch (e) {
    console.log(e);
  }
};

const deleteCartItem = async (value, products) => {
  try {
    var idx = value;
    cartId.splice(idx, 1);
    cart.splice(idx, 1);
    var pro = products;
    await AsyncStorage.setItem('@storage_Key', pro);
  } catch (e) {
    console.log('\nError Deleting Data\n', e);
  }
};

const addToCart = async item => {
  try {
    cart.push(item);
    const jsonArray = JSON.stringify(cart);
    storeData(jsonArray);
  } catch (e) {
    console.log(e);
  }
};

const storeData = async value => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    console.log('\nError Storing Data\n', e);
  }
};

const totalAmount = async value => {
  try {
    await AsyncStorage.setItem('@totalAmount', value);
  } catch (e) {
    console.log('\nError Storing Data\n', e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('\nError Getting Data\n', e);
  }
};

const getTotalAmount = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@totalAmount');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('\nError Getting Data\n', e);
  }
};
const removeItem = async () => {
  try {
    cartId.splice(0, cartId.length);
    cart.splice(0, cart.length);
    await AsyncStorage.removeItem('@storage_Key');
    return true;
  } catch (exception) {
    console.log('\nError Deleting Data\n');
  }
};

export default {
  storeData,
  getData,
  removeItem,
  addToCart,
  getTotalAmount,
  totalAmount,
  checkAlreadyAdded,
  deleteCartItem,
  changeInCart,
};
