import React, { Component } from "react";
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
  AppRegistry,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
const { height: HEIGHT } = Dimensions.get('window').height;
const { width: WIDTH } = Dimensions.get("window").width;



/**
 *  Meeting screen
 */
export default class Meeting extends React.Component {
  constructor(){
    super();
    this.state={
      lat:'',
      long:'',
      building:'',
      currentTime:null,
      currentDate:null,
      statusTime:null,
      refresh: true,
      attendees: null,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);

    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    let meetingDateTime = this.props.navigation.getParam('date');

    var days = parseInt((new Date(meetingDateTime) - new Date()) / (1000 * 3600 * 24));
    var hours = parseInt((new Date(meetingDateTime) - new Date())  / (1000 * 3600) - (days * 24) );
    var mins = parseInt((new Date(meetingDateTime) - new Date())  / (1000 * 60) - ((days * 1440) + (hours * 60)) );

    var text = "";
    if(days < 0 || hours < 0){
       text = "Completed";
    }
    else if(days == 0 && hours == 0){
      text = "Meeting currently running";
    }
    else if(this.props.navigation.getParam('date') == "Date undetermined"){
      text = "Undetermined";
    }
    else {
      text = "" + days + " day(s), " + hours + " hour(s), " + mins + " minute(s) to start.";
    }

    if(month < 10){
      month = '0' + month;
    }

    if(date < 10){
      date = '0' + date;
    }

    let propsAttendees = " ";
    if(this.props.navigation.getParam('interviewerName') == " "){
      propsAttendees = " no attendees listed";
    }
    else {
      var tempAttendee = "";
      tempAttendee = this.props.navigation.getParam('interviewerName').substring(0, this.props.navigation.getParam('interviewerName').indexOf(" Sa"));
      propsAttendees = propsAttendees + "• " + tempAttendee;
    }

    this.setState({attendees: propsAttendees });

    this.setState({ currentDate: meetingDateTime });

    this.setState({ statusTime: text});
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  updateMarker(){
    this.setState({ 
      refresh: false
  })
    console.log(this.props.navigation.getParam('location'))
    if(this.props.navigation.getParam('location') == "phillips")
    {
      this.lat = 44.796891,
      this.long = -91.499664,
      this.building = 'Phillips Science Hall'
    }
    else if(this.props.navigation.getParam('location') == 'centenial')
    {
      this.lat = 44.798320,
      this.long = -91.497480,
      this.building = 'Centennial Hall'
    }
    else if((this.props.navigation.getParam('location') == 'davies') || (this.props.navigation.getParam('location') == 'davis'))
    {
      this.lat = 44.797162,
      this.long = -91.501326,
      this.building = 'Davies Student Center'
    }
    else if(this.props.navigation.getParam('location') == 'haas')
    {
      this.lat = 44.800923,
      this.long = -91.501230,
      this.building = 'Haas Fine Arts Center'
    }
    else if(this.props.navigation.getParam('location') == 'hibbard')
    {
      this.lat = 44.799260,
      this.long = -91.497750,
      this.building = 'Hibbard Humanities Hall'
    }
    else if(this.props.navigation.getParam('location') == 'human sciences')
    {
      this.lat = 44.801250,
      this.long = -91.502810,
      this.building= 'Human Sciences and Services'
    }
    else if(this.props.navigation.getParam('location') == 'mcphee')
    {
      this.lat = 44.7929795,
      this.long = -91.5037531,
      this.building = 'McPhee Physical Education Center'

    }
    else if(this.props.navigation.getParam('location') == 'nursing')
    {
      this.lat = 44.7965149,
      this.long = -91.4924106,
      this.building = 'Nursing'
    }
   else  if(this.props.navigation.getParam('location') == 'schnider')
    {
      this.lat = 44.7981235,
      this.long = -91.4975202,
      this.building = 'Schneider Social Sciences'
    }
    else if(this.props.navigation.getParam('location') == 'schofeild')
    {
      this.lat = 44.7982161,
      this.long = -91.5018603,
      this.building = 'Schofield Hall'
    }
    else{
      this.lat = 44.7973773,
      this.long = -91.4981184,
      this.building = 'Vistors Center'
    }
  }

    render() {
      const { navigate } = this.props.navigation;
      if(this.state.refresh){
        this.updateMarker();
      }
      return (
          <View style={styles.background}>
            <View style={styles.infoContainer}>
              <View style={styles.titleView}>
                <Text style={styles.title}>{this.props.navigation.getParam('title')}</Text>
              </View>

            
            <Text style={{color: "gray", textDecorationLine: "underline"}}>Attendees </Text>
            <View style={styles.attendees}>
              {/* <Text style={styles.interviewer}>• {this.props.navigation.getParam('interviewerName')}</Text> */}
              <Text style={styles.interviewer}>{this.state.attendees}</Text>
              <Text style={styles.interviewerInfo}>    {this.props.navigation.getParam('interviewerTitle')}</Text>
            </View>

            <View style={styles.dateTimeView}>
              <Icon
                  style={styles.icon}
                  name={"ios-clock"}
                  size={25}
                  color="black"
                />
              <View style={styles.dateTime}>
                {/* <Text style={styles.date}>{this.props.navigation.getParam('date')}, </Text> */}
                <Text style={styles.date}>{this.state.currentDate}</Text>
                {/* <Text style={styles.time}>{this.props.navigation.getParam('time')}</Text> */}
              </View>
            </View>

            {/* <Text style={styles.location}>{this.state.currentDate}, {this.state.currentTime}</Text> */}
            <Text style={styles.location}>Meeting status: {this.state.statusTime}</Text>
            <View style={styles.locationFlex}>
              <Icon
                    style={{paddingTop: 1, paddingRight: 5}}
                    name={"ios-pin"}
                    size={20}
                    color="black"
                  />
              <Text style={styles.location}>{this.props.navigation.getParam('location')} {this.props.navigation.getParam('roomNumber')}</Text>
            </View>
            <MapView style={styles.mapStyle}
              initialRegion={{
                latitude: 44.797931, 
                longitude: -91.496508,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <MapView.Marker
                  title={this.building}
                  coordinate={{latitude: this.lat,
                    longitude: this.long}}
              />
            </MapView>
          </View>
        </View>
        );
    }
  }

  const styles = StyleSheet.create({
    background: {
      backgroundColor: "#dbd8d1",
      height: "100%",
      width: "100%",
      padding: 25,
    },
    infoContainer: {
      padding: 10,
      borderRadius: 18,
      backgroundColor: "#ecede9",
      height: "100%",
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 25,
    },
    titleIcon: {
      paddingRight: 20,
      paddingTop: 4,
    },
    title: {
      fontSize: 30,
      textDecorationLine: "underline",
    },
    attendees: {
      marginTop: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingBottom: 15,
    },
    interviewer: {
      fontSize: 18,
      paddingRight: 15,
    },
    interviewerInfo: {
      fontSize: 18,
      paddingRight: 15,

    },
    dateTimeView: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingBottom: 15,
    },
    dateTime: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingBottom: 7,
    },
    icon: {
      paddingTop: 11,
      paddingRight: 10,
    },
    date: {
      fontSize: 20,
    },
    time: {
      fontSize: 20,
    },
    location: {
      fontSize: 16,
      paddingBottom: 8,
    },
    mapStyle: {
      padding:10,
      height: "50%",
      justifyContent: 'center',
    },
    locationFlex: {
      flexDirection: "row",
    }
  });