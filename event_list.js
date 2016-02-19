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


class EventList extends Component {
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
      dataSource: this.state.dataSource.cloneWithRows(this.props.events),
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
});

module.exports = EventList;
