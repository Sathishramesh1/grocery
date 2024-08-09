import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-native-uuid';
import realm from '../database/Grocery';
import Realm from 'realm';

const fetchProductsFromRealm = () => {
    const products = realm.objects('Product');
    return products.map(product => ({
      id: product._id.toString(), 
      uri: product.uri,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      percentage: product.percentage,
      quantity: product.quantity,
      type: product.type,
      favorite: product.favorite,
    }));
  };


const initialState = {
//   products:[
//     {
//         id: uuid.v4(),
//         uri: "https://static.wixstatic.com/media/nsplsh_664c6577374576635a5f34~mv2_d_4000_6000_s_4_2.jpg/v1/fill/w_732,h_794,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/nsplsh_664c6577374576635a5f34~mv2_d_4000_6000_s_4_2.jpg",
//         title: "Orange Fresh",
//         price:5.00,
//         quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://housing.com/news/wp-content/uploads/2023/12/tomato-tree-f.jpg",
//         title: "Fresh red tomatoes",
//         price:5.00,
//         quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQhGh71NfkvD3UVSrYCF38AwQRMoW4xRWpa7VvtjaXh9hceDHwd",
//         title: "Green beans",
//         price:5.00,
//         quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://rukminim2.flixcart.com/image/832/832/kp8ntzk0/plant-seed/m/e/2/120-jersey-boy-hybrid-tomato-120-seeds-vibex-original-imag3gbahxwkujnn.jpeg?q=70&crop=false",
//         title: "Tomato Pure ",
//         type:"Organic",
//         price:12.00,
//         quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://earth2you.foodhub.org.za/Images/520x520/products/6563/r.jpg?fmt=lossy",
//         title: "Avocado Creamy",
//          type:"Pure, Fresh",
//          price:22.00,
//          oldPrice:28.00,
//          percentage:23.00,
//          quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZydWl0fGVufDB8fDB8fHww",
//         title: "Pine Apple",
//          type:"Pure, Fresh",
//          price:22.00,
//          oldPrice:28.00,
//          percentage:23.00,
//          quantity:1
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://t3.ftcdn.net/jpg/04/58/46/46/240_F_458464679_EnqNXkEIesJj0d0qIIHxSz7S7s2hGlbX.jpg",
//         title: "Apple",
//          type:"Pure, Fresh",
//          price:22.00,
//          oldPrice:28.00,
//          percentage:23.00,
//          quantity:1
       
//       },
//       {
//         id: uuid.v4(),
//         uri: "https://t4.ftcdn.net/jpg/01/51/23/87/240_F_151238731_b6loT4a2jwqLMFvsvgITsfzhBeMoh2Q9.jpg",
//         title: "Apple",
//          type:"Pure, Fresh",
//          price:22.00,
//          oldPrice:28.00,
//          percentage:23.00,
//          quantity:1
        
//       },
//   ],
  // favorites:[],
  products:fetchProductsFromRealm(),
  search:""
}

export const counterSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    // handleFavorites:(state,action)=>{
    //     const productId = action.payload;
    //   const favoriteIndex = state.favorites.findIndex(fav => fav.id === productId);

    //   if (favoriteIndex >= 0) {
        
    //     state.favorites.splice(favoriteIndex, 1);
    //   } else {
    //     const product = state.products.find(prod => prod.id === productId);
    //     if (product) {
    //       state.favorites.push(product);
    //     }
    //   }

    // }
    handleFavorites: (state, action) => {
      const productId = action.payload;
      
      realm.write(() => {
        const product = realm.objects('Product').filtered('_id == $0', new Realm.BSON.ObjectId(productId))[0];
        if (product) {
          product.favorite = !product.favorite; 
        }
      });
     
      const productIndex = state.products.findIndex(prod => prod.id === productId);
      if (productIndex >= 0) {
        state.products[productIndex].favorite = !state.products[productIndex].favorite;
      }
    },
     // New reducer to update search text input
     updateSearchText: (state, action) => {
      state.search = action.payload;
    },

  },
})


export const { handleFavorites,updateSearchText } = counterSlice.actions

export default counterSlice.reducer