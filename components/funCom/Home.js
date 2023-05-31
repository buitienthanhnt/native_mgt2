import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, BackHandler } from 'react-native';
import Config from "../../assets/Datasource/Config";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

const get_cart = async (propsp, _tha_sid = null)=>{
    const get_cart_url = Config.http+Config.ip+Config.uri_241 + Config.rest + Config.v1 + Config.api.get_cart+Config.use_params({_tha_sid: _tha_sid ? _tha_sid : propsp.g_data._tha_sid});
    console.log(get_cart_url);
    const cart_data = await fetch(get_cart_url);
    const value = await cart_data.json();
    // console.log(value);
    propsp.up_date_cart(value);
}

const Home = (props) => {

    const { navigation, route, g_data } = props;
    const { product_id } = g_data;

    const get_sid = async (request_path) => {
        const response_data = await fetch(request_path);
        let data = await response_data.json();
        console.log(data);
        props.update_sid(data.value);
        await set_tha_sid(data.value);
    };

    const set_tha_sid = async (sid) => {
        try {
            await AsyncStorage.setItem(
                '_tha_sid',
                sid,
            );
            console.log("save _tha_sid:", sid);
        } catch (error) {
            // Error saving data
        }
        // return false;
    };

    const get_tha_sid = async (props) => {
        try {
            const value = await AsyncStorage.getItem('_tha_sid');
            if (value !== null) {
                // We have data!!
                console.log("We have data", value);
                await props.update_sid(value);
                get_cart(props, value);
                return value
            }
        } catch (error) {
            // Error retrieving data
        }
        return null;
    };

    useEffect(() => {
        const _tha_sid = get_tha_sid(props);
        _tha_sid.then((response)=>{
            if (response) {
                console.log("_tha_sid laf: ", response);
            }else{
                if (!props.g_data._tha_sid) {
                    try {
                        console.log("not has _tha_sid");
                        let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.new_sid;
                        get_sid(path);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("_tha_sid realy exists");
                }
            }
        }).catch(function(e){
            console.log(e);
        });

        // if (_tha_sid) {
        //     props.update_sid(_tha_sid);
        // } else {
        //     if (!props.g_data._tha_sid) {
        //         try {
        //             console.log("not has _tha_sid");
        //             let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.new_sid;
        //             get_sid(path);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     } else {
        //         console.log("_tha_sid realy exists");
        //     }
        // }

    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 20 }}>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate("ListProduct",{category_id: 4});
                    // navigation.navigate("DetailProduct", { pro_id: product_id });
                    BackHandler.exitApp(); // thoát app

                }} style={{ width: "100%", height: "100%" }}>
                    <Image source={require("../../assets/Images/IMG_20220519_163056.jpg")} style={{ width: "100%", height: "100%", resizeMode: "cover" }}></Image>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 60 }}>
                <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => {
                    navigation.navigate("Login", { customer_id: 1 });
                    // navigation.navigate("Register", {customer_id: 1});
                    // navigation.navigate("UserDetail"); //Collslap
                    // navigation.navigate("Collslap");
                    // navigation.navigate("DetailProduct", {pro_id: 46});
                }}>
                    {/* <Text style={{fontSize: 18, color: "red"}}>{product_id}</Text> */}
                    <Image source={require("../../assets/Images/diem-danh-7.jpg")} style={{ width: "100%", height: "100%", resizeMode: "cover" }}></Image>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 20 }}>
                <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => {
                    // navigation.navigate("ListCategory", { category_id: 5 }); // Support
                    navigation.navigate("Support");
                }}>
                    <Image source={require("../../assets/Images/2-1657643508.jpg")} style={{ width: "100%", height: "100%", resizeMode: "cover" }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// export default Home;
const update_sid = (dispatch, _sid) => {
    dispatch({ type: "UPDATE_SID", sid: _sid });
};

export default connect(
    (state) => { return { g_data: state.defRe }; },
    (dispatch) => {
        return {
            up_date_cart: (cart_data) => {dispatch({type: "UPDATE_CART", cart_data: cart_data})},
            update_sid: (_sid) => { dispatch({ type: "UPDATE_SID", sid: _sid }); },
            onFinishedItem: (index) => dispatch(finishTask(index)), // khai báo action qua props(nó sẽ gọi dispatch luôn)
            onDeleteItem: (index) => dispatch(deleteTask(index))  // khai báo action qua props
        }
    },
    (stateProps, dispatchProps, ownProps) => {
        return Object.assign({}, ownProps, stateProps, dispatchProps);
        // return { a: 123, b: 22222 };
    }
)(Home);