"use strict";

import BackgroundGeo from './geo-location';

import React, {
  AlertIOS,
  AppRegistry,
  Component,
  PushNotificationIOS,
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
      this.state = {
          allEvents: [],
          onEvents: [],
          user: null,
          nextEventCoordinates: [],
          nextEvent: null,
          currentCoordinates: [],
          durationToNextEvent: null,
      };
      new BackgroundGeo(this);
      PushNotificationIOS.addEventListener('notification', this.onNotification);
      PushNotificationIOS.addEventListener('register', this.storeDeviceToken.bind(this));

      setInterval(() => {
          this.doMainCheckLoop()
      }, 1000)

  GoogleSignin.configure({
      iosClientId: "430891231916-hej7na4spktej6ofjofis7gphtlg5op3.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/calendar"]
    });
  }

  storeDeviceToken(token) {
    this.setState({deviceToken: token});
  }

  onNotification(notification) {
    console.log(arguments)
    AlertIOS.alert(
      'Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
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
    console.log('app props', this.appProperties)
    if (this.state.user){
      this.loadEventsFromCalendar().then(() => {
        this.addressToCoordinates(this.state.nextEvent.location);
      }).then(() => {
        this.trafficTime().then(() => {
          this.postToServer()
         // alert('Your next event is ' + this.state.nextEvent.summary + " takes " + this.state.durationToNextEvent + "seconds");
          });
        })
    }
  }

  postToServer(){
    fetch('https://secret-cliffs-77425.herokuapp.com/events',
      {
        headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.nextEvent.summary,
        address: this.state.nextEvent.location,
        user_email: "text@example.com",
        start_time: new Date(this.state.nextEvent.start.dateTime),
        departure_time: new Date(new Date(this.state.nextEvent.start.dateTime).getTime() - this.state.durationToNextEvent*1000),
        device_token: this.state.deviceToken
      })
    })
    .then((response) => console.log(response)).catch(() => console.log(arguments))
    }

  trafficTime() {
    //mode defaults to driving for now.
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + this.state.currentCoordinates[0] + "," + this.state.currentCoordinates[1] + "&destinations=" + this.state.nextEventCoordinates[0] + "," + this.state.nextEventCoordinates[1] + "&key=AIzaSyAz4HXhCsn9tZdJ24R3lCMZ2kFakiabDgw"
    console.log(url)
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({durationToNextEvent: json.rows["0"].elements["0"].duration.value})
      })
  }

  setLocation(latitude, longitude) {
    this.setState({
      currentCoordinates: [latitude, longitude]
    })
  }

  reminderChange(id, value) {
    return fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id, {
      method: 'PATCH',
      headers: {
        "Authorization": "Bearer " + this.state.user.accessToken,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "extendedProperties": {"private":{"reminder": value}}
      })
    })
      .then((response) => {
        this.loadEventsFromCalendar()
      });
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
              reminderChange={this.reminderChange.bind(this)}
              signout={this.signOut.bind(this)} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('DiaryList', () => DiaryList);

