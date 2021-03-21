import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  Image,
  TextComponent,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import bgImage from "../assets/login-bg.png";
//add code to import the logo once it is finished
import Icon from "react-native-vector-icons/Ionicons";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
const { width: WIDTH } = Dimensions.get("window");
const input_width_proportion = "80%";

/**
 *  Meeting screen
 */
export default class Meeting extends React.Component {
    static navigationOptions = {
      title: "Help ",
    };
  
    render() {
      const { navigate } = this.props.navigation;
  
      return (
          <View style={styles.background}>
            <Text>Developed in the Fall 2020 semester for CS 485, Software Engineering II, by six UWEC students (Andrew Senapatiratne, Megan Heindl, Christopher Springett, Chase Karolewski, Logan Ickert, and Luke Hartman).</Text>
            <Text style={{paddingTop: 10}}>The purpose of this application is to give individuals applying for faculty positions a tool to track their interview and meeting schedule.  With this mobile app, users can log in using their unique login username and password, view all upcoming meetings/interviews, and access meeting details.</Text>
        </View>
        );
    }
  }

  const styles = StyleSheet.create({
    background: {
      backgroundColor: "#ecede9",
      padding: 15,
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
  });