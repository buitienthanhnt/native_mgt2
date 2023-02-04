import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import { connect } from "react-redux";

const Scr1 = (props) => {
    const { navigation } = props;
    return (
        <View>
            <StatusBar backgroundColor={"violet"}></StatusBar>
            <Button title="Scr12" onPress={() => {
                navigation.navigate("Scr12", { customer_id: 1 });
            }}></Button><Text>{"\n"}</Text>

            <Button title="Scr13" onPress={() => {
                navigation.navigate("Scr13", { customer_id: 1 });
            }}></Button><Text>{"\n"}</Text>

            <Button title="props" onPress={() => {
                console.log(props.g_data.cart_data);
            }}></Button><Text>{"\n"}</Text>
        </View>
    )
};

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(Scr1);