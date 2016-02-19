"use strict";

import BackgroundGeo from './geo-location';



import React, {

    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
}  from 'react-native';

var LoginView = require("./LoginView");

class DiaryList extends Component {
    constructor() {
        super()
        this.state = { lat:0, lng: 0}
        new BackgroundGeo(this);
        setInterval(() => {
            this.doMainCheckLoop()
        }, 5000)

    }
    doMainCheckLoop() {

    }
    setLocation(lat, lng) {
        this.setState({
            lat: lat,
            lng:lng
        })
    }
    render() {
        return (
            <NavigatorIOS
                style={styles.navigationContainer}
                initialRoute={{
                title: "Navigator Example",
                component: LoginView,
            }} />
        );
    }
}

var styles = StyleSheet.create({
    navigationContainer: {
        flex: 1
    }
});

AppRegistry.registerComponent('DiaryList', () => DiaryList);

