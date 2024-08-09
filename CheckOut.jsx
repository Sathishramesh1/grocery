import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsFromRealm, handleCart, handleQuantity, handleRemoveCart, setInitialCartData } from './redux/cartSlice';

const CheckOut = ({navigation}) => {
 
  const {cart,totalPrice} =useSelector(state=>state.cart);
  const dispatch=useDispatch();
  
  const [text, setText] = useState('');



  useEffect(()=>{
 // Fetch initial cart data from Realm
 const initialCartData = fetchProductsFromRealm();

 // Dispatch action to set initial cart data
 dispatch(setInitialCartData(initialCartData));

  },[dispatch]);


  const handleQuantityChange = (id, change) => {

    dispatch(handleQuantity({id,change}));
    console.log("total price the cart page",totalPrice);

  };

  const handleRemove = id => {
    const item=cart.find((ele)=>ele.id==id);

    dispatch(handleRemoveCart(item));
   
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.uri}} style={styles.cardImage}></Image>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: '30%',
          top: 10,
        }}
        onPress={() => handleRemove(item.id)}>
        <View style={styles.deleteIconWrapper}>
          <MaterialIcons name="delete" size={15} color="red" outlined />
        </View>
      </TouchableOpacity>

      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>{item.title}</Text>
        <Text style={styles.cardTextSecond}>{item.type}</Text>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            gap: 20,
            alignItems: 'center',
          }}>
          <View style={styles.weightContainer}>
            <Text style={styles.weight}>{item.quantity}kg</Text>
          </View>

          {item.percentage && (
            <View style={styles.iconWrapperContainer}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name="label" size={36} color="red" />
              </View>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>-{item.percentage}%</Text>
              </View>
            </View>
          )}
        </View>
        <Text style={styles.price}>
          ${item.price?.toFixed(2)}
          {item.oldPrice && (
            <Text style={styles.oldPrice}> ${item.oldPrice}</Text>
          )}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityReduce}
            onPress={() => handleQuantityChange(item.id, -1)}>
            <Text style={styles.minus}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantityWrapper}>
            <Text style={styles.quantity}> {item.quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.quantityAdd}
            onPress={() => handleQuantityChange(item.id, +1)}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

 

  function EmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.NoProductContainer}>No Product here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyComponent}
      />

      {cart?.length>0 &&
      <View style={styles.billContainer}>
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Promo Code"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.promoCodeButtonContainer}>
            <Text style={styles.promoCodeButtonText}>Fresh</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.billPriceContainer}>
          <View style={styles.subTotal}>
            <Text style={styles.subPriceName}>Sub Total</Text>
            <Text style={styles.subPriceValue}>${totalPrice?.toFixed(2)}</Text>
          </View>
          <View style={[styles.subTotal, styles.additional]}>
            <Text style={styles.subPriceName}>Shipping</Text>
            <Text style={styles.subPriceValue}>
              {totalPrice > 0 ? '$5.00' : '$0.00'}
            </Text>
          </View>
          <View style={styles.Total}>
            <Text style={styles.subPriceName}>Total</Text>
            <Text style={styles.subPriceValue}>${(totalPrice+5)?.toFixed(2)}</Text>
            <Text style={styles.subPriceValue}>${(totalPrice+5)?.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkOutWrapper}
          onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.checkOutText}>CheckOut</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    gap: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    width: '100%',
    height: 170,
    marginTop: 12,
    flexDirection: 'row',
    marginBottom: 12,
    // backgroundColor: "#fff",
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '40%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  cardDetails: {
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'space-between',
    marginLeft: 16,
    flex: 1,
  },
  cardText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  quantityContainer: {
    marginBottom: 5,
    flex: 0.6,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 16,
    paddingHorizontal: 4,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderRadius: 25,
    elevation: 5,
  },
  weight: {
    color: 'green',
    fontSize: 12,
  },
  weightContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#E5FFE5',
    width: 60,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 20,
  },
  price: {
    color: 'black',
    fontWeight: '500',
  },
  quantityReduce: {
    width: 40,
    height: 40,
    borderRadius: 20,
    color: 'black',
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityAdd: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: '600',
  },
  plus: {
    color: 'white',
    fontSize: 16,
  },
  minus: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  quantityWrapper: {
    width: 22,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextSecond: {
    marginTop: -15,
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  oldPrice: {
    color: 'grey',
    textDecorationLine: 'line-through',
    paddingLeft: 10,
  },
  billContainer: {
    width: '100%',
    height: 320,
  },
  promoContainer: {
    flex: 0.2,
    backgroundColor: '#F5FFF5',
    paddingVertical: 8,
    paddingHorizontal: 8,
    overflow: 'hidden',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoCodeButtonContainer: {
    backgroundColor: 'green',
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoCodeButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  billPriceContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  subTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  subPriceName: {
    color: 'grey',
    fontWeight: '600',
  },
  subPriceValue: {
    color: 'black',
    fontWeight: '800',
  },
  additional: {
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    paddingBottom: 8,
  },
  Total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: '600',
  },
  checkOutWrapper: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 0.4,
    backgroundColor: 'green',
    overflow: 'hidden',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkOutText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  NoProductContainer: {
    fontStyle: '400',
    fontSize: 20,
    color: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    width: 30,
    backgroundColor: '#FF2400',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
    height: 21,
  },
  percentageText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontSize: 10,
  },
  iconWrapper: {
    transform: [{scaleX: -1}],
    justifyContent: 'center',
  },
  iconWrapperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIconWrapper: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  flatListContainer:{
    // flex:1,
  }
});

export default CheckOut;
