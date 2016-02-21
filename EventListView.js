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
    var rows = this.props.all_events.map((event) => {
        return (
          <EventView event={event} key={event.id}/>
        )
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.signout}>
          <Text style={styles.instructions}>
            Click here to sign out
          </Text>
        </TouchableHighlight>
        {rows}
      </View>
    );
  }
}

export default EventListView
