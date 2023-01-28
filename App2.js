import React, { useEffect, useState } from 'react';
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
import { UserDetail } from './components/Classcom/UserDetail';
import Collslap from './components/funCom/Collslap';
import Register from './components/Classcom/Register';

// https://blog.haposoft.com/tich-hop-redux-reactnative/ redux use docs.
import { createStore, combineReducers, applyMiddleware } from 'redux'; // npm install redux --save
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
let appState = { number: 1, histories: [], errorMsg: "" };

//===== action
const add = {
  type: "ADD",
  value: 3
}

const sub = {
  type: "SUB",
  value: 1
}

const createAddAction = (number) => {
  return {
    type: "ADD",
    value: number
  };
}

const createSubAction = (number) => {
  return {
    type: "SUB",
    value: number
  }
}

//===== reduce
const numberReduce = (state = appState, action) => { // reduce nhận vào 2 giá trị: state và action
  switch (action.type) {
    case "ADD":
      // state.number += action.value;
      const newValue = state.number += action.value; // tinh gia tri
      state = { ...state, number: newValue, histories: [...state.histories, newValue] };
      break;
    case "SUB":
      // state.number -= action.value;
      const newVal = state.number -= action.value;
      state = { ...state, number: newVal, histories: [...state.histories, newVal] };
      break;

    default:
      break;
  }
  return state;  // reduce luôn luôn trả về state nhưng không nên trả về state cũ mà nên tạo state mới để trả về.
}

const errorReduce = (state = appState, action) => {
  switch (action.type) {
    case "LESS_THAN_ZERO":
      state = {
        ...state,
        errorMsg: "number can not be than 0"
      };
      break;

    default:
      break;
  }
  return state;
}

//===== Middleware: nằm trước khi chạy hành động có thực thi hay không
const logger = store => next => action => { //
  console.log('state before update', store.getState());

  next(action); // cho phép thực hiện tiếp hành động với action truyền vào:(gọi hàm next()))
  // console.log('state after update', store.getState());
}

const checkIsZero = store => next => action => { //
  const currentNumber = store.getState().numberRe.number;

  if (currentNumber <= 0) {
    next({ type: "LESS_THAN_ZERO" });
  } else {
    next(action);
  }
}

//===== store
// trong trường hợp có 1 reduce(đơn reduce thì create sẽ nhận vào 1 reduce và 1 state)
// const store = createStore(numberReduce, appState);

// trong trường hợp có nhiều reduce thì dùng qua combineReduces truyền vào các reduce với khóa.
const reduces = combineReducers({ numberRe: numberReduce, errorRe: errorReduce });
// const store = createStore(reduces); // dùng qua reduces thì sẽ bỏ appState đi thay vào đó sẽ truyền appState trực tiếp qua tham số của reduce.
// const store = createStore(reduces, applyMiddleware(logger, checkIsZero)); // dùng với middleware(nếu dùng nhiều middleware thì các middlewarwe cách nhau dấu phẩy(,)).
const store = createStore(reduces, applyMiddleware(thunk, logger, checkIsZero)); // dùng với thunk trong middleware; (thông thường sẽ không dùng)

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

export default function App({ navigation }) {
  let type = 0;
  const dem = Dimensions.get("window");
  const [val, setVal] = useState(0);
  if (type) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
          <Stack.Screen name="MyStack" component={MyStack} />
          <Stack.Screen name="DetailProduct" component={DetailProduct} />
          <Stack.Screen name="ListCategory" component={ListCategory} navigation={navigation} />
          <Stack.Screen name="ListProduct" component={ListProduct} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserDetail" component={UserDetail} />
          <Stack.Screen name="Collslap" component={Collslap} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight:"bold", textAlign: "center"}}>{store.getState().numberRe.number}</Text>
        <Button title='add action' onPress={() => {
          store.dispatch(createAddAction(3));
          setVal(store.getState().numberRe.number);
        }}></Button>
        <Text>{"\n"}</Text>
        <Button title='sub action' onPress={() => {
          store.dispatch(createSubAction(2));
          setVal(store.getState().numberRe.number)
        }}></Button>
      </View>
    )
  }

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

// nan: mỗi khi pull code hay chuyển nhánh sẽ có thay đổi file package.json dễ gây ra lỗi khi chạy.
// nan: khi gặp lỗi đó cần chạy: npm install
// nan: nếu npm install vẫn lỗi thì xóa thư mục: node_modules rồi chạy lại: npm install.
// nan: nếu vẫn lỗi thì xóa thư mục: node_modules và file: package-lock.json rồi chạy lại: npm install.
