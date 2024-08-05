
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { GroceryContext } from './App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckOut = () => {

    const {groceryState,setGroceryState} =useContext(GroceryContext);
    const [text, setText] = useState('');


    const handleQuantityChange = (id, change) => {
      setGroceryState(prevState => {
        const updatedCart = prevState.cart.map(item => {
          if (item.id === id) {
            return { ...item, qty: Math.max(1, item.qty + change) }; 
          }
          return item;
        });
        return { ...prevState, cart: updatedCart };
      });
    };



    const handleRemove = (id) => {
      setGroceryState(prevState => {
        
        const filteredCart = prevState.cart.filter(item => item.id !== id);

        return { ...prevState, cart: filteredCart };
      });
    };
    
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.uri }}
        style={styles.cardImage}
      >
      </Image>
      <TouchableOpacity 
      style={{
        position:"absolute",
        left:"30%",
        top:10,
      }}

   onPress={()=>handleRemove(item.id)}      
      >
      <View style={{
        width:30,
        height:30,
        backgroundColor:"grey",
        opacity:0.8,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
      
      }}>
        <MaterialIcons name="delete" size={15} color="red" outlined/>
        </View>
      </TouchableOpacity>
    

      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>{item.title}</Text>
        <Text style={styles.cardTextSecond}>{item.type}</Text>
        <View
        style={{
          flexDirection:"row",
          // backgroundColor:"red",
          borderRadius:10,
          gap:20,
          alignItems:"center"
        }}
        >
        <View style={styles.weightContainer}>
          <Text style={styles.weight}>{item.qty}kg</Text>
        </View>
       
          {item.percentage && (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center', 
    }}
  >
    <View
      style={{
        transform: [{ scaleX: -1 }],
        justifyContent: 'center', 
        // height: 24, 
        // width: 24, 
      }}
    >
      <MaterialCommunityIcons
        name='label'
        size={36}
        color='red'
        // style={{
        //   height: 24, 
        // }}
      />
    </View>
    <View
      style={{
        width: 30,
        backgroundColor: '#FF2400',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -20, 
        height: 21, 
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          color: 'white',
          fontSize: 10,
        }}
      >
        -{item.percentage}%
      </Text>
    </View>
  </View>
)}
          </View>
        <Text style={styles.price}>
          ${item.price.toFixed(2)}
          {item.oldPrice && ( 
      
          <Text style={styles.oldPrice}> ${item.oldPrice}</Text>
             
           
          )}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityReduce}
          onPress={()=>handleQuantityChange(item.id,-1)}
        
          >
            <Text style={styles.minus}>-</Text>
          </TouchableOpacity
          >
          <View style={styles.quantityWrapper}>
            <Text style={styles.quantity}> {item.qty}</Text>
          </View>
          <TouchableOpacity style={styles.quantityAdd}
          onPress={()=>handleQuantityChange(item.id,+1)}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
const total=groceryState.cart.reduce((acc,curr)=>acc+(curr.qty*curr.price),0)




function EmptyComponent (){

return (
  <View
  style={{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
    
  }}
  >
  <Text
  style={{
    fontStyle:"400",
    fontSize:20,
    color:"black",
  }}
  >
    No Product here
  </Text>

  </View>
)


}


  return (
    <View style={styles.container}>
      <FlatList
        data={groceryState.cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent}

      />
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
        <Text style={styles.promoCodeButtonText}>
            Fresh
        </Text>
      </TouchableOpacity>

      
      </View>
      <View style={styles.billPriceContainer}>

      <View style={styles.subTotal}>
          <Text style={styles.subPriceName}>Sub Total</Text>
          <Text style={styles.subPriceValue}>${total.toFixed(2)}</Text>

      </View>
      <View style={[styles.subTotal,styles.additional]}>
          <Text style={styles.subPriceName}>Shipping</Text>
          <Text style={styles.subPriceValue}>{total>0?"$5.00":"$0.00"}</Text>

      </View>
      <View style={styles.Total}>
          <Text style={styles.subPriceName}>Total</Text>
          <Text style={styles.subPriceValue}>${total.toFixed(2)}</Text>
          <Text style={styles.subPriceValue}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkOutWrapper}>
        <Text style={styles.checkOutText}>CheckOut</Text>
      </TouchableOpacity>
    </View>     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:16, 
    flex: 1,
    paddingLeft:24,
    paddingRight:24,
    gap: 16,
    backgroundColor:"white",
    justifyContent:"center"
    
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  card: {
    width: "100%",
    height: 170,
    marginTop:12,
    flexDirection: "row",
    marginBottom: 12,
    // backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    position:"relative"
  
  },
  cardImage: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
    position:"relative"
  },
  cardDetails: {
    flexDirection: "column",
    gap: 8,
    justifyContent: "space-between",
    marginLeft: 16,
    flex: 1,
  },
  cardText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  quantityContainer: {
    marginBottom:5,
    flex: 0.6,
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 16,
    paddingHorizontal: 4,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: "#fff",
    // backgroundColor:"red",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderRadius: 25,
    elevation: 5,
  },
  weight: {
    color: "green",
    fontSize:12
  },
  weightContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#E5FFE5",
    width: 60,
    paddingVertical: 4,
    alignItems: "center",
    borderRadius: 20,
  },
  price: {
    color: 'black',
    fontWeight: "500",
  },
  quantityReduce: {
    width: 40,
    height: 40,
    borderRadius: 20,
    color:"black",
    backgroundColor: "#FAF9F6",
    justifyContent: "center",
    alignItems: 'center',
  },
  quantityAdd: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: 'center',
  },
  quantity: {
    justifyContent: "center",
    alignItems: 'center',
    color: "black",
    fontWeight:"600"
  },
  plus: {
    color: "white",
    fontSize: 16,
  },
  minus: {
    fontWeight: "bold",
    fontSize: 16,
    color:"black"
  },
  quantityWrapper: {
    width: 14,
    height: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  cardTextSecond: {
    marginTop: -15,
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  oldPrice: {
    color: "grey",
    textDecorationLine: 'line-through',
    paddingLeft:10
  },
  billContainer:{
    width:"100%",
    height:320,

  },
  promoContainer:{
   flex:0.20,
   backgroundColor:"#F5FFF5", 
paddingVertical:8,
paddingHorizontal:8,
   overflow:"hidden",
   borderRadius:40,
   flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center"
  },
  promoCodeButtonContainer:{
   backgroundColor:"green",
   width:100,
   height:40,
   borderRadius:20,
   justifyContent:"center",
   alignItems:"center"
  },
  promoCodeButtonText:{
   color:"white",
   fontWeight:"800" 
  },
  billPriceContainer:{
    // paddingHorizontal:16,
    flex:1,
    flexDirection:"column",
    gap:8
  },
  subTotal:{
   display:'flex',
   flexDirection:"row",
   justifyContent:"space-between",
   marginTop:16
  },

  subPriceName:{
    color:"grey",
    fontWeight:"600"
    
  },
  subPriceValue:{
   color:"black",
   fontWeight:'800' 
  },
  additional:{
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    paddingBottom:8
  },
  Total:{
    flexDirection:'row',
    justifyContent:'space-between',
    fontWeight:"600"
  },
  checkOutWrapper:{
    marginTop:"auto",
    marginBottom:"auto",
    flex:0.4,
    // flex:1,
    backgroundColor:"green",
        overflow:'hidden',
    borderRadius:25,
    justifyContent:'center',
    alignItems:"center",
  },
  checkOutText:{
    color:"white",
    fontWeight:"600",
    textAlign:"center"
  }
  

});

export default CheckOut;