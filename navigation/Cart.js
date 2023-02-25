import React, { useEffect, useState } from "react";
import { View, Text, Button, StatusBar, ScrollView, RefreshControl, StyleSheet, Image, Dimensions, LogBox, TextInput, TouchableOpacity, Platform, FlatList } from "react-native";
import { Tooltip } from 'react-native-elements'; //npm install react-native-elements + npm i --save react-native-vector-icons + npm install react-native-safe-area-context
import RenderHtml from 'react-native-render-html'; // npm install --save-prod react-native-render-html
// import { TextInput } from 'react-native-paper'; // npm install react-native-paper
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';  // npm install --save react-native-collapsibleon
import Config from "../assets/Datasource/Config";
import axios from 'axios'; // npm install axios

import { connect } from "react-redux";
import cart_val from "./cart_data";
const cart_data = cart_val;

const Cart = (props) => {
    const { navigation } = props;
    const [refres, setRefres] = useState(false);
    const [cart, setCart] = useState(null);
    const [emtycart, setEmptycart] = useState(false);
    const [afload, setAfload] = useState(false);

    const empty_cart = async (props, params, setEmptycart) => {
        setEmptycart(true);
        try {
            var request = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.empty_cart + Config.use_params(params);
            let data = await axios.delete(request);
            props.up_date_cart(data.data);
            alert("empty cart success!");
        } catch (error) {
            console.log(error);
        }
        setEmptycart(false);
    }

    useEffect(() => {
        // setCart(cart_data.items);
        // console.log(props.g_data.cart_data);
        setCart(props.g_data.cart_data);
        if (!afload) { setAfload(true); }
        // console.log("effect cart");
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]); // VirtualizedLists should never be nested inside plain ScrollViews with the same
    }, [props]);

    if (cart && cart.items && cart.items.length) {
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
                        <Cart_item items={cart.items} up_date_cart={props.up_date_cart} _tha_sid={props.g_data._tha_sid} ></Cart_item>
                    </ScrollView>
                </View>
                <DiscountElement></DiscountElement>
                <View style={{ flex: 30 }}>
                    <View style={{ justifyContent: "flex-end", height: "100%" }}>
                        <Cart_price prices={cart.prices}></Cart_price>
                    </View>
                </View>

                <Button title="show cart_data" onPress={() => {
                    console.log(cart);
                }}></Button>

                {(() => {
                    if (!emtycart) {
                        return (
                            <Button color={"red"} title="empty cart!!" onPress={() => {
                                empty_cart(props, { _tha_sid: props.g_data._tha_sid }, setEmptycart);
                            }}></Button>
                        );
                    } else {
                        return (
                            <TouchableOpacity>
                                <View style={{ backgroundColor: "#c1ff00", width: "100%", height: 36, borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require("../assets/Images/DualRing-1s-124px.gif")}
                                        style={{ width: 33, height: 33 }}
                                    ></Image>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                })()}
                {/* skipAndroidStatusBar={true} để không bị lặp lại nội dung khi hiển thị. */}
                {/* <Tooltip popover={<Text>tooooool</Text>} withOverlay={false} withPointer={true} skipAndroidStatusBar={true}>
                    <Text style={{ fontSize: 17, backgroundColor: "red", alignSelf: 'flex-start' }}>asdadsd</Text>
                </Tooltip> */}
            </View>
        )
    }

    if (afload) {
        return (<View style={{ flex: 1, padding: 6 }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>Not has cart data1!!</Text>
        </View>);
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={"violet"}></StatusBar>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../assets/Images/DoubleRing-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
            </View>
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
                        <Item_data {...item} up_date_cart={props.up_date_cart} _tha_sid={props._tha_sid} index={index} up_parent={setItems} items={items}></Item_data>
                    )
                }}
            ></FlatList>
        </View>
    );
};

const Item_data = (props) => {
    const update_qty = async (qty, setLoad) => {
        setLoad(true);
        try {
            let _params = { _tha_sid: props._tha_sid, item_id: props.id, qty: qty };
            let _request = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.update_qty + Config.use_params(_params);
            let res_data = await axios.put(_request);
            props.up_date_cart(res_data.data);
        } catch (error) {
            console.log(error);
        }
        setLoad(false);
    }
    const delete_item = async (setLoaddl) => {
        setLoaddl(true);
        try {
            let _request = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.removeItem + "/" + props.id + Config.use_params({ _tha_sid: props._tha_sid });
            console.log(_request);
            let res_data = await axios.delete(_request);
            props.up_date_cart(res_data.data);
        } catch (error) {
            console.log(error);
        }
        setLoaddl(false);
    }

    const [qty, setQty] = useState(0);
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);
    const [loaddl, setLoaddl] = useState(false);

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
                            {(
                                () => {
                                    if (!load) {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                console.log("sub qty");
                                                if (qty >= 1) {
                                                    let _qty = qty;
                                                    update_qty(_qty -= 1, setLoad);
                                                }
                                            }}>
                                                <Text style={{ fontSize: 20, fontWeight: "900", marginRight: 6 }}>-</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity>
                                                <Image source={require("../assets/Images/DualRing-1s-124px.gif")}
                                                    style={{ width: 33, height: 33 }}
                                                ></Image>
                                            </TouchableOpacity>
                                        );
                                    }
                                }
                            )()}
                        </View>
                        <TextInput
                            value={String(qty)}
                            // defaultValue={String(item.item_qty)} // không chạy
                            onChangeText={(value) => { setQty(value) }}
                            style={{ height: 30, width: 32, borderWidth: 1, borderRadius: 6, padding: 4, paddingLeft: 6 }}
                            keyboardType="numeric">
                        </TextInput>
                        <View style={{ textAlign: "center", justifyContent: "center" }}>
                            {(() => {
                                if (!load) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            console.log("add qty");
                                            let _qty = qty;
                                            update_qty(_qty += 1, setLoad);
                                        }}>
                                            <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: "600" }}>+</Text>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity>
                                            <Image source={require("../assets/Images/DualRing-1s-124px.gif")}
                                                style={{ width: 33, height: 33 }}
                                            ></Image>
                                        </TouchableOpacity>
                                    );
                                }
                            })()}
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
                                        // _html = [..._html, <Text style={{ color: "violet" }} key={data.request_option_html[element].id}>{data.request_option_html[element].type}: {data.request_option_html[element].label}</Text>];
                                        _html = [..._html, <Text style={{ color: "violet" }} key={data.request_option_html[element].id}>
                                            <RenderHtml
                                                contentWidth={Dimensions.get("window").width}
                                                enableExperimentalMarginCollapsing={true}
                                                source={{ html: `${data.request_option_html[element].type}: ${data.request_option_html[element].label}` }}
                                            ></RenderHtml>
                                        </Text>];
                                    }
                                }
                                return _html;
                            }
                        })()}
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ marginTop: 4, flexDirection: "row", justifyContent: "flex-end" }}>
                            {(() => {
                                if (!loaddl) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            // console.log("delete item?");
                                            // let _items = props.items;
                                            // _items.splice(props.index, 1);
                                            // props.up_parent([..._items]);
                                            delete_item(setLoaddl);
                                        }}
                                        >
                                            <FontAwesome5Icon name="trash" color="tomato"
                                                size={21}
                                            >
                                            </FontAwesome5Icon>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (<TouchableOpacity>
                                        <Image source={require("../assets/Images/DualRing-1s-124px.gif")}
                                            style={{ width: 33, height: 33 }}
                                        ></Image>
                                    </TouchableOpacity>);
                                }
                            })()}

                            <TouchableOpacity onPress={() => {
                                delete_item(setLoaddl);
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
    },
    (dispatch) => {
        return {
            up_date_cart: (cart_data) => {
                dispatch({
                    type: "UPDATE_CART",
                    cart_data: cart_data
                })
            }
        };
    }
)(Cart);