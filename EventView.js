'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles= require('./styles');

class EventView extends Component {
  constructor() {
    super();
  }



  reminder(event) {
    if (event.extendedProperties && event.extendedProperties.private && event.extendedProperties.private.reminder ) {
      return JSON.parse(event.extendedProperties.private.reminder)
    }
    return false
  }

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
          <Switch
            onValueChange={(value) => this.props.reminderChange(value)  }
            style={{marginBottom: 10}}
            value={this.reminder(event)} />
      </View>
      );
  }
}

export default EventView
