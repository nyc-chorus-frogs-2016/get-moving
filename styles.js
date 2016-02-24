'use strict';
import React, {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
    marginTop: 5
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'white',
    borderWidth: 10,
    borderRadius: 10,
    margin: 10,
  },
  rightContainer: {
    flex: 1,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Avenir-Book',
  },
  thumbnail: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    paddingVertical: 20
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  time: {
    // textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  bold: {
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
  },
  dateContainer: {
    textAlign: 'center',
  },
  location: {
    // textAlign: 'center',
    fontFamily: 'Avenir-Book',
  },
  signin: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  toolbar:{
    backgroundColor:'#81c04d',
    paddingTop:25,
    height: 50,
    flexDirection:'row',
  },
  toolbarGreeting:{
    width: 30,
    color:'#fff',
    textAlign:'center',
    flex: 1,
  },
  signout: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
  }
});
