// import Realm from 'realm';


// const ProductSchema = {
//   name: 'Product',
//    primaryKey: '_id',
//   properties: {
//     _id: 'objectId',
//     uri: 'string',
//     title: 'string',
//     price: 'double',
//     oldPrice: 'double?',
//     percentage: 'double?',
//     quantity: { type: 'int', default: 1 },
//     type: 'string?',
//   },
// };


// const CartSchema = {
//     name: 'Cart',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       products: 'Product[]', 
//       totalPrice: 'double', 
//       createdAt: 'date', 
//       updatedAt: 'date?', 
//     },
//   };

// const FavoriteSchema = {
//   name: 'Favorite',
//   primaryKey: '_id',
//  properties: {
//     _id: 'objectId',
//     uri: 'string',
//     title: 'string',
//     price: 'double',
//     oldPrice: 'double?',
//     percentage: 'double?',
//     quantity: { type: 'int', default: 1 },
//     type: 'string?',
//   },
// };


// // const migration = (oldRealm, newRealm) => {
// //     if (oldRealm.schemaVersion < 3) {
// //       const oldFavorites = oldRealm.objects('Favorite');
// //       const newFavorites = newRealm.objects('Favorite');
  
// //       for (let i = 0; i < oldFavorites.length; i++) {
// //         const oldFavorite = oldFavorites[i];
// //         newFavorites[i].productIds = oldFavorite.products.map(p => p._id);
// //       }
// //     }
// //   };

// const migration = (oldRealm, newRealm) => {
//     if (oldRealm.schemaVersion < 3) {
//       // Migration logic for older schema versions, if needed
//       const oldFavorites = oldRealm.objects('Favorite');
//       const newFavorites = newRealm.objects('Favorite');
      
//       for (let i = 0; i < oldFavorites.length; i++) {
//         const oldFavorite = oldFavorites[i];
//         newFavorites[i].productIds = oldFavorite.products.map(p => p._id);
//       }
//     }
  
//     if (oldRealm.schemaVersion < 8) {
//       // Initialize new Cart schema or handle updates
//       const allCarts = oldRealm.objects('Cart');
     
//     }
//   };
  
  
  

// const realm = new Realm({
//   schema: [ProductSchema, FavoriteSchema],
//   schemaVersion: 8,
//   migration,
// });

// export default realm;

import Realm from 'realm';

const ProductSchema = {
  name: 'Product',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    uri: 'string',
    title: 'string',
    price: 'double',
    oldPrice: 'double?',
    percentage: 'double?',
    quantity: { type: 'int', default: 1 },
    type: 'string?',
    favorite: { type: 'bool', default: false },
  },
};

const CartSchema = {
  name: 'Cart',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    products: { type: 'list', objectType: 'Product' },
    totalPrice: 'double?',
    createdAt: 'date?',
    updatedAt: 'date?',
  },

};


const migration = (oldRealm, newRealm) => {
  if (oldRealm.schemaVersion < 9) {
   
    const allProducts = newRealm.objects('Product');

    allProducts.forEach(product => {
      if (product.favorite === undefined) {
        product.favorite = false;
      }
    });
  }
};

const realm = new Realm({
  schema: [ProductSchema, CartSchema],
  schemaVersion: 14,
  migration,
});

export default realm;
