import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Platform, Button, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeadComponent from './components/classCom/HeadComponent';
import Conten from './components/classCom/Conten';
import BottomHead from './components/classCom/BottomHead';
import TopConten from './components/classCom/TopConten';
import Config from './assets/Datasource/Config';
import DetailProduct from './components/funCom/DetailProduct';
import ListProduct from './components/classCom/ListProduct';
import Home from './components/funCom/Home';
import ListCategory from './components/classCom/ListCategory';
import Login from './components/classCom/Login';
import { UserDetail } from './components/classCom/UserDetail';
import Collslap from './components/funCom/Collslap';
import Register from './components/classCom/Register';

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

const getDetail = (product_id = 0) => {
  // let path = "http://192.168.100.209/magento241/index.php/rest/V1/productDetail/277";
  if (product_id) {
    let path = Config.http + Config.ip + Config.uri_241 + Config.rest + Config.v1 + "productDetail/" + product_id;
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

export default function App({navigation}) {
  const dem = Dimensions.get("window");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name="MyStack" component={MyStack} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="ListCategory" component={ListCategory} navigation={navigation}/>
        <Stack.Screen name="ListProduct" component={ListProduct} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
        <Stack.Screen name="Collslap" component={Collslap} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: Platform.OS == "android" ? 20 : 0,
    flex: 1
  },
});

// nan
