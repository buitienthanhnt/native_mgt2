import React, { useEffect, useState, Component } from 'react';
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

import TaskFlatList from './components/TaskFlatList';
import AddView from './components/AddView';

// https://blog.haposoft.com/tich-hop-redux-reactnative/ redux use docs.
// https://redux.js.org/introduction/core-concepts
// https://blog.haposoft.com/cach-deploy-nextjs-app-len-server/
//
import { createStore, combineReducers, applyMiddleware } from 'redux'; // npm install redux --save
import { Provider } from 'react-redux'; // npm install react-redux --save :tạo cầu nối giữa redux vào react
import thunk from 'redux-thunk';                                     // npm install redux-thunk --save (dùng cho chạy bất đồng bộ)

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

// use redux:
//===== state
let appState = {
    data: [
        { title: 'Go to the office', isFinished: true },
        { title: 'Prepare tasks for today', isFinished: false },
        { title: 'Team meeting', isFinished: false },
        { title: 'Commit tasks changed', isFinished: false }
    ]
};
//===== action

//===== reduce
const taskListReducer = (state = appState, action) => {
    let newTaskList = state.data;
    switch (action.type) {
        case 'FINISH':
            newTaskList[action.atIndex].isFinished = true;
            return { ...state, data: newTaskList };
            break;
        case 'DELETE':
            newTaskList = newTaskList.filter((item, i) => i != action.atIndex);
            return { ...state, data: newTaskList };
            break;
        case 'ADD':
            const newTask = {title: action.title, isFinished: false};
            return { ...state, data: [...newTaskList, newTask] };
            break;
        default:
            break;
    }
    return state;
}

//===== Middleware: nằm trước khi chạy hành động có thực thi hay không

//===== store
// trong trường hợp có 1 reduce(đơn reduce thì create sẽ nhận vào 1 reduce và 1 state)
const store = createStore(taskListReducer, appState);

// trong trường hợp có nhiều reduce thì dùng qua combineReduces truyền vào các reduce với khóa.
// const reduces = combineReducers({ numberRe: numberReduce, errorRe: errorReduce });
// const store = createStore(reduces); // dùng qua reduces thì sẽ bỏ appState đi thay vào đó sẽ truyền appState trực tiếp qua tham số của reduce.
// const store = createStore(reduces, applyMiddleware(logger, checkIsZero)); // dùng với middleware(nếu dùng nhiều middleware thì các middlewarwe cách nhau dấu phẩy(,)).
// const store = createStore(reduces, applyMiddleware(thunk, logger, checkIsZero)); // dùng với thunk trong middleware; (thông thường sẽ không dùng)

// ===================run test=======================
// store.subscribe(()=>{ // đăng ký lắng nghe cho biến store.
//   console.log(this);
//   console.log('state updated', store.getState());
// });


//===== chạy:
// store.dispatch(add); // gọi hàm dispath để thực thi hành động trong reduce với action được truyền vào.
// store.dispatch(add);
// store.dispatch(sub);
// store.dispatch({type: "ADD", value: 5});
// store.dispatch(createSubAction(6));
// store.dispatch(add);
// store.dispatch({type: "LESS_THAN_ZERO"});

// setTimeout(()=>{
//   console.log(this);
//   store.dispatch(add);
// }, 5000); // gọi sau ns.

const addAfter3s = () => {
    return (dispath) => {
        setTimeout(() => { dispath(add) }, 3000);
    }
}
// store.dispatch(addAfter3s());

// appState trả về sẽ có dạng như sau store.getState() =
// {
//   "numberRe": {
//       "number": -4,
//       "histories": [
//           2,
//           -4
//       ],
//       "errorMsg": ""
//   },
//   "errorRe": {
//       "number": 2,
//       "histories": [],
//       "errorMsg": "number can not be than 0"
//   }
// }

export default class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { title: 'Go to the office', isFinished: true },
                { title: 'Prepare tasks for today', isFinished: false },
                { title: 'Team meeting', isFinished: false },
                { title: 'Commit tasks changed', isFinished: false }
            ]
        }
    }

    onAddNewTask = (taskName) => {
        const newTask = { title: taskName, isFinished: false }
        const newTaskList = [...this.state.data, newTask]

        this.setState({ data: newTaskList });
    }

    // onFinishedItem = (index) => {
    //     let newTaskList = this.state.data;
    //     newTaskList[index].isFinished = true;
    //     this.setState({ data: newTaskList });
    // }

    // onDeleteItem = (index) => {
    //     let newTaskList = this.state.data.filter((item, i) => i != index);
    //     this.setState({ data: newTaskList });
    // }

    render() {
        return (
            <Provider store={store}>
                {/* Provider bọc toàn bộ các đối tượng lại để tạo kết nối trong redux và react  */}
                <View style={styles.container}>
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

// nan: mỗi khi pull code hay chuyển nhánh sẽ có thay đổi file package.json dễ gây ra lỗi khi chạy.
// nan: khi gặp lỗi đó cần chạy: npm install
// nan: nếu npm install vẫn lỗi thì xóa thư mục: node_modules rồi chạy lại: npm install.
// nan: nếu vẫn lỗi thì xóa thư mục: node_modules và file: package-lock.json rồi chạy lại: npm install.
