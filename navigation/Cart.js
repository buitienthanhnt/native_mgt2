import React, {useEffect} from "react";
import { View, Text, Button, StatusBar, ScrollView, StyleSheet, Image, Dimensions, LogBox } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import cart_val from "./cart_data";

const cart_data = cart_val;

const Cart = (props) => {
    const { navigation } = props;
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]); // VirtualizedLists should never be nested inside plain ScrollViews with the same
    }, []);

    if (!props.g_data.cart_data) {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar></StatusBar>
                <Text style={css.cart_title}>cart data</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View >
                        <Cart_item items={cart_data.items} ></Cart_item>
                    </View>
                </ScrollView>
                <Cart_price prices={cart_data.prices}></Cart_price>
                <Button title="show cart_data" onPress={() => {
                    console.log(cart_data);
                }}></Button>
            </View>
        )
    }

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

const Cart_item = (props) => {
    console.log(props);
    return (
        <View style={css.cart_item}>
            <FlatList
                data={props.items}
                keyExtractor={(item, index) => { return String(index); }}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={{ padding: 8, flexDirection: "row" }}>
                                <View style={{ width: "45%" }}>
                                    <Image source={{ uri: item.image_path }} style={css.item_image} resizeMode="cover"></Image>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <Text style={{ fontSize: 17 }}>{item.name}</Text>
                                    <Text style={{ fontSize: 17 }}>qty: {item.item_qty}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ height: 1, backgroundColor: "black", width: "90%" }}></View>
                            </View>
                        </View>
                    )
                }}
            ></FlatList>
        </View>
    );
};

const Cart_price = (props) => {
    return (
        <View style={{ marginTop: 12 }}>
            <FlatList data={props.prices}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }, idx) => {
                    return (
                        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 8, marginTop: 6 }}>
                            <View style={{ width: "65%" }}>
                                <Text style={{ fontSize: 18 }}>{item.key}:</Text>
                            </View>
                            <View style={{ width: "30%" }}>
                                <Text style={{ fontSize: 18 }}>{item.value > 0 ? item.value : 0}</Text>
                            </View>
                        </View>
                    )
                }}
            ></FlatList>
        </View>
    );
}

const css = StyleSheet.create({
    cart_title: {
        fontSize: 20,
        textAlign: "center",
        flexDirection: "row",
        color: "tomato"
    },
    cart_item: {
        width: "100%",
        marginTop: 8,
        // backgroundColor: "violet"
    },
    item_image: {
        width: Dimensions.get("window").width / 100 * 40,
        height: Dimensions.get("window").width / 100 * 40
    }
});

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(Cart);