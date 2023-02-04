import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Button, Dimensions, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, LogBox } from "react-native";
import RenderHtml from 'react-native-render-html'; // npm install --save-prod react-native-render-html

// import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';  // npm install --save react-native-collapsible
// import Accordion from 'react-native-collapsible/Accordion';

import Config from "../../assets/Datasource/Config";
import ImageViewer from 'react-native-image-zoom-viewer'; // npm i react-native-image-zoom-viewer --save
import { Modal } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { RadioButton } from 'react-native-paper';
import Relateds from "./Relateds";
import Reviews from "./Reviews";

import axios from 'axios'; // npm install axios
import { connect } from "react-redux";

const add_to_cart = async (props, params)=>{
    // console.log(props);
    var request = Config.http+Config.ip+Config.uri_241+Config.rest+Config.v1+Config.api.add_cart+Config.use_params(params);
    let data = await axios.post(request);
    // console.log(data);
    props.up_date_cart(data.data);
}

const DetailProduct = (props) => {
    const { route, navigation, g_data } = props;
    const [data, setData] = useState({});
    const [refresh, setRefresh] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [imagesPath, setImagesPath] = useState([]);
    const [select, setSelect] = useState({});
    const [showdetail, setShowdetail] = useState(false);
    const [modalhtml, setModalhtml] = useState("");
    const [modaltype, setModaltype] = useState("");
    const [wishlist, setWishlist] = useState(false);
    const [qty, setQty] = useState({ sim: 1 });
    const [price, setPrice] = useState("0");
    const image_height = 280;

    const getDetail = (product_id = 0) => {
        if (product_id) {
            let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.product_detail + product_id + Config.use_params({ _tha_sid: g_data._tha_sid }); //`?_tha_sid=${g_data._tha_sid}`;
            return fetch(path).then((response) => response.json()).then(
                (data) => {
                    return data;
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        } else {
            return new Promise((resolveOuter) => {
                resolveOuter(
                );
            });
        }
    }

    useEffect(() => {
        setWishlist(false);
        if (isMounted) {
            const focusHandler = navigation.addListener('focus', () => { // lắng nghe luôn gọi lại khi mở màn này
                console.log(route.params);
                getDetail(route.params.pro_id).then((res) => {
                    // setId(res.detail_data.eid);
                    setData(res);
                    setRefresh(false);
                    setIsMounted(false);
                }).catch((error) => {
                    setData({});
                });
            });
            return focusHandler;
        }
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]); // VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because
        // lỗi xung đột giữa scrollView và Flatlist(nó sẽ không hiện cảnh báo trên điện thoại.)
    }, [route.params]); // [route.params] cần truyền giá trị này vào để  nhận route param trong addListener(), và tránh vòng lặp liên tục của useEffect.

    return (
        <View style={{flex:1}}> 
            { // <View> bên trên cần flex:1 để có thể cuộn được trên website cho <scroolView>(nếu không dễ bị lỗi.)
                (
                    () => {
                        if (data.detail_data != undefined) {
                            return (
                                <ScrollView
                                    style={{ backgroundColor: Platform.OS == "web" ? "whitesmoke" : "", flex:1 }}
                                    showsVerticalScrollIndicator={false}  // ẩn thanh trượt
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Text style={{ fontSize: 18, paddingLeft: 8 }}>{(data && data.detail_data != undefined) ? data.detail_data.name : "..."}</Text>
                                    <Modal visible={showModel} transparent={true} >
                                        <View
                                            style={{ flex: 1 }}>
                                            <ImageViewer imageUrls={imagesPath} backgroundColor={"white"} />
                                            <TouchableOpacity
                                                style={{ alignItems: "center", backgroundColor: "violet" }}
                                                onPress={() => {
                                                    if (showModel) {
                                                        setShowModel(false);
                                                    }
                                                }}
                                            >
                                                <FontAwesome5Icon name="minus"
                                                    color="black"
                                                    size={26}
                                                >
                                                </FontAwesome5Icon>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>

                                    <FlatList
                                        data={(data && data.detail_data != undefined) ? data.detail_data.ex_media : []}
                                        keyExtractor={item => item}
                                        horizontal={true}
                                        pagingEnabled={true}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        style={{ backgroundColor: "white" }}
                                        // scrollEnabled = {false}
                                        renderItem={
                                            (item) => {
                                                // console.log(item);
                                                return (
                                                    <View style={{ width: Dimensions.get("window").width, height: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "white" }}>
                                                        <TouchableOpacity
                                                            style={{ width: Dimensions.get("window").width, height: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "white" }}
                                                            onPress={() => {
                                                                setImagesPath(filter_image_path(item.item, imagesPath));
                                                                setShowModel(true);
                                                            }}>
                                                            {/* <Text style={{textAlign: "center", marginLeft: 90}}>{item.item}</Text> */}
                                                            <Image source={{ uri: item.item }} style={{ width: "60%", height: image_height, borderRadius: 10, resizeMode: "contain" }}></Image>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        }
                                        refreshing={refresh}
                                        onRefresh={() => {
                                            console.log(123);
                                        }}
                                    ></FlatList>

                                    <View style={{ padding: 2, flexDirection: "row" }}>
                                        <View style={{ width: "50%" }}>
                                            <Text style={{ fontSize: 22 }}>price: {data.detail_data != undefined && (data.detail_data.type == "simple" || data.detail_data.type == "configurable") ? data.detail_data.price * qty.sim : price}</Text>
                                        </View>
                                        {(() => {
                                            if (data.detail_data != undefined && (data.detail_data.type == "simple" || data.detail_data.type == "configurable")) {
                                                return (
                                                    <View style={{ flexDirection: "row", width: "50%", justifyContent: "flex-end" }}>
                                                        <Text style={{ fontSize: 12, height: "auto", alignSelf: "flex-end" }}>(instock)</Text>
                                                        <Text style={{ fontSize: 16 }}>qty:</Text>
                                                        <TextInput
                                                            style={{ borderWidth: 1, height: "auto", minHeight: 22, width: Platform.OS == "web" ? 40 : "auto", minWidth: 35, borderRadius: 4, right: 0, paddingLeft: 4 }}
                                                            keyboardType='numeric'
                                                            onChangeText={(text) => {
                                                                setQty({ sim: text });
                                                            }}
                                                            value={qty.sim + ""}
                                                            maxLength={10}  //setting limit of input
                                                        />
                                                    </View>
                                                );
                                            }
                                        })()}
                                    </View>

                                    <View style={{
                                        flexDirection: "row",
                                        paddingRight: 8,
                                        paddingBottom: 4
                                    }} >
                                        <View style={{ width: "40%", paddingLeft: 2 }}>
                                            <Text>sku: {data.detail_data != undefined ? data.detail_data.sku : ""}</Text>
                                        </View>
                                        <View style={{
                                            justifyContent: "flex-end",
                                            flexDirection: "row",
                                            width: "60%"
                                        }}>
                                            <Modal visible={showdetail} transparent={true} animationType="slide" hardwareAccelerated={true} >
                                                <View
                                                    style={{ flex: 1, backgroundColor: "white" }}
                                                >

                                                    <ScrollView
                                                        style={{
                                                            height: Dimensions.get("window").height - 30,
                                                            width: Dimensions.get("window").width,
                                                            paddingLeft: 6, paddingRight: 6
                                                        }}>
                                                        <Text style={{ textAlign: "center", fontSize: 18, textDecorationLine: "underline", color: "violet" }}>{modaltype}</Text>
                                                        <RenderHtml
                                                            contentWidth={Dimensions.get("window").width}
                                                            source={{ html: modalhtml }}
                                                            enableExperimentalMarginCollapsing={true}
                                                        />
                                                    </ScrollView>

                                                    <TouchableOpacity
                                                        style={{ alignItems: "center", justifyContent: "flex-end" }}
                                                        onPress={() => {
                                                            if (showdetail) {
                                                                setShowdetail(false)
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesome5Icon name="minus"
                                                            color="black"
                                                            size={26}
                                                        >
                                                        </FontAwesome5Icon>
                                                    </TouchableOpacity>
                                                </View>
                                            </Modal>

                                            <TouchableOpacity style={{ width: 30, marginRight: 12, flexDirection: "row" }}
                                                onPress={() => {
                                                    let html = "";
                                                    data.detail_data.more_information.map(
                                                        (item) => {
                                                            let _conten = "<div>" + "<span style='color: green'>" + item.label + ":</span>" + "<span>" + item.value + "</span>" + "</div>";
                                                            html += _conten;
                                                        }
                                                    )
                                                    setModalhtml(data.detail_data != undefined ? (html ?? "not has data") : "");
                                                    setModaltype("product informations");
                                                    setShowdetail(true);
                                                }}
                                            >
                                                {/* <Text>{"2"}</Text> */}
                                                <FontAwesome5Icon name={"sitemap"}
                                                    color="black"
                                                    size={24}
                                                >
                                                </FontAwesome5Icon>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: 26, marginRight: 12 }} onPress={() => {
                                                setModalhtml(data.detail_data != undefined ? data.detail_data.content : "");
                                                setModaltype("product detail content");
                                                setShowdetail(true);
                                            }}>
                                                <FontAwesome5Icon name={"info-circle"}
                                                    color="black"
                                                    size={26}
                                                >
                                                </FontAwesome5Icon>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: 26 }} onPress={() => {
                                                console.log("add to wishlist");
                                                setWishlist(!wishlist);
                                            }}>
                                                <FontAwesome5Icon name={!wishlist ? "heart" : "gratipay"}
                                                    color={!wishlist ? "black" : "red"}
                                                    size={26}
                                                >
                                                </FontAwesome5Icon>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Config_attr
                                        data={data.detail_data != undefined && data.detail_data.config_data != undefined ? data.detail_data.config_data.attribute : null}
                                        parent={{ _select: select, _setselect: setSelect }} >
                                    </Config_attr>

                                    <Group_attr
                                        group_data={data.detail_data ? data.detail_data.group_data : []}
                                        parent={{ _select: select, _setselect: setSelect }}
                                    ></Group_attr>

                                    <Bunder_attr
                                        bund_data={data.detail_data ? data.detail_data.bund_data : []}
                                        parent={{ _select: select, _setselect: setSelect }}
                                        _qty={qty}
                                        _setqty={setQty}
                                    ></Bunder_attr>

                                    <View style={{ marginBottom: 6 }}>
                                        <Button title="add to cart" onPress={() => {
                                            var _params = {_tha_sid: props.g_data._tha_sid}
                                            if (data.detail_data.type == "simple") {
                                                _params = {..._params, qty: qty.sim, product: data.detail_data.eid};
                                            }
                                            add_to_cart(props, _params);
                                            // console.log(select, qty);
                                        }}></Button>
                                    </View>

                                    <Reviews reviews={data.detail_data != undefined ? data.detail_data.review_content : null}></Reviews>
                                    <Relateds pro_id={data.detail_data != undefined ? data.detail_data.eid : null} navigation={navigation} data_set={setData} image_path={setImagesPath}></Relateds>
                                    <View>
                                        <Button title="back to home" onPress={() => {
                                            navigation.navigate("Home");
                                        }}></Button>
                                    </View>
                                </ScrollView>
                            )
                        } else {
                            return (
                                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                    <Image source={require("../../assets/Images/DoubleRing-1s-200px.gif")} style={{ width: 100, height: 100 }}></Image>
                                    <Text>loading...</Text>
                                </View>
                            )
                        }
                    }
                )()
            }
        </View>
    );
};

const Bunder_attr = (props) => {
    const [bunder, setbunder] = useState([]);

    useEffect(() => {
        if (props.bund_data) {
            setbunder(props.bund_data);
        }
    }, [props])
    return (
        <View>
            {(() => {
                if (bunder.length) {
                    return (
                        <View>
                            <Text style={{ fontSize: 20, textDecorationLine: "underline", color: "green", fontWeight: "bold" }}>Bunder attrs</Text>
                            <FlatList

                                data={bunder}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Bunder_item
                                            bund_data={item}
                                            parent={{ _select: props.parent._select, _setselect: props.parent._setselect }}
                                            _qty={props._qty}
                                            _setqty={props._setqty}
                                        ></Bunder_item>
                                    )
                                }}
                            ></FlatList>
                        </View>
                    )
                }
            })()}
        </View>
    )
}

const Bunder_item = (props) => {

    const [items, setItems] = useState({});
    const [con, setCon] = useState(Platform.OS == "web" ? true : false);
    // const [con, setCon] = useState(true);
    const [qty, setQty] = useState(1 + "");
    const [select, setSelect] = useState(true);
    useEffect(() => {
        if (props.bund_data) {
            setItems(props.bund_data);
            if (items && items.id) {
                let n_qty = props._qty;
                n_qty[items.id] = qty;
                props._setqty(n_qty);
            }
        }
    }, [items, props]);

    return (
        <View
            style={{ paddingLeft: 4 }}
        >
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "70%" }}>
                    <TouchableOpacity onPress={() => { setCon(!con); }}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{items.id != undefined ? items.label : ""}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: "auto", width: "30%", alignItems: "flex-end", paddingRight: 4, paddingTop: 4 }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            width: 24,
                            height: "auto",
                            paddingLeft: 4,
                            paddingRight: 4
                        }}
                        keyboardType={"numeric"}
                        value={qty}
                        onChangeText={(text) => {
                            setQty(text + "");
                            let n_qty = props._qty;
                            n_qty[items.id] = text + "";
                            props._setqty(n_qty);
                        }}
                    >
                    </TextInput>
                </View>
            </View>
            <Collapsible collapsed={con} align="center">
                <FlatList
                    data={items.selections}
                    keyExtractor={(item) => item.eid}
                    renderItem={({ item }) => {
                        return (
                            <Bunder_select_item _item={item} _pid={items.id} parent={{ _select: props.parent._select, _setselect: props.parent._setselect }} pprv={select} ppr={setSelect}></Bunder_select_item>
                        )
                    }}

                ></FlatList>
                <View style={{ height: 1, backgroundColor: "black" }}></View>
            </Collapsible>
        </View>
    )
}

const Bunder_select_item = (props) => {
    const [item, setItem] = useState({});
    const [selecttion, setSelecttion] = useState(true);

    useEffect(() => {
        if (props._item) {
            setItem(props._item);
        }
    }, [props._select])

    return (
        <View style={{ flexDirection: "row", height: "auto" }}>
            <RadioButton
                value={item.eid}
                status={props.parent && props.parent._select[props._pid] == item.eid ? "checked" : "unchecked"} // unchecked || checked
                // status={"checked"}
                onPress={() => {
                    let selects = props.parent._select;
                    selects[props._pid] = item.eid;
                    props.parent._setselect(selects);
                    setSelecttion(!selecttion);
                    props.ppr(!props.pprv)
                }}
            />
            {/* <View style={{ flexDirection: "row", alignContent: "center", marginTop: "auto" }}> */}
            {(() => {
                if (Platform.OS != "web") {
                    // return(
                    //     <View style={{ flexDirection: "row", alignContent: "center", margin: "auto", marginLeft: 'inherit' }}>
                    //         <Text>ppppp</Text>
                    //     </View>
                    // )
                    return (
                        <View style={{ flexDirection: "row", alignContent: "center", margin: "auto", paddingTop: 6}}>
                            <View style={{ width: "70%" }}>
                                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            </View>
                            <View style={{ width: "30%", fontSize: 16 }}>
                                <Text style={{ fontSize: 16 }}>+$_{(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
                            </View>
                        </View>
                    )
                } else {
                    return (
                        <View style={{ flexDirection: "row", alignContent: "center", margin: "auto", marginLeft: 'inherit' }}>
                            <Text style={{ fontSize: 16, alignContent: "center", marginTop: "auto" }}>{item.name}   +$_{(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
                        </View>
                    )
                }
            })()}
            {/* </View> */}
        </View>
    );
}

const Group_attr = (props) => {
    const [groupdata, setGroupdata] = useState(null);
    // const [groupselect, setGroupselect] = useState({});

    useEffect(() => {
        if (props && props.group_data != undefined) {
            // console.log(props.group_data);
            setGroupdata(props.group_data);
        }
    }, [props])
    return (
        <View>
            <View style={{ height: 1, backgroundColor: "black" }}></View>
            {(() => {
                if (groupdata) {
                    return (
                        <Text style={{ fontSize: 18, color: "violet", textDecorationLine: "underline" }}>Group product items</Text>
                    )
                }
            })()}

            <FlatList
                data={groupdata}
                keyExtractor={(item) => item.eid}
                renderItem={({ item }) => {
                    return (
                        <Group_item item_data={item} parent={props.parent}></Group_item>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

const Group_item = (props) => {
    const [item, setItem] = useState({});
    const [selectdata, setSelectdata] = useState("");

    useEffect(() => {
        if (item.eid == undefined) {
            if (props.item_data != undefined) {
                setItem(props.item_data);
                setSelectdata(props.item_data.default_qty + "");
                if (props.item_data.eid) {
                    let value = props.parent._select;
                    value[Number(props.item_data.eid)] = props.item_data.default_qty ? props.item_data.default_qty + "" : 0; //selectdata;
                    props.parent._setselect(value);
                }
            }
        }
    }, [item])

    return (
        <View style={{ paddingLeft: 12 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "70%" }}>
                    <Text>{item.name}</Text>
                    <Text>$_{(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
                </View>
                <View style={{ height: "auto", width: "30%", alignItems: "flex-end", paddingRight: 4, paddingTop: 4 }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            width: 24,
                            height: "auto",
                            paddingLeft: 4,
                            paddingRight: 4
                        }}
                        keyboardType={"numeric"}
                        value={selectdata}
                        onChangeText={(text) => {
                            setSelectdata(text);

                            let value = props.parent._select;
                            console.log(selectdata);
                            value[Number(item.eid)] = text;
                            props.parent._setselect(value);
                        }}
                    >
                    </TextInput>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: "black" }}></View>
        </View>
    )
}

const filter_image_path = (image_path, image_paths) => {
    let index = -1;
    for (const key in image_paths) {
        if (image_paths[key].url == image_path) {
            index = key;
            break;
        }
    }
    if (index != -1) {
        image_paths.splice(index, 1);
    }
    image_paths.unshift({ url: image_path });
    return image_paths;
}

const Config_attr = (props, { route, navigation }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.data);
    })

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            // scrollEnabled = {false}
            renderItem={({ item }) => {
                return (
                    <View>
                        <View style={{ height: 1, backgroundColor: "black" }}></View>{/* đường kẻ ngang */}
                        <Conslap data={item} parent={props.parent}></Conslap>
                    </View>
                )
            }}
        ></FlatList>
    );
}

const Conslap = (props) => {
    const [item, setItem] = useState(null);
    const [con, setCon] = useState(true);
    useEffect(() => {
        setItem(props.data);
    });

    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity onPress={() => {
                setCon(!con);
            }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{item != null ? item.label : "Single Collapsible"}</Text>
                    {/*Heading of Single Collapsible*/}
                </View>
            </TouchableOpacity>

            <Collapsible collapsed={con} align="center">
                <View style={styles.content}>
                    <ListAttributes list={item != null ? item.options : []} parent={props.parent} attr_id={item ? item.id : null}></ListAttributes>
                </View>
            </Collapsible>
        </View>
    )
}

const ListAttributes = (props) => {
    const [list, setList] = useState([]);
    const [val, setVal] = useState(null);
    useEffect(() => {
        setList(props ? props.list : []);
    })

    return (
        <View>
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                // horizontal={true}
                // pagingEnabled={true}
                style={{ backgroundColor: "white" }}
                // scrollEnabled = {false}
                renderItem={
                    ({ item }) => {
                        return (
                            <View style={{ width: 120 }}>
                                <TouchableOpacity
                                    style={{ height: 32, marginBottom: 1, flexDirection: "row" }}
                                >
                                    <RadioButton
                                        value={item.id}
                                        status={item.id == val ? "checked" : "unchecked"} // unchecked || checked
                                        onPress={() => {
                                            setVal(item.id);
                                            let tmp_select = props.parent._select;
                                            tmp_select[props.attr_id] = item.id;
                                            props.parent._setselect(tmp_select);
                                            console.log(props.parent._select);
                                        }}
                                    />
                                    <Text style={{ fontSize: 20, alignContent: "center", marginTop: "auto" }}>{item.label ?? "123123"}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }

            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        height: "auto"
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});

export default connect(
    state => {
        return {
            g_data: state.defRe
        }
    },
    dispatch => {
        return {
            up_date_cart: (cart_data)=>{
                dispatch({
                    type: "UPDATE_CART",
                    cart_data: cart_data
                })
            }
        };
    }
)(DetailProduct);