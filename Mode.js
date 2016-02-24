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

          <PickerIOS
            selectedValue = {this.props.mode}
            onValueChange = {(mode) => this.props.modeChange(mode)}>
              <PickerItemIOS
                key="Driving"
                value="Driving"
                label="Driving"/>
              <PickerItemIOS
                key="Walking"
                value="Walking"
                label="Walking"/>
        </PickerIOS>

        </Text>
      </View>
    );
  }
}

export default Mode
