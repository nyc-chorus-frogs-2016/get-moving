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
    var date = new Date(this.props.event.start.dateTime);
    var formattedDate = " " + (date.getUTCMonth() + 1) + "/" + date.getUTCDate();
    var formattedDateWithYear = formattedDate + "/" + date.getUTCFullYear()
    var time = date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    var dateAndTime = time + ", " + formattedDateWithYear;
    return (
      <View style={styles.eventContainer}>
        <View style={styles.dateContainer}>
          <Image
          source={{uri:"https://pidome.org/assets/site/images/events/default-event-image.png" }}
          style={styles.thumbnail}/>
          <Text>{formattedDate}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{event.summary}</Text>
          <Text>
            <Text style={styles.bold}>When: </Text><Text style={styles.time}> {dateAndTime}</Text>
          </Text>
          <Text>
            <Text style={styles.bold}>Where: </Text><Text style={styles.location}>Location: {event.location}</Text>
          </Text>
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
