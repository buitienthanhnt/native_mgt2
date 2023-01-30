import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"; // npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
// import Ionicons from 'react-native-vector-icons/Ionicons'; // lỗi android
import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import {View, Text, Button, StatusBar} from "react-native";

import Home from "../components/funCom/Home";
import ListCategory from "../components/Classcom/ListCategory";
import Login from "../components/Classcom/Login";
import {connect} from "react-redux";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = (props) => {
    return (
        <Tab.Navigator screenOptions={
            ({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'ListCategory') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'star' : 'star';
                    } else if (route.name === 'ScrAll') {
                        iconName = focused ? 'cart' : 'cart';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false // ẩn phần tiêu đề bên trên của: Tab.Navigator
            })}>
            <Tab.Screen name="Home" component={Home} options={{tabBarBadge: props.g_data.number}}/>
            <Tab.Screen name="ListCategory" component={ListCategory}/>
            <Tab.Screen name="Login" component={Login} tabBarOptions={{showLabel: false,}}/>
            <Tab.Screen name="ScrAll" component={ScrAll} tabBarOptions={{showLabel: false,}}/>
        </Tab.Navigator>
    );
};
const Stack = createNativeStackNavigator();
const ScrAll = () => { // dùng nhiều screen trong cùng 1 bottom_tab_screen
    return (
        <Stack.Navigator>
            <Stack.Screen name="Scr1" component={Scr1} options={{headerShown: false}}/>
            <Stack.Screen name="Scr12" component={Scr12}/>
            <Stack.Screen name="Scr13" component={Scr13}/>
        </Stack.Navigator>
    )
}

const Scr1 = (props) => {
    const {navigation} = props;
    return (
        <View>
            <StatusBar backgroundColor={"violet"}></StatusBar>
            <Button title="Scr12" onPress={() => {
                navigation.navigate("Scr12", {customer_id: 1});
            }}></Button><Text>{"\n"}</Text>

            <Button title="Scr13" onPress={() => {
                navigation.navigate("Scr13", {customer_id: 1});
            }}></Button><Text>{"\n"}</Text>
        </View>
    )
}
const Scr12 = () => {
    return (
        <View>
            <Text>Scr12</Text>
        </View>
    )
}
const Scr13 = () => {
    return (
        <View>
            <Text>Scr13</Text>
        </View>
    )
}
const Scr14 = () => {
    return (
        <View>
            <Text>Scr14</Text>
        </View>
    )
}

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(BottomTabNavigator);
// tar -czvf acc.tar.gz report

// nen folder khi khong cos zip(dung tar)
// tar -czvf ~/app.tar.gz code/*   (tao moi 1 ban sao o ~/ neu khong co quyen nen tai thu muc chua)