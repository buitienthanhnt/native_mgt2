import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, LogBox, TouchableOpacity, Platform } from "react-native";
import Collapsible from 'react-native-collapsible';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (props.reviews) {
            setReviews(props.reviews);
        }
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    })

    return (
        <View>
            <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>{reviews.length ? "Review data content." : ""}</Text>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.review_id}
                renderItem={({ item }) => {
                    return (
                        <Review_Item review_item={item}></Review_Item>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

const Review_Item = (props) => {
    const [drop, setDrop] = useState(Platform.OS == "web" ? false : true);
    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                    setDrop(!drop);
                }}
            >
                <FontAwesome5Icon name={"user"}
                    color="black"
                    size={15}
                >
                </FontAwesome5Icon>
                <Text style={{ paddingLeft: 8, fontSize: 15, color: "violet" }}>{props.review_item.nickname}: </Text>
                <Text style={{ color: "green", textDecorationLine: "underline", fontSize: 15 }}>{props.review_item.title}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={drop} align="center">
                <Text style={{ paddingLeft: 18, paddingTop: 2 }}>{props.review_item.detail}</Text>
            </Collapsible>
            <View style={{height:1, backgroundColor:"blue", width: "80%"}}></View>
        </View>
    )
}

const css = StyleSheet.create({
    title: {},
    conten: {

    }
});

export default Reviews;