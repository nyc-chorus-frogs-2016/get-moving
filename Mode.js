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

          <PickerIOS>
              <PickerItemIOS
                key="Walking"
                value="Walking"
                label="Walking"/>
              <PickerItemIOS
                key="Driving"
                value="Driving"
                label="Driving"/>
          </PickerIOS>


      </View>
    );
  }
}

export default Mode


        // <Text>
        //   {this.props.mode}
        // </Text>
