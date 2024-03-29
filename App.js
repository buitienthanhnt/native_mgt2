import React, { useEffect, useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeadComponent from './components/Classcom/HeadComponent';
import Conten from './components/Classcom/Conten';
import BottomHead from './components/Classcom/BottomHead';
import TopConten from './components/Classcom/TopConten';
// import DetailProduct from './components/funCom/DetailProduct';
// import ListProduct from './components/Classcom/ListProduct';
// import Home from './components/funCom/Home';
// import ListCategory from './components/Classcom/ListCategory';
// import Login from './components/Classcom/Login';
// import UserDetail from './components/Classcom/UserDetail';
// import Collslap from './components/funCom/Collslap';
// import Register from './components/Classcom/Register';

import TaskFlatList from './components/TaskFlatList';
import AddView from './components/AddView';
import CounterContainer from './container/CounterContainer';
import DrawerNavigator from './navigation/DrawerNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
// https://blog.haposoft.com/tich-hop-redux-reactnative/ redux use docs.
// https://redux.js.org/introduction/core-concepts
// https://blog.haposoft.com/cach-deploy-nextjs-app-len-server/
//

import { Provider } from 'react-redux'; // npm install react-redux --save :tạo cầu nối giữa redux vào react 
import AppStore from './redux/AppStore';
import Reactotron from 'reactotron-react-native' // adb reverse tcp:9090 tcp:9090 (chạy lênh này nếu dùng qua android hay máy ảo android để kíck hoạt reactotron)

// reactotron
if(__DEV__) { // adb reverse tcp:9090 tcp:9090
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
  }
// reactotron

const Stack = createNativeStackNavigator();
export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        Reactotron.log('hello rendering world');
        let view = 1;
        if (view) {
            return (
                <Provider store={AppStore}>
                    <NavigationContainer>
                        {/* // có dùng tabbottom và tab_drawer */}
                        {/* <DrawerNavigator></DrawerNavigator>  */}

                        {/* // khoong dùng tab_drawer */}
                        <Stack.Navigator>
                            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
            );
        }
        return (
            <Provider store={AppStore}>
                <View style={styles.container}>
                    <CounterContainer></CounterContainer>
                    <AddView />
                    <TaskFlatList />
                </View>
            </Provider>
        );
    }

};

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    }
});
