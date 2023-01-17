import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";

import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import AddressDetail from "../funCom/AddressDetail";
import { connect } from 'react-redux';

const customer_data = {
    "customer_id": 1,
    "name": null,
    "first_name": "Veronica",
    "last_name": "Costello",
    "middle_name": null,
    "email": "roni_cost@example.com",
    "created_at": "2023-01-10 08:21:19",
    "created_in": "Default Store View",
    "updated_at": "2023-01-10 08:21:22",
    "active": null,
    "group_id": 1,
    "tha_sid": "946tbhca5nebugtqf8h9j5p2nk",
    "default_billing_address": {
        "id": 1,
        "customer_id": 1,
        "region": {
            "region_code": "MI",
            "region": "Michigan",
            "region_id": 33
        },
        "region_id": 33,
        "country_id": "US",
        "street": [
            "6146 Honey Bluff Parkway"
        ],
        "telephone": "(555) 229-3326",
        "postcode": "49628-7978",
        "city": "Calder",
        "firstname": "Veronica",
        "lastname": "Costello",
        "default_shipping": true,
        "default_billing": true
    },
    "default_shipping_address": {
        "id": 1,
        "customer_id": 1,
        "region": {
            "region_code": "MI",
            "region": "Michigan",
            "region_id": 33
        },
        "region_id": 33,
        "country_id": "US",
        "street": [
            "6146 Honey Bluff Parkway"
        ],
        "telephone": "(555) 229-3326",
        "postcode": "49628-7978",
        "city": "Calder",
        "firstname": "Veronica",
        "lastname": "Costello",
        "default_shipping": true,
        "default_billing": true
    }
};
class UserDetail extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            // customer_data: this.props.route.params ? this.props.route.params.user_data ?? {} : {}
            customer_data: customer_data
        };
    }

    UNSAFE_componentWillMount() {
        // console.log(this.props);
    }

    render() {
        console.log(this);
        const { first_name, last_name, default_billing_address, default_shipping_address } = this.state.customer_data;
        return (
            <View style={css.container}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{'My Account'}</Text>
                <View style={{ flex: 0.3, backgroundColor: "#fde4ac", paddingLeft: 6, paddingTop: 4, paddingRight: 4 }}>
                    <Text style={{ fontSize: 16 }}>Account Information</Text>
                    <View style={{ height: 1, backgroundColor: "black" }}></View>

                    <View style={{ flexDirection: "row", paddingTop: 6 }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16 }}>Contact Information</Text>
                            <Text>{first_name} {last_name}</Text>
                            <Text>{this.state.customer_data.email ?? "email not found"}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => console.log("edit")}>
                                    <Text style={{ textDecorationLine: "underline", color: "#106ea1" }}>edit</Text>
                                </TouchableOpacity>

                                <Text> | </Text>
                                <TouchableOpacity onPress={() => console.log("change password")}>
                                    <Text style={{ textDecorationLine: "underline", color: "#106ea1" }}>change password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16 }}>Newsletters</Text>
                            <Text>{"You aren't subscribed to our newsletter."}</Text>
                            <TouchableOpacity onPress={() => console.log('edit newletter')}>
                                <Text style={{ color: "#106ea1", textDecorationLine: "underline" }}>edit</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
                <View style={{ flex: 0.3, backgroundColor: "#b6e5eb", paddingLeft: 6, paddingTop: 4, paddingRight: 4 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Address Book </Text>
                        <TouchableOpacity style={{ alignItems: "baseline", flexDirection: "column-reverse" }} onPress={() => console.log("redirect address list")}>
                            <Text style={{ color: "#106ea1" }}>Manage Addresses</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16 }}>Default Billing Address</Text>
                            <AddressDetail address_data={default_billing_address}></AddressDetail>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16 }}>Default Shipping Address</Text>
                            <AddressDetail address_data={default_shipping_address}></AddressDetail>
                        </View>
                    </View>

                    {/* <Address customer_id={this.state.customer_data.customer_id}></Address> */}
                </View>

                <View style={{ flex: 0.4, paddingLeft: 6, paddingTop: 4, paddingRight: 4  }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18 }}>Recent Orders </Text>
                        <TouchableOpacity style={{ alignItems: "baseline", flexDirection: "column-reverse" }} onPress={() => console.log("view all order")}>
                            <Text style={{ color: "#106ea1" }}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>12312312</Text>
                    </View>

                </View>
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
            this.setState({ customer_id: this.props.customer_id });
        }
    }

    componentWillUnmount() {
        this.setState({ first: 0 });
    }

    render() {
        console.log(this);
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
        backgroundColor: "#154c79" // https://imagecolorpicker.com/en
    }
});

// export { UserDetail };
export default connect(
    (state) => {
        return {user_data: state};
    },
    (dispatch) => {
        return {};
    }
)(UserDetail);