/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import Products from './Products';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckOut from './CheckOut';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './Login';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import Favorites from './Favorites';
import SearchPage from './SearchPage';
import { updateSearchText } from './redux/productSlice';


enableScreens();

const Stack = createNativeStackNavigator();



//header for product page
const ProductsHeader = ({ navigation }) => {
  const {cart} = useSelector(state => state.cart);

  return (
    <>
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={() => navigation.goBack()}>
      </TouchableOpacity>
      <View style={styles.headerButton}>
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
          >
            <MaterialIcons name="favorite" size={22} color="red" style={styles.favoriteIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => navigation.navigate("CheckOut")}
          >
            <MaterialIcons name="shopping-cart" size={22} color="green" />
           
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart?.length || 0}</Text>
              </View>
          
          </TouchableOpacity>
        </>
      </View>
    </>
  );
};




//header for product page
const ProductsHeaderFavorites = ({ navigation }) => {
  const {cart} = useSelector(state => state.cart);

  return (
    <>
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={() => navigation.goBack()}>
      </TouchableOpacity>
      <View style={styles.headerButton}>
        <>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
          >
            <MaterialIcons name="favorite" size={22} color="red" style={styles.favoriteIcon} />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => navigation.navigate("CheckOut")}
          >
            <MaterialIcons name="shopping-cart" size={22} color="green" />
           
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart?.length || 0}</Text>
              </View>
          
          </TouchableOpacity>
        </>
      </View>
    </>
  );
};


//header for search page
const SearchHeader=({navigation})=>{
  const {search} = useSelector(state => state.product);
  const dispatch=useDispatch();

  const handleSearchChange = (text) => {
    dispatch(updateSearchText(text));
  };


  return <View
  style={styles.searchContainer}
  >
     <View style={styles.searchWrapper}>
        <MaterialIcons name="search" size={24} color="black" />
      
<TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={search}
        placeholderTextColor="black"
        onChangeText={(text) => handleSearchChange(text)} 
      />

</View>
  </View>

}



function App(){
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <Provider store={store}>
   
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
    headerShown: false
  }}
  >
    <Stack.Screen 
    name="Home" component={Home} />

    <Stack.Screen
      name="Products"
      component={Products}
      options={({ navigation }) => ({
    headerShown: true,
    title: 'Deshi Grocery',
    headerTitleAlign: 'center',
    headerTitleStyle: styles.headerButtonWrapper
    ,
    headerLeft: () => (
      <>
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={() => navigation.goBack()}
        
        >
        <MaterialIcons name="chevron-left" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.searchIcon} 
        onPress={() => navigation.navigate("Search")}>
        <MaterialIcons name="search" size={20} color="black" />
      </TouchableOpacity>
      </>
    ),
    // headerRight: () => (
    //   <View style={styles.headerButton}>
    //   <>
    //     <TouchableOpacity
    //     onPress={()=>navigation.navigate("Favorites")}
        
    //     >
    //     <MaterialIcons name="favorite" size={22} color="red" 
    //       style={styles.favoriteIcon}
    //     />
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //     style={styles.cartIcon}
    //     onPress={()=>navigation.navigate("CheckOut")}
    //     >
    //     <MaterialIcons name="shopping-cart"  size={22} color="green"
    //    />
    //    <View>{}</View>
    //    </TouchableOpacity>
    //     </>
    //   </View>
    // ),
   headerRight:()=> <ProductsHeader navigation={navigation} />,

  })}
  />

<Stack.Screen name="CheckOut" component={CheckOut}

options={({ navigation }) => ({
            headerShown: true,
            title: 'Cart',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleContainer,
            headerLeft: () => (
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.headerButtonWrapper}>
              <TouchableOpacity style={styles.headerButton}
              onPress={()=>navigation.navigate("Products")}
              >
         
            <MaterialIcons name="home"  size={22} color="green" 
            />

              </TouchableOpacity>
              </View>
            ),
          })}
 />
 <Stack.Screen name="Favorites" component={Favorites}

options={({ navigation }) => ({
            headerShown: true,
            title: 'Favorites',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleContainer,
            headerLeft: () => (
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
            ),
         headerRight:()=><ProductsHeaderFavorites navigation={navigation}/>
           
          })}
 />

 <Stack.Screen 
name='Login'
component={Login}
 />


<Stack.Screen name="Search" component={SearchPage}

options={({ navigation }) => ({
            headerShown: true,
            headerTitle:"",
            headerTitleStyle: styles.headerTitleContainer,
            headerLeft: () => (
              <>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => navigation.goBack()}
                >
                <Icon name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              </>
            ),
            headerRight:()=><SearchHeader/>
           
          })}
 />


    </Stack.Navigator>
    </NavigationContainer>

    </Provider>
  );
}



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    
  },
  headerButton: {
    width:"auto",
    flexDirection:"row",
    alignItems:'center',
    padding: 10,
    
  },
  headerButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  headerButtonWrapper:{
    width:40,
    height:40,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#e5ebf3',
    overflow: 'hidden'
  },
  headerTitleContainer:{
    fontSize: 16,
    color: "black",
    fontWeight: '600',
  },
  favoriteIcon:{
    paddingRight:10
  },
  cartIcon:{
    width:40,
    height:40,
    backgroundColor:'#F0F8FF',
    borderRadius:20,
    justifyContent:'center',
    alignItems:"center",
    position:'relative'
  },
  cartBadge:{
   position:'absolute',
   width:20,
   height:20,
   borderRadius:10,
   backgroundColor:'green',
   justifyContent:"center",
   alignItems:'center',
   right:-10,
  bottom:25
  },
  cartBadgeText:{
    fontWeight:'700',
    color:'white'
  },
  searchIcon:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:'#F0F8FF',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:15

  },
  searchContainer: {
   
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft:20,
    display:'flex',
    flexDirection:"row"
  },
  searchInput: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
   
    width: '100%',
    color: 'black',
  },
  searchWrapper:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:"#F0F8FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    color: 'black',

  }
  
   
});

export default App;
