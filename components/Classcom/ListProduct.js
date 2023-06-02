import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, Platform, TextInput } from "react-native";
import Config from '../../assets/Datasource/Config';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from "react-redux";

class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <_ListProduct navigation={this.props.navigation} category_id={this.props.category_id != undefined ? this.props.category_id : this.props.route.params.category_id} {...this.props}></_ListProduct>
            </View>
        );
    }
}

class _ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            page: 1,
            values: null,
            category_id: null,
            refresh: true,
            update_refresh: true,
            colum: 1,
            search: "",
            search_loading: false,
            filter_model: false,
            filter_data: null,
            get_data_loadding: false,
            null_data: false

        };
    }
    _isMounted = true;

    UNSAFE_componentWillMount() {
        if (this.props.category_id) {
            this.getdata(this.props.category_id, 1, Config.page_size).then((data) => {
                if (this._isMounted) {
                    if (data.items) {
                        this.setState({
                            title: "",
                            values: data,
                            page: 1,
                            category_id: this.props.category_id,
                            refresh: false,
                            search_value: ""
                        });
                    } else {
                        this.setState({
                            title: "not has result data!!!",
                            values: null,
                            null_data: true
                        });
                    }
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getdata = function (category_id = 5, _p = 1, p_size = Config.page_size) {
        let request_url = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.product_list + category_id + Config.use_params({ _p: _p, p_size: p_size, _tha_sid: this.props.g_data._tha_sid })
        //"?_p=" + _p + "&p_size=" + p_size ;
        return fetch(request_url).then(
            (response) => response.json()
        ).then(
            (json) => { return json; }
        ).catch(
            (error) => console.log(error)
        );
    }

    UNSAFE_componentWillUpdate() {
        if (this.props.category_id) {
            if (this.state.refresh == false && this.state.update_refresh && (this.state.category_id != this.props.category_id)) {

                this.getdata(this.props.category_id, 1, Config.page_size).then(
                    (data) => {
                        if (data.items) {
                            // console.log(data);
                            this.setState({ category_id: this.props.category_id, values: data, title: "" });
                        } else {
                            this.setState({ title: "not has result data!!", values: null, null_data: true });
                        }

                    }
                )
            }
        }
    }

    render() {
        if (!(this.state.values && this.state.values.items) && Platform.OS == "web" && !this.state.null_data) {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "rgb(242, 242, 242)" }}>
                    {
                        (
                            () => {
                                if (this.state.title) {
                                    return (
                                        <Image source={require("../../assets/Images/weather-1.1s-200px.png")} style={{ width: 100, height: 100 }}></Image>
                                    )
                                } else {
                                    return (
                                        <Image source={require("../../assets/Images/DoubleRing-1s-200px.gif")} style={{ width: 100, height: 100 }}></Image>
                                    )
                                }
                            }
                        )()
                    }

                    <Text>{this.state.title ?? "loading..."}</Text>
                </View>
            )
        }
        return (
            <View style={css._list_product}>
                <View style={{ justifyContent: "flex-end", flexDirection: "row", paddingRight: 6, paddingTop: 3 }}>
                    <TouchableOpacity style={{ paddingRight: 12, }}
                        onPress={() => {

                        }}
                    >
                        <FontAwesome5Icon name={"home"}
                            color="black"
                            size={26}
                        >
                        </FontAwesome5Icon>
                    </TouchableOpacity>

                    {(
                        () => {
                            if (this.state.search) {
                                return (
                                    <View>
                                        <TextInput
                                            value={this.state.search_value}
                                            onChangeText={(value) => {
                                                this.setState({ search_value: value })
                                            }}
                                            style={{ width: Dimensions.get("window").width / 2, height: 26, borderWidth: 1, borderRadius: 4, paddingLeft: 6 }}></TextInput>
                                    </View>
                                )
                            }
                        }
                    )()}

                    <TouchableOpacity style={{ paddingRight: 12, paddingLeft: 2 }}
                        onPress={() => {
                            if (!this.state.search_value) {
                                this.setState({ search: !this.state.search })
                            } else {
                                this.setState({ search_loading: true })
                            }
                            // console.log(this.state.search_value);
                        }}
                    >
                        {(() => {
                            if (!this.state.search_loading) {
                                return (
                                    <FontAwesome5Icon name={"search"}
                                        color="black"
                                        size={26}
                                    >
                                    </FontAwesome5Icon>
                                )
                            } else {
                                return (
                                    <Image style={{ width: 26, height: 26, resizeMode: "cover" }} source={require("../../assets/Images/DualRing-1s-124px.gif")}></Image>
                                )
                            }
                        })()}

                    </TouchableOpacity>

                    <Modal visible={this.state.filter_model} transparent={true}
                        animationType="slide"
                        hardwareAccelerated={true} >
                        <View
                            style={{ flex: 1, backgroundColor: "white" }}
                        >
                            {
                                this.state.values && this.state.values.filters != undefined && <Filter values={this.state.values.filters}></Filter>
                            }
                            <Button title="hide" onPress={() => {
                                this.setState({ filter_model: false });
                            }}></Button>
                        </View>
                    </Modal>

                    <TouchableOpacity style={{ paddingRight: 12 }}
                        onPress={() => {
                            this.setState({ filter_model: !this.state.filter_model })
                        }}
                    >
                        <FontAwesome5Icon name={"filter"}
                            color="black"
                            size={26}
                        >
                        </FontAwesome5Icon>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ colum: this.state.colum == 1 ? 2 : 1 })
                        }}
                    >
                        <FontAwesome5Icon name={this.state.colum == 1 ? "th-list" : "bars"}
                            color="black"
                            size={26}
                        >
                        </FontAwesome5Icon>
                    </TouchableOpacity>
                </View>

                {/* <Text style={{textAlign: "center"}}>{this.state.title}</Text> */}

                <FlatList
                    horizontal={false}
                    numColumns={this.state.colum}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    key={this.state.colum} // nếu không có cái này thì sẽ lỗi khi chuyển đổi số  lượng cột
                    data={this.state.values != undefined ? this.state.values.items : []}
                    renderItem={({ item }) => <Item
                        image_path={item.image_path}
                        text_title={item.name}
                        key={item.eid}
                        parent={this}
                        navigation={this.props.navigation}
                        eid={item.eid}
                    ></Item>
                    }
                    keyExtractor={item => item.eid}
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.getdata(this.state.category_id, 1).then((result_data) => {
                            this.setState({ page: 1, values: result_data, load_data: true });
                        })
                    }}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {   // gọi khi: onEndReachedThreshold được kích hoạt
                        this.setState({ refresh: true });
                        if (!this.state.get_data_loadding) {
                            this.setState({ get_data_loadding: true });
                            this.getdata(this.state.category_id, this.state.page + 1).then((data) => {
                                if (data) {
                                    try {
                                        let resl = this.state.values.items;
                                        let res_values = this.state.values;
                                        res_values.items.push(...data.items);

                                        this.setState({
                                            page: this.state.page + 1,
                                            values: res_values,
                                            refresh: false,
                                            get_data_loadding: false
                                        });
                                    } catch (error) {
                                        this.setState({
                                            refresh: false,
                                            get_data_loadding: false
                                        })
                                    }

                                } else {
                                    this.setState({ refresh: false, get_data_loadding: false });
                                }
                            }).catch(e => console.log(e))
                        }
                    }}
                ></FlatList>
                <View style={{ height: 8, width: "100%" }}></View>
            </View>

        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let image_path = this.props.image_path ?? "";
        let parent = this.props.parent;
        let col = this.props.parent.state.colum;

        return (
            <View style={col == 1 ? css.list_1c : css.list_2c}>
                <View>
                    <Text style={css.text_title}>
                        {this.props.text_title != undefined ? this.props.text_title.slice(0, 12) : "title of pro"}
                    </Text>

                </View>
                <View>
                    {
                        (
                            () => {
                                if (Platform.OS == "web") {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate("DetailProduct", { pro_id: this.props.eid });
                                        }}>
                                            <Image
                                                style={col == 1 ? css.img_1c_w : css.img_2c_w}
                                                resizeMode={col == 1 ? "contain" : "cover"}
                                                source={{ uri: image_path }}>
                                            </Image>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate("DetailProduct", { pro_id: this.props.eid });
                                        }}>
                                            <Image
                                                style={col == 1 ? css.img_1c_m : css.img_2c_m}
                                                resizeMode="contain"
                                                source={{ uri: image_path }}>
                                            </Image>
                                        </TouchableOpacity>
                                    );
                                }
                            }
                        )()
                    }
                </View>

            </View>
        );
    }
}

const css = StyleSheet.create({
    magento: {
        backgroundColor: "violet",
        borderRadius: 6,
        borderWidth: 4,
        width: 180, height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    text_title: {
        fontSize: 18,
        paddingLeft: 12,
        marginTop: 12,
        color: "blue",
        textDecorationLine: "underline"

    },
    _list_product: {
        height: "100%",
        backgroundColor: "#83ad3e" //"#7cde66" //"#5acc7c" //
    },
    list_2c: {
        width: Platform.OS == "web" ? Dimensions.get("window").width / 2 - 12 : Dimensions.get("window").width / 2 - 12,
        height: Platform.OS == "web" ? Dimensions.get("window").width / 2 : Dimensions.get("window").width / 2 - 12,
        borderRadius: 20,
        margin: Platform.OS == "web" ? 6 : 6,
        // marginRight: 6,
        marginBottom: 18,
        justifyContent: 'center'
        // backgroundColor: "white"
    },
    list_1c: {
        borderRadius: 20,
        margin: 6,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    img_1c_w: {
        width: Dimensions.get("window").width - 12,
        height: Dimensions.get("window").width * 3 / 5,
        borderRadius: 20
    },
    img_1c_m: {
        width: Dimensions.get("window").width - 12,
        height: Dimensions.get("window").width * 3 / 5,
        borderRadius: 20
    },
    img_2c_w: {
        width: Dimensions.get("window").width / 2 - 12,
        height: Dimensions.get("window").width / 2,
        borderRadius: 20
    },
    img_2c_m: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    }
});

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: []
        };
    }

    UNSAFE_componentWillMount() {
        if (this.props.values) {
            this.setState({ filters: this.props.values });
        }
    }

    render() {
        return (
            <ScrollView
                style={{
                    height: Dimensions.get("window").height - 30,
                    width: Dimensions.get("window").width,
                    paddingLeft: 6, paddingRight: 6
                }}>
                <Text style={{ textAlign: "center", fontSize: 18, textDecorationLine: "underline", color: "violet" }}>filter products</Text>
                <FlatList data={this.state.filters}
                    renderItem={({ item }) => <Text>{item.label}</Text>
                    }>
                </FlatList>
            </ScrollView>
        );
    }
}

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(ListProduct);