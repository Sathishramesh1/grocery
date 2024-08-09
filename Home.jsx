import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Realm from "realm";
 Realm.flags.THROW_ON_GLOBAL_REALM = true;

import realm from './database/Grocery'
import { useSelector } from 'react-redux';


function Home({navigation}) {

const {products}=useSelector(state=>state.product);




const addInitialData = () => {
  realm.write(() => {
    products.forEach(product => {
      realm.create('Product', {
        _id: new Realm.BSON.ObjectId(), 
        uri: product.uri,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice || null,
        percentage: product.percentage || null,
        quantity: product.quantity,
        type: product.type || null,
      });
    });
  });
};

  return (
    <View style={homeStyles.homeContainer}>
      <View style={homeStyles.homeTop}>
        <View style={homeStyles.styleDot}></View>
        <View style={homeStyles.squareDot}></View>
        <View style={homeStyles.styleDot1}></View>
        <View style={homeStyles.styleDot2}></View>
        <View style={homeStyles.squareDot2}></View>

        <View style={homeStyles.imageWrapper}>
          <Image
            style={homeStyles.image}
            // source={{uri:"https://a0.anyrgb.com/pngimg/1116/940/vegetables-%D0%B8-vegetables-%D0%B8-fruits-vegetables-fruits-bell-peppers-and-chili-peppers-whole-food-potato-and-tomato-genus-tomato-local-food-spice-thumbnail.png"}}

            source={require('./assets/edited.png')}
          />
        </View>
      </View>
      <View style={homeStyles.homeBottom}>
        <Text style={homeStyles.heading}>Fresh Items Offers</Text>

        <Text style={homeStyles.content}>
          We try out our best level to make sure our customer
        </Text>
        <Text style={homeStyles.content}>happiness by fresh grocery item</Text>

        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => navigation.navigate('Products')}>
          <Text style={homeStyles.text}>GET STARTED</Text>
        </TouchableOpacity>
        {/* <Button title='add initial'
   onPress={addInitialData}

        /> */}
      </View>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  homeText: {
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: height,
  },
  homeTop: {
    flex: 0.5,
    width: '100%',
    paddingHorizontal: 32,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  homeBottom: {
    
    flex: 0.4,
    flexDirection: 'column',
    // justifyContent:"space-around",
    // backgroundColor:'red'
  },
  heading: {
    marginTop: '10%',
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    // marginTop:50
  },
  content: {
    color: 'grey',
    textAlign: 'center',
  },
  button: {
    flex: 0.3,
    backgroundColor: 'red',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 16,
    borderRadius: 30,
    marginTop: 'auto',
    marginBottom: 40,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  dots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotContent: {
    width: 20,
    height: 15,
    backgroundColor: 'green',
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
  },
  headerButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  headerButtonWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5ebf3',
    overflow: 'hidden',
  },
  styleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    overflow: 'hidden',
    left: '-42%',
    top: 120,
    zIndex: 999,
  },
  squareDot: {
    width: 10,
    height: 10,
    backgroundColor: 'gold',
    overflow: 'hidden',
    left: '-38%',
    top: 90,
    zIndex: 999,
    transform: [{rotate: '30deg'}],
  },
  styleDot1: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    overflow: 'hidden',
    left: '-35%',
    top: '61%',
    zIndex: 999,
  },
  styleDot2: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    overflow: 'hidden',
    left: '38%',
    top: '75%',
    zIndex: 9999,
  },
  squareDot2: {
    width: 10,
    height: 10,
    backgroundColor: 'gold',
    overflow: 'hidden',
    left: '41%',
    top: '68%',
    transform: [{rotate: '45deg'}],
    zIndex: 999,
  },
  imageWrapper: {
    paddingHorizontal: 32,
    flex: 1,
    borderRadius: 180,
    backgroundColor: '#fbf4e2',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default Home;
