import React, { Component } from "react";
import { View, Text, Dimensions, FlatList, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from "react-native";
import Config from "../../assets/Datasource/Config";
import ListProduct from "./ListProduct";
import { connect } from "react-redux";

class ListCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_data: null,
            refresh: true
        };
    }
    _isMounted = true;

    setData = (data_id) => {
        this.getData(data_id).then(
            (data) => {
                this.setState({ category_data: data, refresh: false });
            }
        );
    }

    UNSAFE_componentWillMount() {
        if (this._isMounted) {
            this.getData().then(
                (data) => {
                    this.setState({ category_data: data, refresh: false });
                }
            );
        }
    }

    UNSAFE_componentWillUnmount() {
        this._isMounted = false;
    }

    getData = (category_id = null) => {
        return fetch(Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.category_list + (category_id ? "?category_id=" + category_id : '')).then(
            (response) => response.json()
        ).then(
            (json) => {
                return json;
            }
        ).catch(
            (error) => {
                console.log(error);
                this.setState({ refresh: false });
            }
        );
    }

    render() {
        if (this.state.refresh) {
            return (
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ width: 100, height: 100, resizeMode: "cover" }} source={require("../../assets/Images/DoubleRing-1s-200px.gif")}></Image>
                </View>
            )
        }
        // if (!this.state.category_data) {
        //     return (
        //         <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        //             <Image style={{ width: 100, height: 100, resizeMode: "cover" }} source={require("../../assets/Images/DoubleRing-1s-200px.gif")}></Image>
        //         </View>
        //     )
        // }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar></StatusBar>
                <View style={css.view_container1}>
                    {(
                        () => {
                            if (this.state.category_data && this.state.category_data.children != undefined) {
                                return (<CategoryTop
                                    data={this.state.category_data.children != undefined ? this.state.category_data.children : []}
                                    current_category={this.state.category_data.name}
                                    parent={this}
                                    {...this.props}
                                ></CategoryTop>);
                            } else {
                                return (
                                    <View>
                                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>{this.state.category_data ? this.state.category_data.name : ""} {"\n"}</Text>
                                        <View >
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: "#2596be",
                                                    borderRadius: 4,
                                                    justifyContent: "center",
                                                    flexDirection: "row",
                                                    width: "100%"
                                                }}
                                                onPress={() => {
                                                    // console.log("navigate to root");
                                                    this.getData().then(
                                                        (data) => {
                                                            this.setState({ category_data: data, refresh: false });
                                                        }
                                                    );
                                                }}>
                                                <Text style={{ fontSize: 20, fontWeight: "bold" }}> root category</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>)
                            }
                        }
                    )()}
                </View>
                <View style={css.view_container_2}>
                    {
                        (
                            () => {
                                if (this.state.category_data && this.state.category_data.category_id != undefined) {
                                    return (<ListProduct category_id={this.state.category_data.category_id} navigation={this.props.navigation}></ListProduct>)
                                }
                            }
                        )()
                    }
                </View>
            </View>
        )
    }
}

class CategoryTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_category: "",
            list: [],
            refresh: true
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({ list: this.props.data != undefined ? this.props.data : [], current_category: this.props.current_category, refresh: false });
    }

    UNSAFE_componentWillUpdate() {
        if (this.state.current_category != this.props.current_category) {
            this.setState({ refresh: true });
        }

        if (this.state.refresh) {
            this.setState({ list: this.props.data != undefined ? this.props.data : [], current_category: this.props.current_category, refresh: false });
        }
    }

    render() {
        const getCategory = (category_id = null) => {
            let category_request = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.category_list + (category_id ? "?category_id=" + category_id : '') + Config.use_params({ _tha_sid: this.props.g_data._tha_sid });
            return fetch(category_request).then(
                (response) => response.json()
            ).then(
                (json) => {
                    return json;
                }
            ).catch(
                (error) => console.log(error)
            );
        };

        return (
            <View style={{ paddingBottom: 18 }}>
                <Text style={{ textAlign: "center", fontSize: 18 }}>{this.state.current_category}</Text>
                <View style={Platform.OS == "web" ? css.top_web : css.top_mobi}>
                    <View style={{ width: "60%" }}>
                        <FlatList
                            data={this.state.list}
                            keyExtractor={item => item.category_id}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshing={this.state.refresh}
                            onRefresh={() => {
                                getCategory().then((result) => {
                                    this.setState({ current_category: result.name, list: result.children });
                                })
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={css.item_view}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ refresh: true });
                                                getCategory(item.category_id).then((result) => {
                                                    this.props.parent.setState({ category_data: result });
                                                    return result;
                                                }).then((result) => {
                                                    this.props.parent.setState({ category_data: result });
                                                })
                                            }}
                                        >
                                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        ></FlatList>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", width: "40%", backgroundColor: "#bfff00" }}>
                        <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=>{
                            // alert(1321321);
                            this.props.parent.getData().then(
                                (data) => {
                                    this.props.parent.setState({ category_data: data, refresh: false });
                                    return data;
                                }
                            ).then(
                                (data) => {
                                    this.props.parent.setState({ category_data: data, refresh: false });
                                }
                            );
                        }}>
                            <Image source={require("../../assets/Images/uav-2760-1657582452.jpg")} style={
                                {
                                    width: '100%',
                                    height: "100%",
                                    resizeMode: "contain"
                                }
                            }></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const css = StyleSheet.create({
    view_container1: {
        flex: 25,
        backgroundColor: "#d1b984",
        paddingBottom: 30
    },
    view_container_2: {
        flex: 75,
        backgroundColor: "green"
    },
    item_view: {
        backgroundColor: "#86a6d9",
        margin: 3,
        borderRadius: 6,
        padding: 2
    },
    top_web: {
        flexDirection: "row",
        height: Dimensions.get("window").height / 100 * 25,
        paddingBottom: 18
    },
    top_mobi: {
        flexDirection: "row"
    }

});

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(ListCategory);