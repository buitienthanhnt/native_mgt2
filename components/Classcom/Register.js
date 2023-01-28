import React from "react";
import { Component } from "react";
import { View, Button, Text } from "react-native";
import Config from "../../assets/Datasource/Config";

import * as WebBrowser from 'expo-web-browser';  // npx expo install expo-web-browser  // https://docs.expo.dev/versions/v46.0.0/sdk/webbrowser/
// import {WebView} from "react-native-webview"; // để gỡ 1 thư viện:  npm uninstall react-native-webview

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            w: 1
        }
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://vnexpress.net/');
        this.setState({ result: result });
    };

    render() {
        return (
            <View >
                <Button title="Open WebBrowser" onPress={this._handlePressButtonAsync} />
                <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
            </View>
        )
    }
}

export default Register;