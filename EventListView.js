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

var EventView = require("./EventView");

class EventListView extends Component {

  render() {
    var rows = this.props.all_events.map((event) => {
      return (
        <EventView event={event}/>
      );
    });

    return (
      <View style={styles.container}>
        {rows}
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




module.exports = EventListView;

  // render() {
  //   return(
  //     <View style={styles.container}>
  //         <TouchableHighlight onPress={this.props.signOut}>
  //             <Text style={styles.instructions}>
  //                 Click here to sign out
  //             </Text>
  //         </TouchableHighlight>
  //     </View>
  //     )
