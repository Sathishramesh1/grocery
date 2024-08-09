import { createSlice } from '@reduxjs/toolkit'
import realm from '../database/Grocery';
import Realm from 'realm';

export const fetchProductsFromRealm = () => {
  const cart = realm.objects('Cart')[0];
  
  if (!cart) return { products: [], totalPrice: 0 };

  const products = cart.products.map(product => ({
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

  return {
    products,
    totalPrice: cart.totalPrice || 0,
  };
};



// const initialState = {
//   cart:fetchProductsFromRealm(),
//   totalPrice:0,
  
// }

const initialState=fetchProductsFromRealm();


export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    //handle the adding and removing product from the cart
    // handleCart:(state,action)=>{

    //   const item = action.payload;
     
    //   const itemInCart = state.cart.find(cartItem => cartItem.id === item.id);

    //   if (itemInCart) {
       
    //     state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
    //   } else {
    //     state.cart.push(item);
    //   }

    //    // Calculate total price
    //    state.totalPrice = calculateTotalPrice(state.cart);

    //   console.log("from the cart",state.cart);
    // },
    handleCart: (state, action) => {
      const item = action.payload;
      const itemId = new Realm.BSON.ObjectId(item.id);
    
      realm.write(() => {
        
        let cart = realm.objects('Cart')[0];
        
        if (!cart) {
          
          cart = realm.create('Cart', {
            _id: new Realm.BSON.ObjectId(),
            products: [], 
            totalPrice: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        
        
        let existingProduct = cart.products.filtered('_id == $0', itemId)[0];
        
        if (existingProduct) {
         
          existingProduct.quantity += (1 || 1);
        } else {
         
          const existingProductInDb = realm.objectForPrimaryKey('Product', itemId);
          
          if (existingProductInDb) {
            // If the product exists in the database, add it to the cart
            cart.products.push(existingProductInDb);
          } else {
            // Create a new product and add it to the cart's products list
            const newProduct = realm.create('Product', {
              _id: itemId,
              uri: item.uri,
              title: item.title,
              price: item.price,
              oldPrice: item.oldPrice,
              percentage: item.percentage,
              quantity: item.quantity || 1,
              type: item.type,
              favorite: item.favorite || false,
            });
        
           
            cart.products.push(newProduct);
          }
        }
        
      
        const updatedTotalPrice = cart.products.reduce((total, product) => {
          return total + (product.price * product.quantity);
        }, 0);
        
      
        cart.totalPrice = updatedTotalPrice;
        cart.updatedAt = new Date();
        
       
        const updatedCart = fetchProductsFromRealm();
        state.cart = updatedCart.products;
        console.log("statecart ", state.cart);
        state.totalPrice = updatedCart.totalPrice;
      });
    },
    
    // handleRemoveCart: (state, action) => {
    //   const item = action.payload;
    //   const itemId = new Realm.BSON.ObjectId(item.id);
    
    //   realm.write(() => {
    //     let cart = realm.objects('Cart')[0];
        
    //     if (cart) {
    //       // Find the specific product to remove
    //       const productToRemove = cart.products.filtered('_id == $0', itemId)[0];
          
    //       if (productToRemove) {
    //         // Remove the specific product from the cart
    //         cart.products = cart.products.filter(product => product._id.toString() !== itemId.toString());
            
    //         // Calculate the updated total price
    //         const updatedTotalPrice = cart.products.reduce((total, product) => {
    //           return total + (product.price * product.quantity);
    //         }, 0);
            
    //         // Update the total price and updatedAt fields in the cart
    //         cart.totalPrice = updatedTotalPrice;
    //         cart.updatedAt = new Date();
            
    //         // Update Redux state from Realm
    //         const updatedCart = fetchProductsFromRealm();
    //         state.cart = updatedCart.products;
    //         state.totalPrice = updatedCart.totalPrice;
    //       }
    //     }
    //   });
    // },
    
    
    
    

  //   handleQuantity:(state,action)=>{
  //       const { id, change } = action.payload;

  // const item = state.cart.find(cartItem => cartItem.id === id);

  // if (item) {
  //   if (item.quantity + change <= 0) {
      
  //     state.cart = state.cart.filter(cartItem => cartItem.id !== id);
  //   } else {
      
  //     state.cart=state.cart.map((ele)=>ele.id==id?{...ele,quantity:(ele.quantity||1)+change}:ele);
  //   }
  // }

  // // Recalculate total price
  // state.totalPrice = calculateTotalPrice(state.cart);

 

  

  //   }

  handleRemoveCart: (state, action) => {
    const item = action.payload;
    const itemId = new Realm.BSON.ObjectId(item.id);
  
    realm.write(() => {
      let cart = realm.objects('Cart')[0];
      
      if (cart) {
        // Find the specific product to remove
        const productToRemove = cart.products.filtered('_id == $0', itemId)[0];
        
        if (productToRemove) {
          // Remove the specific product from the cart
          cart.products.splice(cart.products.indexOf(productToRemove), 1);
          // realm.delete(productToRemove);
          
          // Calculate the updated total price
          const updatedTotalPrice = cart.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
          }, 0);
          
          // Update the total price and updatedAt fields in the cart
          cart.totalPrice = updatedTotalPrice;
          cart.updatedAt = new Date();
          
          // Update Redux state from Realm
          const updatedCart = fetchProductsFromRealm();
          state.cart = updatedCart.products;
          state.totalPrice = updatedCart.totalPrice;
        }
      }
    });
  },
  

  // handleQuantity: (state, action) => {
  //   const { id, change } = action.payload;
  //   const itemId = new Realm.BSON.ObjectId(id);
    
  //   realm.write(() => {
  //     let cart = realm.objects('Cart')[0];
      
  //     if (cart) {
  //       let existingProduct = cart.products.filtered('_id == $0', itemId)[0];
        
  //       if (existingProduct) {
  //         if (existingProduct.quantity + change <= 0) {
  //           cart.products = cart.products.filtered('_id != $0', itemId);
  //         } else {
  //           existingProduct.quantity += change;
  //         }
          
  //         const updatedTotalPrice = cart.products.reduce((total, product) => {
  //           return total + (product.price * product.quantity);
  //         }, 0);
          
  //         cart.totalPrice = updatedTotalPrice;
  //         cart.updatedAt = new Date();
          
  //         const updatedCart = fetchProductsFromRealm();
  //         state.cart = updatedCart.products;
  //         state.totalPrice = updatedCart.totalPrice;
  //       }
  //     }
  //   });
  // },

  handleQuantity: (state, action) => {
    const { id, change } = action.payload;
    const itemId = new Realm.BSON.ObjectId(id);
    
    realm.write(() => {
      let cart = realm.objects('Cart')[0];
      
      if (cart) {
        let existingProduct = cart.products.filtered('_id == $0', itemId)[0];
        
        if (existingProduct) {
          if (existingProduct.quantity + change <= 0) {
            // cart.products = cart.products.filtered('_id != $0', itemId);
            cart.products.splice(cart.products.indexOf(existingProduct), 1);
          } else {
            existingProduct.quantity += change;
          }
          
          const updatedTotalPrice = cart.products.reduce((total, product) => {
            return total + (product.price * product.quantity);
          }, 0);
          
          cart.totalPrice = updatedTotalPrice;
          cart.updatedAt = new Date();
          
          const updatedCart = fetchProductsFromRealm();
          state.cart = updatedCart.products;
          state.totalPrice = updatedCart.totalPrice;
        }
      }
    });
  },

  setInitialCartData: (state, action) => {
    state.cart = action.payload.products;
    state.totalPrice = action.payload.totalPrice;
  },
  },
})


export const { handleCart,handleQuantity,handleRemoveCart,setInitialCartData } = counterSlice.actions

export default counterSlice.reducer