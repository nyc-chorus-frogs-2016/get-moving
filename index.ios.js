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
          all_events: [],
          on_events: [],
          user: null,
          next_event_coordinates: [],
          next_event: null,
          current_coordinates: [40.706419, -74.009081], //DBC office coordinates. hardcoded for now
          duration_to_next_event: null,
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
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: {
        "Authorization": "Bearer " + this.state.user.accessToken
      }
    })
      .then((response) => response.json())
      .then((json) => {
        var futureEvents = json.items.filter((event) => new Date(event.start.dateTime) > new Date()).reverse();
        this.setState({
          all_events: futureEvents,
          next_event: futureEvents[0]
         })
      })
  }

  address_to_coordinates(address) {
    var formatted_address = address.replace(/ /g,"+")
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formatted_address + "&key=AIzaSyCCyBbVWsgVD7NQmDXcwF7w0GKbL00SiUA"
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({next_event_coordinates: [json.results['0'].geometry.location.lat, json.results['0'].geometry.location.lng]} )
      })
  }

  doMainCheckLoop() {
    if (this.state.user){
      this.loadEventsFromCalendar();
      this.address_to_coordinates(this.state.nextEvent.location);
      this.trafficTime()
      this.postToServer()

      alert('Your next event is ' + this.state.nextEvent.summary + " takes " + this.state.duration_to_next_event + "seconds");
    }
  }

  postToServer(){
    fetch('http://localhost:3000/events',
      {method: "POST",
      body: JSON.stringify({
        name: this.state.nextEvent.summary,
        address: this.state.nextEvent.location,
        user_email: "text@example.com",
        start_time: this.state.nextEvent.start.dateTime,
        //fix string to date time conversion
        departure_time: this.state.nextEvent.start.dateTime - this.state.duration_to_next_event
      })
    })
    .then((response) => console.log(response))
    }

  trafficTime() {
    //mode defaults to driving for now.
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + this.state.current_coordinates[0] + "," + this.state.current_coordinates[1] + "&destinations=" + this.state.next_event_coordinates[0] + "," + this.state.next_event_coordinates[1] + "&key=AIzaSyAz4HXhCsn9tZdJ24R3lCMZ2kFakiabDgw"
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({duration_to_next_event: json.rows["0"].elements["0"].duration.value})
      })
  }

  setLocation(lat, lng) {
    this.setState({
      lat: lat,
      lng:lng
    })
  }

  turn_off_event(event) {

  }

  turn_on_event(event) {

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
              all_events={this.state.all_events}
              signout={this.signOut.bind(this)} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('DiaryList', () => DiaryList);

