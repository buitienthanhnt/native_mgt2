import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, Button, Dimensions, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform } from "react-native";
import RenderHtml from 'react-native-render-html'; // npm install --save-prod react-native-render-html

// import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

import Config from "../../assets/Datasource/Config";
import ImageViewer from 'react-native-image-zoom-viewer'; // npm i react-native-image-zoom-viewer --save
import { Modal } from 'react-native';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { RadioButton } from 'react-native-paper';

const CONTENT = [
    {
        title: 'Terms and Conditions',
        content:
            'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
        title: 'Privacy Policy',
        content:
            'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
        title: 'Return Policy',
        content:
            'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
];

const DetailProduct = ({ route, navigation }) => {
    const myRef = useRef();
    const [data, setData] = useState({});
    const [refresh, setRefresh] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [imagesPath, setImagesPath] = useState([]);
    const [select, setSelect] = useState({});
    const [showdetail, setShowdetail] = useState(false);
    const [modalhtml, setModalhtml] = useState("");
    const [wishlist, setWishlist] = useState(false);
    const [qty, setQty] = useState(1);

    const image_height = 280;
    const _bottom = Dimensions.get("window").height - image_height;

    useEffect(() => {
        if (isMounted) {
            const focusHandler = navigation.addListener('focus', () => { // lắng nghe luôn gọi lại khi mở màn này
                console.log(route.params);
                getDetail(route.params.pro_id).then((res) => {
                    console.log(res);
                    setData(res);
                    setRefresh(false);
                    setIsMounted(false);
                });
            });
            return focusHandler;
        }

    }, [route.params]); // [route.params] cần truyền giá trị này vào để  nhận route param trong addListener(), và tránh vòng lặp liên tục của useEffect

    return (
        <View>
            {
                (
                    () => {
                        if (data.detail_data != undefined) {
                            return (
                                <View 
                                    showsVerticalScrollIndicator={false}  // ẩn thanh trượt
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Text style={{ fontSize: 18 }}>{(data && data.detail_data != undefined) ? data.detail_data.name : "..."}</Text>
                                    <Modal visible={showModel} transparent={true} >
                                        <View
                                            style={{ flex: 1 }}>
                                            <ImageViewer imageUrls={imagesPath} backgroundColor={"white"} />
                                            <TouchableOpacity
                                                style={{ alignItems: "center" }}
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
                                        renderItem={
                                            (item) => {
                                                return (
                                                    <View style={{ width: Dimensions.get("window").width, height: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "white" }}>
                                                        <TouchableOpacity
                                                            style={{ width: Dimensions.get("window").width, height: "100%", flexDirection: "row", justifyContent: "center", backgroundColor: "white" }}
                                                            onPress={() => {
                                                                setImagesPath(filter_image_path(item.item, imagesPath));
                                                                setShowModel(true);
                                                            }}>
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
                                            <Text style={{ fontSize: 22 }}>price: {data.detail_data != undefined ? data.detail_data.price * qty : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", width: "50%", justifyContent: "flex-end" }}>
                                            <Text style={{ fontSize: 12, height: "auto", alignSelf: "flex-end"}}>(instock)</Text>
                                            <Text style={{ fontSize: 16 }}>qty:</Text>
                                            <TextInput
                                                style={{ borderWidth: 1, height: "auto", minHeight: 22, width: Platform.OS == "web" ? 40 : "auto", minWidth: 35, borderRadius: 4, right: 0, paddingLeft: 4 }}
                                                keyboardType='numeric'
                                                onChangeText={(text) => {
                                                    setQty(text);
                                                }}
                                                value={qty + ""}
                                                maxLength={10}  //setting limit of input
                                            />
                                        </View>
                                    </View>

                                    <View style={{
                                        
                                        flexDirection: "row",
                                        paddingRight: 8,
                                        paddingBottom: 4
                                    }} >
                                        <View style={{width: "30%", paddingLeft: 2}}>
                                            <Text>sku: {data.detail_data != undefined ? data.detail_data.sku : ""}</Text>
                                        </View>
                                        <View style={{
                                            justifyContent: "flex-end",
                                            flexDirection: "row",
                                            width: "70%"
                                        }}>
                                            <Modal visible={showdetail} transparent={true} >
                                                <View
                                                    style={{ flex: 1, backgroundColor: "white" }}
                                                >

                                                    <ScrollView
                                                        style={{
                                                            height: Dimensions.get("window").height - 30,
                                                            width: Dimensions.get("window").width,
                                                            paddingLeft: 6, paddingRight: 6
                                                        }}>
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
                                                onPress={()=>{
                                                    setModalhtml(data.detail_data != undefined ? (data.detail_data.more_information ?? "not has data") : "");
                                                    setShowdetail(true)
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
                                                    color={!wishlist ?"black" : "red"}
                                                    size={26}
                                                >
                                                </FontAwesome5Icon>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Config_attr
                                        data={data.detail_data != undefined && data.detail_data.config_data ? data.detail_data.config_data.attribute : null}
                                        parent={{ _select: select, _setselect: setSelect }} >
                                    </Config_attr>

                                    <View>
                                        <Button title="add to cart" onPress={() => {
                                            console.log("add to cart function");
                                        }}></Button>
                                    </View>

                                    <ScrollView style={{marginTop: 4, backgroundColor:"red"}}>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                        <Text>123123</Text>
                                    </ScrollView>
                                </View>
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

const filter_image_path = (image_path, image_paths) => {
    console.log("filter_image_path");
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

const getDetail = (product_id = 0) => {
    if (product_id) {
        let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.product_detail + product_id;
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

const Config_attr = (props, { route, navigation }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.data);
    })

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
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

export default DetailProduct;