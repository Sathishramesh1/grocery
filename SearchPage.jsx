import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker}  from '@react-native-picker/picker';
import { handleCart } from './redux/cartSlice';
import { handleFavorites } from './redux/productSlice';

const SearchPage = ({navigation}) => {

const {search,products}=useSelector(state=>state.product);

const [selectedFilter, setSelectedFilter] = useState('');
const dispatch=useDispatch();

   
const SearchFiltered = products.filter((ele) =>
    ele.title.toLowerCase().includes((search || "").toLowerCase())
  );
 
  const handlePress = (id) => {
    const selectedProduct=products.find(ele=>ele.id===id);
    dispatch(handleCart(selectedProduct));   
  };


  const handleHeartPress = id => {
    dispatch(handleFavorites(id));
  };



//function to sort product base on the price ascending or descending
const sortProducts = () => {
  if (selectedFilter === 'highToLow') {
    return SearchFiltered.sort((a, b) => b.price - a.price);
  } else if (selectedFilter === 'lowToHigh') {
    return SearchFiltered.sort((a, b) => a.price - b.price);
  }
  // setSelectedFilter('');
  return SearchFiltered;
};

// In the render method,
const sortedProducts = sortProducts();


  //if no search match found 
  function EmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.NoProductContainer}>No Product matches here</Text>
      </View>
    );
  }


  //renderItem for flatList 
   const renderItem = ({item}) => {
    //const product=product.findIndex((ele)=>ele.id===item.id&&ele.favorites)
    const product = products.findIndex(ele => ele.id === item.id&&ele.favorite);
    return (
      <View style={styles.card}>
      <TouchableOpacity
      onPress={()=>handlePress(item.id)}
      >
        <Image
          source={{uri: item.uri}}
          style={styles.cardImage}
          onError={error => console.log('Image Load Error:', error)}
        />
        </TouchableOpacity>
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
            <Text style={styles.priceDetailsText}>{item?.price?.toFixed(2)}</Text>
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
          <MaterialIcons name="star" size={14} color="green" solid />
          <Text style={styles.ratingText}>200+ Ratings</Text>
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
          <Text style={styles.ratingText}>Free</Text>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.productContainer}>
     <View
    style={styles.filterContainer}>

     <Picker
    selectedValue={selectedFilter}
    style={styles.pricePickerContainer}
    onValueChange={(itemValue) => setSelectedFilter(itemValue)}
    dropdownIconColor="black"
   
  >
    <Picker.Item label="Select Filter" value=""  />
    <Picker.Item label="Price: High to Low" value="highToLow" />
    <Picker.Item label="Price: Low to High" value="lowToHigh" />
  </Picker>

    </View>
    <Text style={styles.text}>{SearchFiltered?.length>0 && "Results found"} </Text>

   
    <FlatList
      data={!search?SearchFiltered:sortedProducts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={EmptyComponent}
    />

   
  </View>
  )
}

export default SearchPage

const styles = StyleSheet.create({
    productContainer: {
      flex: 1,
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
    },
    listContent: {},
    card: {
      width: '100%',
      height: 284,
      marginTop: 8,
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
      alignItems: 'center'
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
    input:{
      height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 16,
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  
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

      filterContainer:{
        height:40,
        width:"100%",
        backgroundColor:"#f0f8ff",
        marginTop:16,
        justifyContent:'center' ,
        position:'relative'     
      },
      pricePickerContainer:{
        height: 40, 
        width: '100%',
        color:"black",
        borderColor:"black",
        borderWidth:2,
       
        

       
        


      }
  });
  