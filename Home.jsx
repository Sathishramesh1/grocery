import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const { height } = Dimensions.get('window');

function Home({ navigation }){


    return(
      <View style={homeStyles.homeContainer}>
  
      <View style ={homeStyles.homeTop}>
        <Image 
        style={homeStyles.image}
        source={{uri:"https://a0.anyrgb.com/pngimg/1116/940/vegetables-%D0%B8-vegetables-%D0%B8-fruits-vegetables-fruits-bell-peppers-and-chili-peppers-whole-food-potato-and-tomato-genus-tomato-local-food-spice-thumbnail.png"}}/>
      </View>
        <View style ={homeStyles.homeBottom}>
  
  <Text style={homeStyles.heading}>Fresh Items Offers</Text>
  
  <Text style={homeStyles.content}>
    We try out our best level to make sure our customer
  </Text>
  <Text style={homeStyles.content}>
    happiness by fresh grocery item
  </Text>
  
  <TouchableOpacity style={homeStyles.button}
  onPress={() => navigation.navigate('Products')}
  >
  <Text  style={homeStyles.text}>
    GET STARTED
    </Text>
  </TouchableOpacity>
        </View>
      </View>
    ) 
  }
  
  
  
  const homeStyles=StyleSheet.create({
  homeContainer:{
    flex:1,
    flexDirection:"column",
    backgroundColor:"#FFFFFF",
    justifyContent: 'center', 
    alignItems:"center",
     width:"100%",
  
  },
  homeText:{
    color:"black",
  },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height:height,
    
  },
  homeTop:{
  
    flex:0.5,
    width:"100%",
    paddingHorizontal:32,
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent:"center"
   
    
  
  },
  image:{
    paddingHorizontal:32,
    width: 300,
    height: 300,
    borderRadius:150,
    resizeMode:"cover", 
  
  },
  homeBottom:{
    flex:0.4,
    flexDirection:"column"
  
  },
  heading:{
    marginTop:"5%",
    color:"black",
    fontSize:30,
    fontWeight:"700",
  textAlign:"center"
  },
  content:{
    color:"grey",
    textAlign:"center"
  },
  button:{
  flex:0.3,
  backgroundColor:"red",
  justifyContent:"center",
  backgroundColor: "green",
  paddingHorizontal: 16, 
  borderRadius: 30, 
  marginTop: "auto",
  marginBottom:40,
  elevation: 5, 
  
  },
  text:{
    color:"white",
    fontWeight:"600",
    textAlign:"center"
  
  },
  dots:{
    flex:1,
    flexDirection:"row",
    // alignContent:"center",
    justifyContent:"center"
  
  },
  dotContent:{
    width:20,
    height:15,
    backgroundColor:"green"
    
  },
  headerButton: {
    // marginRight: 10,
    padding: 10,
    // backgroundColor: 'green',
    borderRadius: 5,
  },
  headerButtonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  headerButtonWrapper:{
    width:50,
    height:50,
    borderRadius:25,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#e5ebf3',
    overflow: 'hidden'
  }
  
  
  })
  
  
  export default Home;