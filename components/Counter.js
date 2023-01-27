import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Button,
  Text,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native';
import { connect } from 'react-redux';

export default class Counter extends Component {

  constructor(props) {
    super(props);
    // this.state = { number : props.number }
  }

  render() {
    const { number } = this.props;
    // console.log('====================================');
    // console.log(this.props);
    // console.log('====================================');
    return (
      <View style={styles.counterView} >
        <Button onPress={() => this.props.subfunction()} title="Sub" />
        <Text>Counter: {number}</Text>
        <Button onPress={() => this.props.addfunction()} title="Add" />

      </View>
    );
  }
}

// const add1 = () => {
//   return {
//     type: "ADD_NUMBER"
//   };
// };

// const sub1 = () => {
//   return {
//     type: "SUB_NUMBER"
//   };
// };

// export default connect(
//   state => { // tham số 1 gán props cho Component qua state, cũng là để lắng nghe state đó luôn
//     return {
//       g_data: state.numberRe
//     };
//   },
//   dispatch => {
//     return {
//       addfunction: () => dispatch(add1()), // khai báo action qua props(nó sẽ gọi dispatch luôn)
//       subfunction: () => dispatch(sub1())  // khai báo action qua props
//     }
//   }
// )(Counter); // tạo kết nối với redux và react.


const styles = StyleSheet.create({
  counterView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});