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

enableScreens();


const Stack = createNativeStackNavigator();



export const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const [groceryState, setGroceryState] = useState({
    items: [
      {
        id: uuid.v4(),
        uri: "https://static.wixstatic.com/media/nsplsh_664c6577374576635a5f34~mv2_d_4000_6000_s_4_2.jpg/v1/fill/w_732,h_794,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/nsplsh_664c6577374576635a5f34~mv2_d_4000_6000_s_4_2.jpg",
        title: "Orange Fresh",
        price:5.00,
        qty:1
      },
      {
        id: uuid.v4(),
        uri: "https://housing.com/news/wp-content/uploads/2023/12/tomato-tree-f.jpg",
        title: "Fresh red tomatoes",
        price:5.00,
        qty:1
      },
      {
        id: uuid.v4(),
        uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQhGh71NfkvD3UVSrYCF38AwQRMoW4xRWpa7VvtjaXh9hceDHwd",
        title: "Green beans",
        price:5.00,
        qty:1
      },
    ],
    cart: [
      {
        id: uuid.v4(),
        uri: "https://rukminim2.flixcart.com/image/832/832/kp8ntzk0/plant-seed/m/e/2/120-jersey-boy-hybrid-tomato-120-seeds-vibex-original-imag3gbahxwkujnn.jpeg?q=70&crop=false",
        title: "Tomato Pure ",
        type:"Organic",
        price:12.00,
        qty:1
      },
      {
        id: uuid.v4(),
        uri: "https://earth2you.foodhub.org.za/Images/520x520/products/6563/r.jpg?fmt=lossy",
        title: "Avocado Creamy",
         type:"Pure, Fresh",
         price:22.00,
         oldPrice:28.00,
         percentage:23.00,
         qty:1
      },
    ],
  });

  return (
    <GroceryContext.Provider value={{ groceryState, setGroceryState }}>
      {children}
    </GroceryContext.Provider>
  );
};


function App(){
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
 
    <GroceryProvider>
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
    headerTitleStyle: {
      fontSize: 16,
      color: "black",
      fontWeight: '600',
    },
    headerLeft: () => (
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="chevron-left" size={30} color="black" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Filter</Text>
      </TouchableOpacity>
    ),
  })}
        />

<Stack.Screen name="CheckOut" component={CheckOut}

options={({ navigation }) => ({
            headerShown: true,
            title: 'CheckOut',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16,
              color: "black",
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={() => navigation.goBack()}
              >
                <Icon name="chevron-left" size={20} color="black" />

              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.headerButtonWrapper}>
              <TouchableOpacity style={styles.headerButton}>
            {/* <Icon name="cart-arrow-down" size={20} color="green" outlined /> */}
            {/* <MaterialCommunityIcons name="cart-outline" size={22} color="green" outlined/> 
            */}
            <MaterialIcons name="shopping-cart"  size={22} color="green" 
            />
              </TouchableOpacity>
              </View>
            ),
          })}
 />
      </Stack.Navigator>
    </NavigationContainer>
    </GroceryProvider>
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
    padding: 10,
    // backgroundColor:"red",
    borderRadius: 5,
  },
  headerButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  headerButtonWrapper:{
    width:40,
    height:40,
    borderRadius:20,
    // marginRight:12,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#e5ebf3',
    overflow: 'hidden'
  }
   
});

export default App;
