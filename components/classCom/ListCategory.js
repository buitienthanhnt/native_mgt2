import React, { Component } from "react";
import { View, Text, Dimensions, FlatList, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import Config from "../../assets/Datasource/Config";
import ListProduct from "./ListProduct";

class ListCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_data: {},
            refresh: true
        };
    }
    _isMounted = true;

    setData = (data_id)=>{
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
            (error) => console.log(error)
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={css.view_container1}>
                    {(
                        () => {
                            if (this.state.category_data.children != undefined) {
                                return (<CategoryTop
                                    data={this.state.category_data.children != undefined ? this.state.category_data.children : []}
                                    current_category={this.state.category_data.name}
                                    parent={this}
                                ></CategoryTop>);
                            } else {
                                return (<Text style={{ textAlign: "center" }}>loading...end of category.</Text>)
                            }
                        }
                    )()}
                </View>
                <View style={css.view_container_2}>
                    {
                        (
                            ()=>{
                                if (this.state.category_data.category_id != undefined) {
                                    return(<ListProduct category_id={this.state.category_data.category_id} navigation = {this.props.navigation}></ListProduct>)
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

    UNSAFE_componentWillUpdate(){
        if (this.state.current_category != this.props.current_category) {
            this.setState({refresh: true});
        }

        if (this.state.refresh) {
            this.setState({ list: this.props.data != undefined ? this.props.data : [], current_category: this.props.current_category, refresh: false });
        }
    }

    render() {
        return (
            <View style={{ paddingBottom: 18}}>
                <Text style={{ textAlign: "center", fontSize: 18 }}>{this.state.current_category}</Text>
                <View style={Platform.OS == "web" ? css.top_web : css.top_mobi}>
                    <View style={{width: "60%"}}>
                        <FlatList
                            data={this.state.list}
                            keyExtractor={item => item.category_id}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            refreshing={this.state.refresh}
                            onRefresh={()=>{
                                getCategory().then((result)=>{
                                    this.setState({ current_category: result.name, list: result.children});
                                })
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={css.item_view}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                getCategory(item.category_id).then((result)=>{
                                                    // if (!result.children) {
                                                    //     getCategory().then((result)=>{
                                                    //         this.setState({ current_category: result.name, list: result.children});
                                                    //     })
                                                    // }else{
                                                    //     this.setState({ current_category: result.name, list: result.children});
                                                    // }
                                                    this.props.parent.setState({category_data: result});
                                                    return result;
                                                }).then((result)=>{
                                                    this.props.parent.setState({category_data: result});
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

                    <View style={{justifyContent: "center",alignItems: "center", width: "40%"}}>
                            <Image source={require("../../assets/Images/uav-2760-1657582452.jpg")} style={
                                {
                                    width: '100%',
                                    height: "100%",
                                    resizeMode: "contain"
                                }
                            }></Image>
                    </View>
                </View>
            </View>
        );
    }
}

const getCategory = (category_id = null) => {
    return fetch(Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.category_list + (category_id ? "?category_id=" + category_id : '')).then(
        (response) => response.json()
    ).then(
        (json) => {
            return json;
        }
    ).catch(
        (error) => console.log(error)
    );
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
        height: Dimensions.get("window").height/100*25, 
        paddingBottom:18 
    },
    top_mobi:{
        flexDirection: "row"
    }

});

export default ListCategory;