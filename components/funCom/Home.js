import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Platform, Button, TouchableOpacity, FlatList } from 'react-native';

const Home = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 20 }}>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate("ListProduct",{category_id: 4});
                    navigation.navigate("DetailProduct", { pro_id: 46 });
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
                    <Image source={require("../../assets/Images/diem-danh-7.jpg")} style={{ width: "100%", height: "100%", resizeMode: "cover" }}></Image>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 20 }}>
                <TouchableOpacity style={{ width: "100%", height: "100%" }} onPress={() => {
                    navigation.navigate("ListCategory", { category_id: 5 });
                }}>
                    <Image source={require("../../assets/Images/2-1657643508.jpg")} style={{ width: "100%", height: "100%", resizeMode: "cover" }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home;