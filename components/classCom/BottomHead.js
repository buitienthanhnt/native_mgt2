import react from "react";
import { Component } from "react";
import { View, StyleSheet, Button, Image, Dimensions, Platform, Text } from "react-native";

class BottomHead extends Component{
    constructor(){
        super();
        this.state = {
            dimension: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            },
            title: "tha nan demo bottom component"
        };
    }

    get_title() {
        return this.state.title;
    }

    render(){
        const options = [];

        for (let i = 0; i <= 3; i++) {
            options.push(<Text>dfsfsd</Text>);
        }

        return(
            <View style={css.bottom}>
                <Text>nội dung phần phía dưới</Text>
                {
                    (
                        ()=>{
                            let data = [];
                            for (let index = 0; index < 4; index++) {
                                data.push(<Text key={index}>{index}</Text>);
                            }
                            return data;
                        }
                    )()
                }
            </View>
        );
    }
}

const css = StyleSheet.create({
    title: {
        // backgroundColor: "violet",
        fontSize: 26
    },
    bottom: {
        // marginBottom: 8, 
        width: Dimensions.get("window").width, 
        height: 40, 
        alignItems: "center", 
        justifyContent: "center",
        // backgroundColor: "blue"
    }
})

export default BottomHead;