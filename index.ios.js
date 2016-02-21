"use strict";

import BackgroundGeo from './geo-location';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
} from 'react-native';

import EventListView from './EventListView'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
const styles= require('./styles');

class DiaryList extends Component {
  constructor() {
      super();
      this.state = { lat:0, lng: 0,
          allEvents: [],
          onEvents: [],
          user: null,
          nextEventCoordinates: [],
          nextEvent: null,
          currentCoordinates: [40.706419, -74.009081], //DBC office coordinates. hardcoded for now
          durationToNextEvent: null,
      };
      new BackgroundGeo(this);
      setInterval(() => {
          this.doMainCheckLoop()
      }, 5000)

  GoogleSignin.configure({
      iosClientId: "430891231916-hej7na4spktej6ofjofis7gphtlg5op3.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/calendar"]
    });
  }

  signIn() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({user: user});
        this.loadEventsFromCalendar();
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  signOut() {
    GoogleSignin.signOut()
      .then(() => {
        console.log('out');
        this.setState({user: null});
      })
      .catch((err) => {
      });
  }

  loadEventsFromCalendar() {
    return fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: {
        "Authorization": "Bearer " + this.state.user.accessToken
      }
    })
      .then((response) => response.json())
      .then((json) => {
        var futureEvents = json.items.filter((event) => new Date(event.start.dateTime) > new Date()).sort(
            function (a,b) {
              if (new Date(a.start.dateTime) < new Date(b.start.dateTime))
                return -1;
              else if (new Date(a.start.dateTime) > new Date(b.start.dateTime))
                return 1;
              else
                return 0;
            }
          );
        this.setState({
          allEvents: futureEvents,
          nextEvent: futureEvents[0]
         })
      })
  }

  addressToCoordinates(address) {
    var formattedAddress = address.replace(/ /g,"+")
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formattedAddress + "&key=AIzaSyCCyBbVWsgVD7NQmDXcwF7w0GKbL00SiUA"
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({nextEventCoordinates: [json.results['0'].geometry.location.lat, json.results['0'].geometry.location.lng]} )
      })
  }

  doMainCheckLoop() {
    if (this.state.user){
      this.loadEventsFromCalendar().then(() => {
        this.addressToCoordinates(this.state.nextEvent.location);
      }).then(() => {
        this.trafficTime().then(() => {
          this.postToServer()
          alert('Your next event is ' + this.state.nextEvent.summary + " takes " + this.state.durationToNextEvent + "seconds");
          });
        })
    }
  }

  postToServer(){
    fetch('http://localhost:3000/events',
      {method: "POST",
      body: JSON.stringify({
        name: this.state.nextEvent.summary,
        address: this.state.nextEvent.location,
        user_email: "text@example.com",
        start_time: new Date(this.state.next_event.start.dateTime),
        departure_time: new Date(new Date(this.state.next_event.start.dateTime).getTime() - this.state.duration_to_next_event*1000)
      })
    })
    .then((response) => console.log(response))
    }

  trafficTime() {
    //mode defaults to driving for now.
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + this.state.currentCoordinates[0] + "," + this.state.currentCoordinates[1] + "&destinations=" + this.state.nextEventCoordinates[0] + "," + this.state.nextEventCoordinates[1] + "&key=AIzaSyAz4HXhCsn9tZdJ24R3lCMZ2kFakiabDgw"
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({durationToNextEvent: json.rows["0"].elements["0"].duration.value})
      })
  }

  setLocation(lat, lng) {
    this.setState({
      lat: lat,
      lng:lng
    })
  }

  turnOffEvent(event) {

  }

  turnOnEvent(event) {

  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={styles.instructions}>
            Click the button below to log in with your Google account
          </Text>
          <GoogleSigninButton
            style={{width: 48, height: 48}}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn.bind(this)}/>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <EventListView
              allEvents={this.state.allEvents}
              signout={this.signOut.bind(this)} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('DiaryList', () => DiaryList);

