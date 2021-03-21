import React, { useState } from "react";
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
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

//Team Mobile, 10/5/2020
//Logan Ickert and Luke Hartman

import { render } from "react-dom";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
const { width: WIDTH } = Dimensions.get("window");
const input_width_proportion = "80%";

// Components
import Login from "./src/login";
import Home from "./src/home";
import Meeting from "./src/meeting";
import Help from "./src/help";
import SideBar from "./Components/SideBar"

const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: Home, navigationOptions: 
      { drawerIcon: ({tintColor}) => <Icon name={"ios-home"} size={30} color={tintColor}/> } },
  Login: { screen: Login, navigationOptions: 
      { title: "Log out ", drawerIcon: ({tintColor}) => <Icon name={"ios-log-out"} size={30} color={tintColor}/>  }, },
},
{
  contentComponent: props => <SideBar {...props} />
}
);

const AppStackNavigator = createStackNavigator({
  Login: { screen: Login, navigationOptions: { headerShown: false }, },
  Home: { screen: AppDrawerNavigator, navigationOptions: { headerShown: false }, },
  Help: { screen: Help },
  Meeting: { screen: Meeting },
});

const App = createAppContainer(AppStackNavigator);

export default App;