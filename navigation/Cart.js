import React, { useEffect, useState } from "react";
import { View, Text, Button, StatusBar, ScrollView, RefreshControl, StyleSheet, Image, Dimensions, LogBox, TextInput, TouchableOpacity, Platform, FlatList } from "react-native";
import { Tooltip } from 'react-native-elements'; //npm install react-native-elements + npm i --save react-native-vector-icons + npm install react-native-safe-area-context
// import { TextInput } from 'react-native-paper'; // npm install react-native-paper
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';  // npm install --save react-native-collapsible

import { connect } from "react-redux";
import cart_val from "./cart_data";

const cart_data = cart_val;

const Cart = (props) => {
    const { navigation } = props;
    const [refres, setRefres] = useState(false);
    const [cart, setCart] = useState(null);
    useEffect(() => {
        setCart(cart_data.items);
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]); // VirtualizedLists should never be nested inside plain ScrollViews with the same
    }, [props]);

    if (!props.g_data.cart_data) {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar></StatusBar>
                <View style={{ flex: 70, marginBottom: 6 }}>
                    <Text style={css.cart_title}>Cart data</Text>
                    <ScrollView

                        refreshControl={<RefreshControl refreshing={refres} onRefresh={() => {
                            setCart([...cart_data.items]);
                        }} />}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Cart_item items={cart} ></Cart_item>
                    </ScrollView>
                </View>
                <DiscountElement></DiscountElement>
                <View style={{ flex: 30 }}>
                    <View style={{ justifyContent: "flex-end", height: "100%" }}>
                        <Cart_price prices={cart_data.prices}></Cart_price>
                    </View>
                </View>

                <Button title="show cart_data" onPress={() => {
                    console.log(cart_data);
                }}></Button>
                {/* skipAndroidStatusBar={true} để không bị lặp lại nội dung khi hiển thị. */}
                {/* <Tooltip popover={<Text>tooooool</Text>} withOverlay={false} withPointer={true} skipAndroidStatusBar={true}>
                    <Text style={{ fontSize: 17, backgroundColor: "red", alignSelf: 'flex-start' }}>asdadsd</Text>
                </Tooltip> */}
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

const DiscountElement = (props) => {
    const [discount, setDiscount] = useState(true);
    const [discountcode, setDiscountcode] = useState("");
    const [discountlist, setDiscountlist] = useState([]);
    return (
        <View style={{ paddingLeft: 8, justifyContent: "flex-start", marginTop: 5 }}>
            <View >
                <Text style={{ textDecorationLine: "underline", color: "green" }}
                    onPress={() => {
                        setDiscount(!discount);
                    }}>Apply discount:</Text>
                <DiscountItem _discountlist={discountlist} _setDiscountlist={setDiscountlist}></DiscountItem>
            </View>
            <View>
                <Collapsible collapsed={discount}>
                    <View style={{ flexDirection: "row", marginTop: 4 }}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            value={discountcode}
                            onChangeText={(text) => {
                                setDiscountcode(text);
                            }}
                            style={{
                                borderWidth: 1, height: 24,
                                width: "40%", paddingLeft: 6, borderRadius: 6
                            }}></TextInput>
                        <TouchableOpacity onPress={() => {
                            if (discountcode) {
                                setDiscountlist([...discountlist, discountcode]);
                                setDiscountcode("");
                            }
                        }}
                            style={{ marginLeft: 8 }}
                        >
                            <FontAwesome5Icon name="paper-plane" size={21}></FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                </Collapsible>
            </View>
        </View>
    );
}

const DiscountItem = (props) => {
    useEffect(() => {
    }, [props]);

    return (
        <View style={{ flexDirection: "row" }}>
            <FlatList data={props._discountlist} horizontal={true} keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ marginLeft: 12, fontSize: 16, textDecorationLine: "underline" }}>{item}</Text>
                            <TouchableOpacity onPress={() => {
                                let _discountlist = props._discountlist;
                                _discountlist.splice(index, 1);
                                props._setDiscountlist([..._discountlist]); // cần đặt [...arr] để  tạo mảng mới cho hook render lại nếu không sẽ có thể bị lỗi không render lại
                            }}>
                                <Text style={{ color: "red", fontSize: 12 }}>X</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}></FlatList>
        </View>
    );
}

const Cart_item = (props) => {
    const [items, setItems] = useState(null);
    useEffect(() => {
        setItems(props.items);
    }, [props]);
    return (
        <View style={css.cart_item}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => { return String(index); }}
                renderItem={({ item, index }) => {
                    return (
                        <Item_data {...item} index={index} up_parent={setItems} items={items}></Item_data>
                    )
                }}
            ></FlatList>
        </View>
    );
};

const Item_data = (props) => {
    const [qty, setQty] = useState(0);
    const [data, setData] = useState(null);
    useEffect(() => {
        setQty(props.item_qty);
        setData(props);
    }, [props]);
    return (
        <View>
            <View style={{ padding: 8, flexDirection: "row" }}>
                <View style={{ width: "45%" }}>
                    <Image source={{ uri: props.image_path }} style={css.item_image} resizeMode="cover"></Image>
                </View>
                <View style={{ width: "50%" }}>
                    <Tooltip popover={<Text>{props.name}</Text>} withOverlay={false} skipAndroidStatusBar={true}>
                        <Text style={{ fontSize: 17 }}>{props.name}</Text>
                    </Tooltip>
                    <Text style={{ fontSize: 17 }}>Price: {props.prices[0].value}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {/* <Text style={{ fontSize: 17, fontWeight: "bold" }}>qty: {item.item_qty}</Text> */}
                        <View style={{ textAlign: "center", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                console.log("sub qty");
                                if (qty >= 1) {
                                    let _qty = qty;
                                    setQty(_qty -= 1)
                                }
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: "900", marginRight: 6 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={String(qty)}
                            // defaultValue={String(item.item_qty)} // không chạy
                            onChangeText={(value) => { setQty(value) }}
                            style={{ height: 30, width: 32, borderWidth: 1, borderRadius: 6, padding: 4, paddingLeft: 6 }}
                            keyboardType="numeric">
                        </TextInput>
                        <View style={{ textAlign: "center", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => {
                                console.log("add qty");
                                let _qty = qty;
                                setQty(_qty += 1);
                            }}>
                                <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: "600" }}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ textAlign: "center", justifyContent: "center", width: Platform.OS == "web" ? "-webkit-fill-available" : "60%" }}>
                            <View style={{ alignItems: Platform.OS != "web" ? "flex-end" : "none" }}>
                                <Text style={{ fontSize: 20 }}>{qty * props.prices[0].value}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {(() => {
                            if (data && data.request_option_html) {
                                let _html = [];
                                for (const element in data.request_option_html) {
                                    if (data.request_option_html[element].type && data.request_option_html[element].label) {
                                        // return (<Text>{`${element.type}: ${element.label}`}</Text>); // element: là index của obj
                                        // return(<Text>{data.request_option_html[element].type}: {data.request_option_html[element].label}</Text>); // obj[index] là gọi phần tử thứ index của obj
                                        _html = [..._html, <Text style={{color: "violet"}} key={data.request_option_html[element].id}>{data.request_option_html[element].type}: {data.request_option_html[element].label}</Text>];
                                    }
                                }
                                return _html;
                            }
                        })()}
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ marginTop: 4, flexDirection: "row", justifyContent: "flex-end" }}>
                            <TouchableOpacity onPress={() => {
                                console.log("delete item?");
                                let _items = props.items;
                                _items.splice(props.index, 1);
                                props.up_parent([..._items]);
                            }}
                            >
                                <FontAwesome5Icon name="trash" color="tomato"
                                    size={21}
                                >
                                </FontAwesome5Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                console.log("delete item?");
                            }}
                                style={{ marginLeft: 12 }}
                            >
                                <FontAwesome5Icon name="pen" color="green"
                                    size={21}
                                >
                                </FontAwesome5Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ height: 1, backgroundColor: "black", width: "100%" }}></View>
            </View>
        </View>
    );
}

const Cart_price = (props) => {
    return (
        <View style={{ marginTop: 0 }}>
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
        fontSize: 24,
        textAlign: "center",
        // flexDirection: "row",
        color: "tomato"
    },
    cart_item: {
        width: "100%",
        // marginTop: 4,
        // backgroundColor: "violet"
    },
    item_image: {
        width: Dimensions.get("window").width / 100 * 40,
        height: Dimensions.get("window").width / 100 * 40,
        borderRadius: 20
    }
});

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(Cart);