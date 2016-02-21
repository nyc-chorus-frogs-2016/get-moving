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
          user: null
      };
      new BackgroundGeo(this);
      // setInterval(() => {
      //     this.doMainCheckLoop()
      // }, 5000)

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
        var futureEvents = json.items.filter((event) => new Date(event.start.dateTime) > new Date());
        this.setState( {all_events: futureEvents } )
      })
  }

  doMainCheckLoop() {
    if (this.state.user){
      this.loadEventsFromCalendar();
      var nextEvent = this.state.all_events[0]
      alert('Your next event is ' + nextEvent.summary);
    }
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

