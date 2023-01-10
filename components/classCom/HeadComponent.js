import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Dimensions, Platform } from "react-native";

import Config from "../../assets/Datasource/Config";

class HeadComponent extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            title: "tin tức chiến trường ukr?",
            dimencion: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            }
        };
    }

    render() {
        return (
            <View>
                <Text style={css.head_title}>{this.state.title}</Text>
                <Image source={require("../../assets/Images/556318717813726672a-Ukraine-Ng-1632-1489-1659083532.jpg")}
                       style={{width: this.state.dimencion.width, height: this.state.dimencion.height/4, resizeMode: "stretch"}}
                ></Image>
            </View>
        );
    }
}

const css = StyleSheet.create({
    head_title: {
        color: "red",
        fontSize: 20,
        textAlign: "center",
        // marginTop: Platform.OS == "web" ? 0 : 12,
        // marginBottom: 3,
        backgroundColor: "#456096",
        justifyContent: "flex-end"
    }
})

export default HeadComponent;