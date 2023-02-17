import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Clipboard, TouchableOpacity, Button, ScrollView, ToastAndroid, Platform } from "react-native";
import { Tooltip } from 'react-native-elements';
// import { ColorPicker } from 'react-native-color-picker'; // khong chajy
import { SketchPicker, SwatchesPicker, PhotoshopPicker } from 'react-color'; // npm install react-color --save :: https://casesandberg.github.io/react-color/
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons'; // chạy được cả trên web và android. xem icon: https://icons.expo.fyi || install: npm i @expo/vector-icons

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FindIcon></FindIcon>
                <View style={{ backgroundColor: "black", height: 1 }}></View>
                <FindColor></FindColor>
            </View>
        );
    }
}

class FindIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_name: "bug",
            color: "tomato",
            size: 16,
            copiedText: "",
            find_icon: false,
            use_find_icon: 0
        };
    }

    fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
    };

    render() {
        return (
            <View style={{ padding: 6 }}>
                <Text style={css.title}>Find Icon image</Text>
                <View style={css.icon}>
                    <Text style={{ fontSize: 18 }}>icon name:</Text>
                    <TextInput
                        value={this.state.icon_name}
                        style={css.icon_input_name}
                        onChangeText={(text) => {
                            this.setState({ icon_name: text });
                        }}
                        onFocus={() => {
                            this.setState({ find_icon: false });
                        }}
                    ></TextInput>
                </View>
                <View style={css.icon}>
                    <Text style={{ fontSize: 18 }}>icon color:</Text>
                    <TextInput
                        value={this.state.color}
                        style={css.icon_input_size}
                        onChangeText={(text) => {
                            this.setState({ ...this.state, color: text });
                        }}
                    ></TextInput>
                </View>
                <View>
                    <Button title="find icon" onPress={() => {
                        this.setState({ find_icon: true });
                    }}></Button>
                </View>

                <View>
                    <View >
                        <View style={css.icon}>
                            <Tooltip popover={<Text>coppied to Clipboard</Text>}
                                withOverlay={false}
                                skipAndroidStatusBar={true}
                                onOpen={() => {
                                    copyToClipboard(`<FontAwesome5Icon name='${this.state.icon_name}' size={28} color='${this.state.color}'/>`);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>FontAwesome5Icon(size=28): </Text>
                            </Tooltip>
                            {(() => {
                                if (this.state.use_find_icon) {
                                    return (<FontAwesome5Icon name={this.state.find_icon ? this.state.icon_name : null} size={28} color={this.state.color} style={{ marginLeft: 10 }} />);
                                } else {
                                    return (<FontAwesome5Icon name={this.state.icon_name} size={28} color={this.state.color} style={{ marginLeft: 10 }} />);
                                }
                            })()}
                        </View>
                        <Text>
                            {`<FontAwesome5Icon name='${this.state.icon_name}' size={28} color='${this.state.color}'/>`}
                        </Text>
                        <View style={{ backgroundColor: "black", height: 1 }}></View>
                    </View>

                    <View >
                        <View style={css.icon}>
                            <Tooltip popover={<Text>coppied to Clipboard</Text>}
                                withOverlay={false}
                                skipAndroidStatusBar={true}
                                onOpen={() => {
                                    copyToClipboard(`<Ionicons name='${this.state.icon_name}' size={28} color='${this.state.color}' />`);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>Ionicons(size=28): </Text>
                            </Tooltip>
                            {(() => {
                                if (this.state.use_find_icon) {
                                    return (<Ionicons name={this.state.find_icon ? this.state.icon_name : null} size={28} color={this.state.color} />);
                                } else {
                                    return (<Ionicons name={this.state.icon_name} size={28} color={this.state.color} />);
                                }
                            })()}

                        </View>
                        <Text>
                            {`<Ionicons name='${this.state.icon_name}' size={28} color='${this.state.color}' />`}
                        </Text>
                        <View style={{ backgroundColor: "black", height: 1 }}></View>
                    </View>
                </View>
            </View>
        );
    }
}

class FindColor extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            color: null, 
            background: '#fff',
            swatch_color: null
         };
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}  // ẩn thanh trượt
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 6, padding: 6, flex: 1 }}>
                <Text>123 color find</Text>
                <View style={{ alignItems: "center" }}>
                    <SketchPicker
                        width={"100%"}
                        color={this.state.background}
                        onChangeComplete={(color) => {
                            this.setState({ color: color, background: color.hex }); //JSON.stringify(obj)
                            console.log(color);
                        }}
                    />
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>Hex: {this.state.color ? this.state.background : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            copyToClipboard(this.state.background);
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!");
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>rgb: {this.state.color ? JSON.stringify(this.state.color.rgb) : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            if (this.state.color) {
                                copyToClipboard(JSON.stringify(this.state.color.rgb));
                            }
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!");
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                </View>

                <View style={{ marginTop: 6, padding: 6 }}>
                    <SwatchesPicker width={"100%"} onChange={(color, event) => {
                        this.setState({swatch_color: color});
                    }} />

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>Hex: {this.state.swatch_color ? this.state.swatch_color.hex : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            copyToClipboard(this.state.swatch_color.hex);
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!");
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>rgb: {this.state.swatch_color ? JSON.stringify(this.swatch_color.rgb) : ""}</Text>
                        <FontAwesome5Icon style={{ marginLeft: 8 }} name='copy' size={24} color='tomato' onPress={() => {
                            if (this.state.swatch_color) {
                                copyToClipboard(JSON.stringify(this.state.swatch_color.rgb));
                            }
                            if (Platform.OS != "web") {
                                ToastAndroid.show("coppied!");
                            } else {
                                alert("coppied!");
                            }
                        }} />
                    </View>
                </View>

                {/* <PhotoshopPicker onChangeComplete={(color, event) => {
                    console.log(color, event);
                }} /> */}

                {/* <ColorPicker
                    onColorSelected={color => alert(`Color selected: ${color}`)}
                    style={{ flex: 1 }}
                /> */}
            </ScrollView>
        );
    }
}

const copyToClipboard = (text) => {
    Clipboard.setString(text);
};

const css = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    icon_input_name: {
        height: 30,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 8,
        width: "30%",
        marginLeft: 10
    },
    icon_input_size: {
        height: 30,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 8,
        width: "30%",
        marginLeft: 10
    },
    icon: {
        flexDirection: "row",
        marginTop: 8
    }
});

export default Support;