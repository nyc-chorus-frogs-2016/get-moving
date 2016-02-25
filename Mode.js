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

const styles= require('./styles');

class Mode extends Component {
  render() {
    return (
      <View>

          <PickerIOS
          selectedValue={this.props.mode}
          onValueChange={(mode) => this.props.modeChange(mode)}>
              <PickerItemIOS
                key="walking"
                value="walking"
                label="walking"/>
              <PickerItemIOS
                key="driving"
                value="driving"
                label="driving"/>
              <PickerItemIOS
                key="transit"
                value="transit"
                label="transit"/>
          </PickerIOS>


      </View>
    );
  }
}

export default Mode
