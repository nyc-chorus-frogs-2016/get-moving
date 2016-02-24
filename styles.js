'use strict';
import React, {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    borderColor: '#CCCCCC',
    margin: 10,
    marginTop: 30,
    padding: 10
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: '#CCCCCC'
  },
  rightContainer: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 40,
    height: 30,
  },
  thumbnail: {
    margin: 5,
    width: 60,
    height: 60,
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: 'center'
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
});
