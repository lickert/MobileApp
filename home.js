import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Fetch,
  ActivityIndicator
} from "react-native";
import bgImage from "../assets/login-bg.png";
import Icon from "react-native-vector-icons/Ionicons";

const { width: WIDTH } = Dimensions.get("window");
const input_width_proportion = "80%";
const { height } = Dimensions.get('window');

/*
const meetings = [
  { id: "1", title: "Initial Interview",  interviewerName: "Person XYZ", interviewerTitle: "CS Professor", date: "2020/12/07", time: "13:00:00", location: "Phillips", roomNumber: "100"},
  { id: "2", title: "Interview with CS Staff",  interviewerName: "Person ABC & Person EFG", interviewerTitle: "CS Professors", date: "2020/12/08", time: "16:30:00", location: "Hibbard", roomNumber: "200"},
  { id: "3", title: "Phone Interview",  interviewerName: "Person 123", interviewerTitle: "CS Staffperson", date: "2020/12/14", time: "11:00:00", location: "Virtual", roomNumber: " "},
  { id: "4", title: "Interview with CS Chair",  interviewerName: "Person 987", interviewerTitle: "CS Chair", date: "2020/12/16", time: "14:30:00", location: "Phillips", roomNumber: "250"},
  { id: "5", title: "Lecture",  interviewerName: "CS 260 class", interviewerTitle: "Students", date: "2021/01/02", time: "08:00:00", location: "Centennial", roomNumber: "325"},
];*/

const meetings = [
  
  { id: "1", title: " ",  interviewerName: " ", interviewerTitle: " ", date: " ", location: " ", roomNumber: " "},
  { id: "2", title: " ",  interviewerName: " ", interviewerTitle: " ", date: " ", location: " ", roomNumber: " "},
  { id: "3", title: " ",  interviewerName: " ", interviewerTitle: " ", date: " ", location: " ", roomNumber: " "},
  { id: "4", title: " ",  interviewerName: " ", interviewerTitle: " ", date: " ", location: " ", roomNumber: " "},
  
];


/**
 *  Home screen
 */
export default class Home extends React.Component {
  

  populate(){
    /*Fetch*/
    var k;
    for(k = 0; k < meetings.length; k++)
    {
      meetings[k].title = " ";
      meetings[k].interviewerName = " ";
      meetings[k].interviewerTitle = " ";
      meetings[k].date = " ";
      meetings[k].location = " ";
      meetings[k].roomNumber = " ";

    }
     const meetingListOptions = {method: 'GET', headers:{'Content-Type': 'application/json'}};
      fetch(`${'http://142.93.15.132:3000'}/candidateLoadSchedule/${this.token}`, meetingListOptions)
          .then(response =>  response.json())
          .then(data =>{
            console.log(data)
              if(data.ok){
                  var i;
                  for(i = 0; i < data.meetings.length; i++)
                  {
                    meetings[i].title = data.meetings[i].meetingName;
                    meetings[i].location = data.meetings[i].roomBuilding;
                    meetings[i].roomNumber = data.meetings[i].roomNumber;
                    let tempMeetingStartTime = data.meetings[i].meetingStartTime;
                    if(tempMeetingStartTime != null){
                      let firstPart = tempMeetingStartTime.substring(0, 6);
                      let lastPart = tempMeetingStartTime.substring(7);
                      tempMeetingStartTime = firstPart + "2" + lastPart;
                      tempMeetingStartTime = tempMeetingStartTime.replace("T"," ");
                      tempMeetingStartTime = tempMeetingStartTime.replace(/-/g, '/');
                      tempMeetingStartTime = tempMeetingStartTime.replace("-","/");
                      tempMeetingStartTime = tempMeetingStartTime.substring(0, tempMeetingStartTime.length - 5);
                      meetings[i].date = tempMeetingStartTime;
                    }
                    else{
                      meetings[i].date = "Date undetermined";
                    }
                    var m = data.meetings[i].meetingId
                    const listMeetingParticipantsOptions = {method: 'GET', headers:{'Content-Type': 'application/json'}};
                    var pointer = i;
                    fetch(`${'http://142.93.15.132:3000'}/listMeetingParticipants2/${this.token}/${m}`, listMeetingParticipantsOptions)
                        .then(response =>  response.json())
                        .then(data =>{
                            if(data.ok){
                              var j;
                              for(j = 0; j < data.meetings.length; j++)
                              {
                                  meetings[pointer].interviewerName += data.meetings[j].firstName + " " + data.meetings[j].lastName+ " "
                              }
                              
                            }else{
                              console.log("meeting participant failure")
                            }
                        });
                        
                  }
                  this.setState({ 
                    refresh: true
                })
                  
              }else{
               console.log("Error in populate")
              }
          });
  } 
  constructor(){
    super();
    this.state={
      token:'',
    }
    this.state={
      refresh: false,
    }
  }
  static navigationOptions = {
    title: "Home ",
  };
  
  render() {
    const { navigate } = this.props.navigation;
    this.token = this.props.navigation.getParam('token');

    //To get the old screen back remove the if statement and all of its contents  and just remove the else{ and on } from below it
    // Current issue: this.state.loading is being set as false inside of populate, however when i make the call inside of populate
    // the returned value of the screen in the if statement below is still being called
    
    if(!this.state.refresh){
      this.populate();
    }
      
    return (
      <View style={styles.homeBackgroundContainer}>

        <View style={styles.header}>

          <TouchableOpacity onPress={this.props.navigation.openDrawer}>
            <Icon
              style={styles.menuIcon}
              name={"ios-menu"}
              size={30}
              color="white"
            />
          </TouchableOpacity>

          <Text style={{fontSize: 25, color: "white"}}>Inter-View </Text>

          <TouchableOpacity onPress={() => navigate("Help")}>
            <Icon
              style={styles.helpIcon}
              name={"ios-help"}
              size={35}
              color="white"
            />
          </TouchableOpacity>

        </View>

        <View style={{width: "100%", paddingLeft: 20, paddingRight: 20}}>

          {/* <TouchableOpacity style={styles.notifications}>
              <Text style={styles.notificationsText}>Notifications </Text>
              <Icon style={{paddingRight: 5}} name={"ios-information-circle-outline"} size={32}/>
          </TouchableOpacity> */}

          <Text style={{fontSize: 25, color: "black", paddingBottom: 15, paddingTop: 15}}>Meeting Timeline</Text>

        </View>  

        <FlatList
          style={styles.meetingCards}
          data={meetings}
          extraData={this.state.refresh}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.meetingCard} onPress={() => 
            {if(item.title!= " "){
              navigate("Meeting", item)}}}>
              <View style={styles.meetingCardLeft}>
                <Text style={styles.title}>{ item.title }</Text>
                <Text style={styles.date}>{ item.date }</Text>
                {/* <Text style={styles.interviewerName}>{ item.interviewerName }</Text>
                <Text style={styles.interviewerTitle}>{ item.interviewerTitle }</Text> */}
              </View>
              <View style={styles.meetingCardRight} >

                {/* <Text style={styles.time}>{ item.time }</Text> */}
                <Icon
                  style={{paddingTop: 1}}
                  name={"ios-pin"}
                  size={20}
                  color="black"
                />
                <Text style={styles.location}>{item.location } { item.roomNumber }</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  homeBackgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#dbd8d1",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    paddingTop: 10,
    width: "100%",
    height: "12%",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "#2b3e85",
  },
  menuIcon: {
    paddingLeft: 25,
  },
  helpIcon: {
    paddingRight: 25,
  },
  notifications: {
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "#ecede9",
  },
  notificationsText: {
    fontSize: 24,
    paddingLeft: 5,
  },
  meetingCards: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
  },
  meetingCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#ecede9",
  },
  meetingCardLeft: {
    padding: 10,
    paddingRight: 15,
    borderRightColor: "#404040",
    borderRightWidth: 1,
    width: "60%",
  },
  title: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  interviewerName: {
    fontSize: 18,
  },
  interviewerTitle: {
    fontSize: 14,
  },
  date: {
    fontSize: 18,
  },
  time: {
    fontSize: 20,
  },
  location: {
    fontSize: 16,
    paddingLeft: 5,
  },
  meetingCardRight: {
    padding: 10,
    flexDirection: "row",
  },
  loginButton: {
    width: 125,
    height: 45,
    fontSize: 16,
    marginTop: 20,
  },
});