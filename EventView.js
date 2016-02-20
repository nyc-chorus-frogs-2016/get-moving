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


class EventView extends Component {
  render() {
      var event = this.props.event
      return (
        <View style={styles.eventContainer}>

          <View style={styles.rightContainer}>
            <Text style={styles.instructions}>
              {event.summary}
            </Text>
          </View>

        </View>
      );
    }
}

var styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  instructions: {
      textAlign: 'center',
      color: '#333333',
      margin: 10,
  },
});

module.exports = EventView;
