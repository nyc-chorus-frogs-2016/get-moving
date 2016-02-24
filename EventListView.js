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

import EventView from './EventView';
const styles= require('./styles');

class EventListView extends Component {

  render() {
    var rows = this.props.allEvents.map((event) => {
        return (
          <EventView event={event}
          reminderChange={this.props.reminderChange.bind(null, event.id)}
          key={event.id}/>
        )
    });

    return (
      <View>
        <View style= {styles.toolbar}>
          <Text style={styles.toolbarGreeting}>Welcome to DiaryList</Text>
          <TouchableHighlight onPress={this.props.signout}>
            <Text style={styles.signout}>Sign Out</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.eventsContainer}>
          {rows}
        </View>
      </View>
    );
  }
}

export default EventListView
