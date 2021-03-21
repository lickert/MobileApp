import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  Image,
  Alert,
  TextComponent,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Fetch,
} from "react-native";

import bgImage from "../assets/SE.png";
import mainLogo from "../assets/logo(noborder).png";
//add code to import the logo once it is finished
import Icon from "react-native-vector-icons/Ionicons";
import { render } from "react-dom";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
const { width: WIDTH } = Dimensions.get("window");
const input_width_proportion = "80%";
const loginOptions = {method: 'GET', headers:{'Content-Type': 'application/json'}};

/**
 *  Login screen
 */
export default class Login extends React.Component {
   constructor(){
    super();
    this.state={
      username: '',
      password: '',
      token: '',
      response: '',
    }
  }

  

  updateValues(text, feild){
      if(feild == 'username')
      {
        this.setState({
          username: text,
        })
      }
      else if(feild == 'password')
      {
        this.setState({
          password: text,
        })
      }
      else if(feild == 'token')
      {
        this.setState({
          token: text,
        })
      }
  }

  

  submit(){
    const loginOptions = {method: 'GET', headers:{'Content-Type': 'application/json'}};
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert",
      "Incorrect username or password",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK" }
      ],
      { cancelable: false }
    );
    let collection={}
    collection.username=this.state.username,
    collection.password=this.state.password

  
    fetch(`${'http://142.93.15.132:3000'}/login/${collection.username}/${collection.password}`,loginOptions)
        .then(response => response.json())
        .then(data =>{
            if(data.ok){
              this.updateValues(data.token, 'token') 
              this.props.navigation.navigate("Home", {token: data.token})

            }else{
               createTwoButtonAlert();
                console.log('incorrect username or password')
            }
        }).catch(function(){
            createTwoButtonAlert();
            console.log("Error connectin to DB LOGIN")
        });
    /*Return Data*/ 
    /*Possible Error Codes
        failedToCreateToken: should only show up if server failed to create token. Let me know right away if this one shows up.
        userNotFound: the login name used did not match a user in the database
        invalidPassword: The password did not match the username (implies username was found in the database)*/
  }

  static navigationOptions = {
    title: "Login ",
  };

  render() {
    const { navigate } = this.props.navigation;
    

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={mainLogo} />
            <Text style={styles.logoText}>Inter-View </Text>
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"ios-person"}
              size={28}
              color="black"
              syle={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={"Username"}
              placeholderTextColor="black"
              onChangeText= {(text) => this.updateValues(text, 'username')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"ios-lock"}
              size={28}
              color="black"
              syle={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              placeholderTextColor="black"
              onChangeText= {(text) => this.updateValues(text, 'password')}
            />
          </View>
          <TouchableOpacity style={styles.login}>
            <Button
              title="Login"
              color="#2b3e85"
              //NOTE: to run lock screen through the database, uncomment the line directly below this, and comment out the line two lines below this (vise verse to text w/o database)
              onPress={() => this.submit()}
              //onPress={() => navigate("Home")}
              style={styles.text}
            ></Button>
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "white",
    fontSize: 50,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.8,
    paddingBottom: 15,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  input: {
    width: input_width_proportion,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: "white",
    color: "black",
    marginHorizontal: 15,
  },
  inputIcon: {
    position: "absolute",
  },
  inputContainer: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  showPW: {
    position: "absolute",
    top: 8,
    right: 37,
  },
  login: {
    width: 200,
    height: 45,
    fontSize: 16,
    marginTop: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});