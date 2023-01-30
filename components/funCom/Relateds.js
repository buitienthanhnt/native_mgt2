import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, LogBox } from "react-native";
import Config from "../../assets/Datasource/Config";
import { connect } from "react-redux";

const Relateds = (props) => {
    
    const get_related_products = async (pro_id = null) => {
        if (pro_id) {
            let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.product_related + pro_id + Config.use_params({_tha_sid: props.g_data._tha_sid});
            return fetch(path).then((response) => response.json()).then((data) => {
                return data;
            });
        }
        else {
            return new Promise((resolveOuter) => {
                resolveOuter(
                );
            });
        }
    }

    const [product_id, setProduct_id] = useState(null);
    const [list, setList] = useState([]);
    const [first, setFirst] = useState(true);
    let title = "Related product list you can like!!";

    useEffect(() => {
        if ((props && props.pro_id && first) || product_id != props.pro_id) {
            setProduct_id(props.pro_id);
            get_related_products(props.pro_id).then((datas) => {
                if (datas && datas.items) {
                    setList(datas.items);
                    setFirst(false);
                }
            })
        }
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    },[props.pro_id])

    return (
        <View style={{paddingTop: 6}}>
            <View style={{ height: 1, backgroundColor: "black", width: Dimensions.get("window").width }}></View>{/* đường kẻ ngang */}
            <Text style={{fontSize:16, textAlign: "left", textDecorationLine: "underline"}}>{title.toLocaleUpperCase()}</Text>
            <FlatList
                style={{marginTop: 6, marginLeft: 8}}
                data={list}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled = {false}
                keyExtractor={(item) => item.eid}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={()=>{
                                console.log(item.eid);
                                getDetail(item.eid).then((res) => {
                                    props.image_path([]);
                                    props.data_set(res);
                                });
                            }}>
                                <View>
                                    <Image source={{ uri: item.image_path }} style={{ width: 180, height: 210, marginRight: 10, resizeMode: "cover", borderRadius: 12 }}></Image>
                                    <Text style={{ textAlign: "center" }}>{item.name.slice(0, 22)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            ></FlatList>
        </View>
    )
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

const css = StyleSheet.create({
    container: {

    }
});

export default connect(
    state=>{
        return{
            g_data: state.defRe
        };
    }
)(Relateds);