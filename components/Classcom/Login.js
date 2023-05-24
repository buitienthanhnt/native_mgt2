import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, TextInput, Button, TouchableOpacity, ToastAndroid, Platform, Linking } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome'; // mặc định có sẵn trong thư viện.
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'; // npm install axios
// import { WebView } from 'react-native-webview';
import Config from "../../assets/Datasource/Config";
import * as WebBrowser from 'expo-web-browser';  // npx expo install expo-web-browser & npm i url & npm i punycode. (for mobile)// https://docs.expo.dev/versions/v46.0.0/sdk/webbrowser/
// lưu ý dùng: WebBrowser của: expo-web-browser có thể lỗi trên web với thông báo: "can not resol module url thì chạy: npm i url & npm i punycode"
import { connect } from "react-redux";
import { AsyncStorage } from 'react-native';
// ============================================
class Login extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            use_image: 0,
            title: "",
            user: "",
            pass: "",
            customer_data: null,
            refresh: true,
            pass_show: 0,
            load_login: false
        }
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'TASKS',
                'I like to save it.',
            );
        } catch (error) {
            // Error saving data
        }
    };

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TASKS');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _handlePressButtonAsync = async () => {
        if (Platform.OS == "web") {
            window.open(Config.webview_url.new_acc); // use for web
            // return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
        } else {
            let result = await WebBrowser.openBrowserAsync(Config.webview_url.new_acc); // for mobile; có thể lỗi với bản web
        }
    };

    UNSAFE_componentWillMount() {
    }

    componentWillUnmount() {
        this.setState({ refresh: false });
    }

    login = async function () {
        this.setState({ load_login: true })
        let request_login = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.login_post;
        let params = await Config.use_params({ user_name: this.state.user, pass: this.state.pass });

        // sẽ bị lỗi cors khi sử dụng body param để gọi vào magento(gọi file php bình thường thì vẫn không sao)
        // cho nên ưu tiên hơn bằng việc dùng trực tiếp param trong url.
        // let n_re = Config.http + Config.ip + "phpdemo/arr2_demo.php"; 
        let json = await axios.post(request_login + params)
            .then(function (response) {
                console.log(response);
                this.setState({
                    customer_data: response.data.result,
                    user: "",
                    pass: "",
                    load_login: false
                });
                this.props.update_sid(response.data.result.tha_sid);
            }.bind(this)).then(
                (response) => {
                    this.props.navigation.navigate("UserDetail", { user_data: this.state.customer_data });
                }
            )
            .catch(function (error) {
                alert("login error!, please check email and pass.");
                this.setState({ load_login: false })
                console.log(error);
            }.bind(this));
    }

    get_customer = async (customer_id = null) => {
        customer_id = this.props.route.params.customer_id != undefined ? this.props.route.params.customer_id : customer_id;
        if (customer_id) {
            let json = await axios.get(Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + Config.api.customer_data + customer_id);
            return json;
        }
    }

    demo = async function getJSONAsync() {

        // The await keyword saves us from having to write a .then() block.
        let json = await axios.get('https://tutorialzine.com/misc/files/example.json');

        // The result of the GET request is available in the json variable.
        // We return it just like in a regular synchronous function.
        return json;
    }

    get_customer_data = function (customer_id) {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    (() => {
                        if (this.state.use_image) {
                            return (
                                <ImageBackground source={require("../../assets/Images/Screenshot.png")} style={css.backgound_image}>
                                    <Text style={{ color: "red" }}>login screen</Text>
                                    <View>
                                        <Text>user name</Text>
                                        <TextInput name={"user"} defaultValue={""} value={""}></TextInput>
                                    </View>
                                </ImageBackground>
                            );
                        } else {
                            return (
                                <View style={css.container}>
                                    <ImageBackground source={require("../../assets/Images/3-1657643502.jpg")} style={css.backgound_image}>
                                        <Text style={{ fontSize: 22 }}>Login by userName and passWord</Text>
                                        <View>
                                            <Text style={{ paddingLeft: 12, fontSize: 18 }}>user name</Text>
                                            <View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <FontAwesome5Icon name="truck" color="black"
                                                        size={26}
                                                    //   style={{marginRight: 6 }}
                                                    >
                                                    </FontAwesome5Icon>
                                                    <TextInput
                                                        name={"user"}
                                                        placeholder={"tên người dùng"}
                                                        // defaultValue="PPP" nếu dùng cả 2 value và default_value 1 lúc sẽ có cảnh báo lỗi.
                                                        // multiline = {true} // sẽ không dùng được cho mật khẩu
                                                        // numberOfLines = {6}
                                                        // autoFocus={true}
                                                        style={css.user_input}
                                                        value={this.state.user + ""}
                                                        inlineImageLeft='../../assets/icon.png'
                                                        onChangeText={(text) => {
                                                            this.setState({ user: text });
                                                        }}
                                                    ></TextInput>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 6 }}>
                                            <Text style={{ paddingLeft: 6, fontSize: 18 }}>password</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <FontAwesome5Icon name={this.state.pass_show == 1 ? "unlock" : "lock"} color="black"
                                                    size={30} style={{ marginRight: 6 }}
                                                    onPress={() => {
                                                        this.setState({ pass_show: !this.state.pass_show });
                                                    }}>
                                                </FontAwesome5Icon>
                                                <TextInput
                                                    name={"pass"}
                                                    // keyboardAppearance="dark" {OS=ios}
                                                    secureTextEntry={this.state.pass_show ? true : false}
                                                    autoCorrect={false}
                                                    placeholder={"mật khẩu người dùng"}
                                                    value={this.state.pass}
                                                    onChangeText={(value) => {
                                                        this.setState({ pass: value + "" })
                                                    }}
                                                    style={css.user_input}>
                                                </TextInput>
                                            </View>
                                        </View>

                                        <View style={{ marginTop: 6 }}>
                                            {(
                                                () => {
                                                    if (this.state.load_login) {
                                                        return (
                                                            <View style={{
                                                                backgroundColor: "#bac5d6",
                                                                borderRadius: 6,
                                                                width: Dimensions.get("window").width / 3 * 2,
                                                                alignItems: "center",
                                                                marginLeft: 32,
                                                                opacity: 0.6,
                                                                flexDirection: "row",
                                                                justifyContent: "center"
                                                            }}>
                                                                <Image style={{ width: 26, height: 26, resizeMode: "cover" }} source={require("../../assets/Images/DualRing-1s-124px.gif")}></Image>
                                                                <Text>loading...</Text>
                                                            </View>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity
                                                                activeOpacity={0.3}
                                                                style={{
                                                                    backgroundColor: "#bac5d6",
                                                                    borderRadius: 6,
                                                                    width: Dimensions.get("window").width / 3 * 2,
                                                                    alignItems: "center",
                                                                    marginLeft: 32,
                                                                    opacity: 0.6
                                                                }}
                                                                width={120}
                                                                onPress={() => {
                                                                    // console.log(this);
                                                                    // this.props.navigation.navigate("UserDetail");
                                                                    this.login();
                                                                }}
                                                            >
                                                                <FontAwesome5Icon name="satellite" size={32} color="black"></FontAwesome5Icon>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                }
                                            )()}
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    this._handlePressButtonAsync()
                                                }}>
                                                    <Text style={{ textAlign: "right", fontSize: 16, color: "violet", marginTop: 8 }}>Register new account?</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ marginTop: 20 }}>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({ user: 'roni_cost@example.com' });
                                                    if (Platform.OS != "web") {
                                                        ToastAndroid.show(`added ${this.state.user} for username`, 2000);
                                                    }
                                                }}>
                                                    <Text style={{ fontSize: 16, color: "red" }}>user_email: {'roni_cost@example.com'}</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => {
                                                    this.setState({ pass: "roni_cost3@example.com" });
                                                    if (Platform.OS != "web") {
                                                        ToastAndroid.show(`added ${this.state.pass} for password`, 2000);
                                                    }
                                                }}>
                                                    <Text style={{ fontSize: 16, color: "red" }}>password: {'roni_cost3@example.com'}</Text>
                                                </TouchableOpacity>
                                                <Button title="call for support" onPress={() => {
                                                    Linking.openURL('tel:0702032201'); // mở qua ứng dụng di động để gọi. doc: https://reactnative.dev/docs/linking
                                                }}></Button>
                                                <Text>{"\n"}</Text>
                                                {/* <Button title="save data"onPress={
                                                    ()=>{
                                                        this._storeData();
                                                        this._retrieveData();
                                                    }
                                                }>
                                                </Button> */}

                                            </View>
                                        </View>
                                    </ImageBackground>
                                    {/* <Text>{this.state.user}</Text>
                                    <Text>{this.state.pass}</Text> */}
                                </View>
                            );
                        }
                    })()
                }
            </View >

        )
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover"
    },
    backgound_image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover"
    },
    user_input: {
        borderWidth: 2,
        width: Dimensions.get("window").width / 3 * 2,
        height: 32,
        borderRadius: 6,
        padding: 4,
        paddingLeft: 8,
        color: "white"
    }
});

const update_sid = (dispatch, _sid) => {
    dispatch({ type: "UPDATE_SID", sid: _sid });
};

export default connect(
    (appState) => {
        return {
            g_data: appState.defRe
        }
    },
    (dispatch) => {
        return {
            change_product: () => {
                dispatch({ type: "CHANGE_PRODUCT", product_id: 30 }); // nên được đặt trong hàm như này, nếu gọi trực tiếp: 
                // change_product=>dispatch({type: "CHANGE_PRODUCT", product_id: 30}) có thể cảnh báo lỗi:
                // Warning: Cannot update a component (`Connect(BottomTabNavigator)`) while rendering a different component (`Connect(Login)`). 
                // To locate the bad setState() call inside `Connect(Login)`, follow the stack trace as described in
            },
            update_sid: (_sid) => {
                dispatch({ type: "UPDATE_SID", sid: _sid });
            }
        }
    }
)(Login);