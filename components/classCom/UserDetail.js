import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import AddressDetail from "../funCom/AddressDetail";
class UserDetail extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            customer_data: this.props.route.params ? this.props.route.params.user_data ?? {} : {}
        };
    }

    UNSAFE_componentWillMount() {
        // console.log(this.props);
    }

    render() {
        return (
            <View style={css.container}>
                <Text>user detail</Text>
                <Text>{this.state.customer_data.email ?? "not has data"}</Text>
                <Address customer_id={this.state.customer_data.customer_id}></Address>
                <AddressDetail></AddressDetail>
                {/* <Image source={require("../../assets/Images/Ball-1s-200px.gif")} style={{width: 100, height: 100}}></Image>
                <Image source={require("../../assets/Images/Infinity-1s-200px.gif")}></Image> */}
            </View>
        )
    }
}

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 1,
            customer_id: null,
            address: []
        };
    }

    UNSAFE_componentWillMount() {
        console.log(this.props);
        if (this.state.first && this.props.customer_id) {
            this.setState({customer_id:  this.props.customer_id});
        }
    }

    componentWillUnmount() {
        this.setState({ first: 0 });
    }

    render() {
        return (
            <View>
                <Text>address_data</Text>
                <Text>{this.state.customer_id}</Text>
            </View>)
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "green"
    }
});

export { UserDetail };