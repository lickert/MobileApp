import React from 'react'
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import Icon from "react-native-vector-icons/Ionicons";
import mainLogo from "../assets/logo(noborder).png";

export default Sidebar = props => (
    <View>
        <View style={styles.header}>
            <Image style={styles.logo} source={mainLogo} />
            <Text style={{paddingLeft: 5, fontSize: 25, color: "white", paddingTop: 5}}>Welcome!</Text>
        </View>
        <DrawerNavigatorItems {...props} />
    </View>
);

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        backgroundColor: "#edac1a",
        flexDirection: "row",
        justifyContent: "center",
        paddingRight: 15,
        paddingBottom: 5,
        // borderBottomColor: "black",
        // borderBottomWidth: 1,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2.22,
        elevation: 5,
    },
    logo: {
        maxWidth: 45,
        maxHeight: 45,
    }
})