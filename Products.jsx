import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GroceryContext} from './App';

const Products = ({navigation}) => {
  const {groceryState, setGroceryState} = useContext(GroceryContext);

  const {cart} = groceryState;

  const handleHeartPress = id => {
    const itemInCart = cart.find(ele => ele.id === id);

    if (!itemInCart) {
      const itemToAdd = groceryState.items.find(item => item.id === id);
      if (itemToAdd) {
        setGroceryState({
          ...groceryState,
          cart: [...cart, itemToAdd],
        });
      }
    } else {
      const updatedCart = cart.filter(ele => ele.id !== id);
      setGroceryState({
        ...groceryState,
        cart: updatedCart,
      });
    }
  };

  const renderItem = ({item}) => {
    const product = groceryState.cart.findIndex(ele => ele.id == item.id);

    return (
      <View style={styles.card}>
        <Image
          source={{uri: item.uri}}
          style={styles.cardImage}
          onError={error => console.log('Image Load Error:', error)}
        />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => handleHeartPress(item.id)}>
          {product == -1 ? (
            <Icon name="heart" size={30} color="red" />
          ) : (
            <Icon name="heart" size={30} color="red" solid />
          )}
        </TouchableOpacity>
        <Text style={styles.cardText}>{item.title}</Text>
        <View style={styles.priceDetails}>
          <Text style={styles.priceDetailsTextFirst}>$$</Text>
          <View style={styles.priceDetailItem}>
            <View style={styles.dot} />
            <Text style={styles.priceDetailsText}>{item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceDetailItem}>
            <View style={styles.dot} />
            <Text style={styles.priceDetailsText}>1kg</Text>
          </View>
          <View style={styles.priceDetailItem}>
            <View style={styles.dot} />
            <Text style={styles.priceDetailsText}>Deshi food</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>4.3</Text>
          {/* <Icon name="star" size={12} color="green" solid /> */}
          <MaterialIcons name="star" size={14} color="green" solid />
          <Text style={styles.ratingText}>200+ Ratings</Text>
          {/* <MaterialIcons name="access-time" size={12}  color="grey" solid/> */}
          <Icon name="clock" size={12} color="grey" solid />
          <Text style={styles.ratingText}>25 Min</Text>

          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: 'grey',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.7,
            }}>
            <Icon name="dollar-sign" size={12} color="white" solid />
          </View>
          {/* <MaterialIcons name="attach_money" size={12} color="grey"/> */}
          {/* <MaterialCommunityIcons name="attach_money" size={12} color="grey"/> */}

          <Text style={styles.ratingText}>Free</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.productContainer}>
      <Text style={styles.text}>80 Results found</Text>
      <FlatList
        data={groceryState.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('CheckOut')}>
          <Text style={styles.cart}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    // padding: 16,
    // padding:8,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginTop: 16,
    paddingBottom: 8,
    // paddingLeft:16
  },
  listContent: {},
  card: {
    width: '100%',
    height: 284,
    marginTop: 8,

    // paddingHorizontal: 16,
  },
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 15,
  },
  cardText: {
    marginTop: 8,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  priceDetails: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 16,
  },
  priceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDetailsTextFirst: {
    color: 'grey',
    fontWeight: '400',
  },
  priceDetailsText: {
    marginLeft: 8,
    color: 'grey',
    fontWeight: '400',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'grey',
  },
  ratingContainer: {
    paddingTop: 6,
    flexDirection: 'row',
    gap: 8,

    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '600',
  },
  cartButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'stretch',
    marginTop: 16,
  },
  cart: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 5,
  },
});
