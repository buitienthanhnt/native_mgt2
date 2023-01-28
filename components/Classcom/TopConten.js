import React from "react";
import { Component } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

class TopConten extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "title of topconten",
            value: 12345
        }
    }

    render(){
        return(
            <View style= {css.lay_out}>
                <Text>
                    noi dung nam trong top of content
                </Text>
            </View>
        );
    }
}

const css = StyleSheet.create({
    text_conten: {
        color: "red",
        justifyContent: "center",
    },
    lay_out: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height/16,
        backgroundColor: "violet",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TopConten;