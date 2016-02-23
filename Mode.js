'use strict';
import React, {
  PickerIOS,
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

var MODE = ["Driving", "Walking"]

const styles= require('./styles');

class Mode extends Component {

  render() {
    return (
      <View>
        <Text>
          {this.props.mode}
        </Text>
      </View>
    );
  }
}

export default Mode
