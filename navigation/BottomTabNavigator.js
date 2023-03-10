import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer
// import Ionicons from 'react-native-vector-icons/Ionicons'; // lỗi android
import { Ionicons } from '@expo/vector-icons'; // chạy được cả trên web và android. xem icon: https://icons.expo.fyi || install: npm i @expo/vector-icons
import { View, Text, Button, StatusBar } from "react-native";

import Home from "../components/funCom/Home";
import ListCategory from "../components/Classcom/ListCategory";
import Login from "../components/Classcom/Login";
import UserDetail from "../components/Classcom/UserDetail";
import DetailProduct from "../components/funCom/DetailProduct";
import Cart from "./Cart";
import Support from "../components/Classcom/Support/Support";

import { connect } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = (props) => {

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                tabBarActiveTintColor: 'tomato', // màu icon mặc định là xanh, dùng như này sẽ là màu cà chua.
                tabBarInactiveTintColor: 'gray', // gray cũng là màu mặc định luôn.
                headerShown: false // ẩn phần tiêu đề bên trên của: Tab.Navigator
            })}
            // tabBarOptions={{ showLabel: false }} // ẩn bottom_tab title(tiêu đề của thanh dưới trang)
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarShowLabel: false, // ẩn bottom_tab title(tiêu đề của thanh dưới trang)
                    tabBarIcon: ({ focused, color, size }) => {
                        return (<Ionicons name={"home"} size={26} color={color} />);
                    }
                }}
            />

            <Tab.Screen name="ProductScreen" component={ProductScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'bug' : 'list'} size={26} color={color} />
                }}
            />

            <Tab.Screen name="Account" component={Account} tabBarOptions={{ showLabel: false }}
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ focused, color, size }) => (<Ionicons name={"people"} size={26} color={color} />)
                }} />

            <Tab.Screen name="ScrAll" component={ScrAll} tabBarOptions={{ showLabel: false, }}
                options={{
                    tabBarBadge: props.g_data.cart_data && props.g_data.cart_data.item_qty ? props.g_data.cart_data.item_qty : null,
                    tabBarLabel: 'Cart',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={"cart"} size={26} color={color} />
                }}
            />
        </Tab.Navigator>
    );
};
const Stack = createNativeStackNavigator();
const ScrAll = () => { // dùng nhiều screen trong cùng 1 bottom_tab_screen
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name="Scr12" component={Scr12} />
            <Stack.Screen name="Scr13" component={Scr13} options={{
                headerShown: false // ẩn thanh trên(mũi tên quay lại màn trước) của màn hình
            }} />
        </Stack.Navigator>
    )
};

const HomeScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Support" component={Support} />
        </Stack.Navigator>
    );
};

const ProductScreen = () => { // dùng nhiều screen trong cùng 1 bottom_tab_screen
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListCategory" component={ListCategory} options={{ headerShown: false }} />
            <Stack.Screen name="DetailProduct" component={DetailProduct} />
        </Stack.Navigator>
    );
};

const Account = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="UserDetail" component={UserDetail} />
        </Stack.Navigator>
    );
};

const Scr12 = () => {
    return (
        <View>
            <Text>Scr12</Text>
        </View>
    )
};
const Scr13 = (props) => {
    return (
        <View>
            <Text>Scr13</Text>
            <Button title="props"
                onPress={() => {
                    console.log("123");
                }}></Button>

        </View>
    )
};

export default connect(
    (state) => {
        return {
            g_data: state.defRe
        }
    }
)(BottomTabNavigator);
// tar -czvf acc.tar.gz report
// nén folder khi không có zip(dung tar):
// tar -czvf ~/app.tar.gz code/*   (tạo mới 1 bản sao ở: ~/ tên là: app.tả.gz (nếu không có quyền nén tại mục chứa))