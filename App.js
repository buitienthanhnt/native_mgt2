import React, { useEffect, useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Platform, Button, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeadComponent from './components/Classcom/HeadComponent';
import Conten from './components/Classcom/Conten';
import BottomHead from './components/Classcom/BottomHead';
import TopConten from './components/Classcom/TopConten';
import Config from './assets/Datasource/Config';
import DetailProduct from './components/funCom/DetailProduct';
import ListProduct from './components/Classcom/ListProduct';
import Home from './components/funCom/Home';
import ListCategory from './components/Classcom/ListCategory';
import Login from './components/Classcom/Login';
import UserDetail from './components/Classcom/UserDetail';
import Collslap from './components/funCom/Collslap';
import Register from './components/Classcom/Register';

import TaskFlatList from './components/TaskFlatList';
import AddView from './components/AddView';
import Counter from './components/Counter';
// https://blog.haposoft.com/tich-hop-redux-reactnative/ redux use docs.
// https://redux.js.org/introduction/core-concepts
// https://blog.haposoft.com/cach-deploy-nextjs-app-len-server/
//

import { Provider } from 'react-redux'; // npm install react-redux --save :tạo cầu nối giữa redux vào react 
import Store from "./assets/Datasource/Store";

const Stack = createNativeStackNavigator();

const MyStack = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <HeadComponent style={{ flex: 25 }}></HeadComponent>
                <TopConten style={{ flex: 60 }}></TopConten>
                <Conten
                    navigation={navigation}
                ></Conten>
                <BottomHead style={{ flex: 15 }}></BottomHead>
                <StatusBar style="auto" />

            </View>
        </View>
    );
};

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    onAddNewTask = (taskName) => {
        const newTask = { title: taskName, isFinished: false }
        const newTaskList = [...this.state.data, newTask]

        this.setState({ data: newTaskList });
    }

    render() {
        let view = 0;
        if (view) {
            return (
                <Provider store={Store}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
                            <Stack.Screen name="MyStack" component={MyStack} />
                            <Stack.Screen name="DetailProduct" component={DetailProduct} />
                            <Stack.Screen name="ListCategory" component={ListCategory} navigation={this.props.navigation} />
                            <Stack.Screen name="ListProduct" component={ListProduct} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="UserDetail" component={UserDetail} />
                            <Stack.Screen name="Collslap" component={Collslap} />
                            <Stack.Screen name="Register" component={Register} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
            );
        }
        return (
            <Provider store={Store}>
                <View style={styles.container}>
                    <Counter></Counter>
                    <AddView />
                    <TaskFlatList />
                </View>
            </Provider>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    }
});
