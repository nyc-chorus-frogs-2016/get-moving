/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DiaryList from './diary-list'

var BackgroundGeolocation = require('react-native-background-geolocation');
BackgroundGeolocation.configure({
  desiredAccuracy: 0,
  stationaryRadius: 50,
  distanceFilter: 50,
  disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
  locationUpdateInterval: 5000,
  minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change
  fastestLocationUpdateInterval: 5000,
  activityRecognitionInterval: 10000,
  stopDetectionDelay: 1,  // <--  minutes to delay after motion stops before engaging stop-detection system
  stopTimeout: 2, // 2 minutes
  activityType: 'AutomotiveNavigation',

  // Application config
  debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.

  // HTTP / SQLite config
  url: 'http://posttestserver.com/post.php?dump&dir=sc-fr-b-geoloc',
  batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
  maxDaysToPersist: 1
});

// This handler fires whenever bgGeo receives a location update.
  BackgroundGeolocation.on('location', (location) => {
    console.log('- [js]location: ', JSON.stringify(location));
  });

  // This handler fires whenever bgGeo receives an error
  BackgroundGeolocation.on('error', (error) => {
    var type = error.type;
    var code = error.code;
    console.log(type + " Error: " + code);
  });

  // This handler fires when movement states changes (stationary->moving; moving->stationary)
  BackgroundGeolocation.on('motionchange', (location) => {
      console.log('- [js]motionchanged: ', JSON.stringify(location));
  });

  BackgroundGeolocation.on('httpresponse', (event) => {
    console.log('- HttpResponse: ', JSON.stringify(event));
  });

  BackgroundGeolocation.start(() => {
    console.log('- [js] BackgroundGeolocation started successfully');

    // Fetch current position
    BackgroundGeolocation.getCurrentPosition({timeout: 30}, (location) => {
      console.log('- [js] BackgroundGeolocation received current position: ', JSON.stringify(location));
    }, function(error) {
      console.log("Location error: " + error);
    });
  });

var events = [
{ name:'Dentist Appointment', startTime: '11:00AM', location: '43 Willow St.' },
{ name:'Work', startTime: '9:00AM', location: '48 Wall St.'},
{ name:'Meet John for drinks', startTime: '7:00PM', location: '32 Main St.' },
];

class GetMoving extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(events),
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEvent}
        style={styles.listView}/>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Events...
        </Text>
      </View>
    );
  }

  renderEvent(event) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri:"https://lh5.ggpht.com/-oMUKnGIr7IUeAQaNoaY0VLJ5N_6lEZC7sSOS9tRm7W72ICH8I1-DVo-ovaODRMLlU0=w300" }}
          // "https://upload.wikimedia.org/wikipedia/commons/4/47/Comic_image_missing.png"
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{event.name}</Text>
          <Text style={styles.time}>Time: {event.startTime}</Text>
          <Text style={styles.location}>Location: {event.location}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  time: {
    textAlign: 'center',
  },
  location: {
    textAlign: 'center',
  },
  thumbnail: {
    margin: 5,
    width: 60,
    height: 60,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


AppRegistry.registerComponent('DiaryList', () => DiaryList);
// AppRegistry.registerComponent('GetMoving', () => GetMoving);


