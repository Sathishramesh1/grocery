import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 



const Login = () => {
  const [user, setUser] = useState({
    name: '',
    password: ''
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    console.log('Login pressed', user);
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.loginPageContainer}>
          <View style={styles.header}>
            <Text style={styles.text}>Welcome to</Text>
            <Text style={[styles.text, styles.bold]}>Grocery Store</Text>
          </View>

          <View style={styles.loginFieldContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
                placeholder="User name"
                placeholderTextColor="gray"
              />
              <MaterialIcons name="person" color="grey" size={26} style={styles.icon} />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  color="grey"
                  size={20}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signButton} onPress={handleLogin}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or</Text>

            <TouchableOpacity style={styles.faceBookButton}>
              <MaterialCommunityIcons name="facebook" color="white" size={26} 
              style={{
                position:'absolute',
                right:"100%"
              }}
               />
              <Text style={styles.signInText}>CONNECT WITH FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
              <MaterialCommunityIcons name="google" color="white" size={26} 
              style={{
                position:'absolute',
                right:"100%"
              }}
               />
              <Text style={styles.signInText}>CONNECT WITH GOOGLE</Text>
            </TouchableOpacity>

            <Text style={styles.newAccount}>
              Don't have any account? <Text style={styles.createAccount}>Create new account.</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loginPageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  text: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
  },
  bold: {
    fontWeight: '600',
  },
  header: {
    marginTop: '15%',
    marginBottom: '10%',
  },
  loginFieldContainer: {
    flex: 0.25,
  },
  inputWrapper: {
    marginBottom: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: "#f2fff2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    paddingLeft: 20,
    height: 50,
    flex: 1,
    color:'black'
  },
  icon: {
    paddingRight: 20,
    
  },
  forgetPasswordText: {
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 16,
    flex: 1,
  },
  signButton: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontWeight: "600",
    textAlign: 'center',
  },
  faceBookButton: {
    marginTop: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#4169E1",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
    flexDirection: 'row',
    paddingHorizontal: 20,
    position:"relative"
  },
  googleButton: {
    marginTop: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#0096FF",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  newAccount: {
    color: "black",
    marginTop: 16,
    textAlign: 'center',
  },
  createAccount: {
    color: 'green',
  },
  orText: {
    marginTop: 16,
    color: 'black',
    textAlign: 'center',
  },
});
