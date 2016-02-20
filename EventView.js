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

const styles= require('./styles');

class EventView extends Component {
  render() {
      var event = this.props.event
      return (
        <View style={styles.eventContainer}>
          <Image
          source={{uri:"https://lh5.ggpht.com/-oMUKnGIr7IUeAQaNoaY0VLJ5N_6lEZC7sSOS9tRm7W72ICH8I1-DVo-ovaODRMLlU0=w300" }}
          style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{event.summary}</Text>
            <Text style={styles.time}>Time: {event.start.dateTime}</Text>
            <Text style={styles.location}>Location: {event.location}</Text>
          </View>

        </View>
      );
    }
}

export default EventView
