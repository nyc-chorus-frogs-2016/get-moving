"use strict";

var React = require("react-native");

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
} = React;

var LoginView = require("./LoginView");

var DiaryList = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                style={styles.navigationContainer}
                initialRoute={{
                title: "Navigator Example",
                component: LoginView,
            }} />
        );
    }
});

var styles = StyleSheet.create({
    navigationContainer: {
        flex: 1
    }
});

AppRegistry.registerComponent('DiaryList', () => DiaryList);

