import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native';
import { connect } from 'react-redux';

class AddView extends Component {

  constructor(props) {
    super(props);
    this.state = { newTaskName: '' }
  }


  render() {
    console.log("addView", this);
    const onAddNewTask = this.props.onAddNewTask; // khai báo bằng cách gán qua props.

    return (
      <View style={ styles.addView } >
        <Text style={{ fontSize: 18, marginBottom: 10}}>To Do App</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex:1, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
              returnKeyType="done"
              underlineColorAndroid="transparent"
              value={`${this.state.newTaskName}`}
              // onSubmitEditing={ onAddNewTask }
              onChangeText={ text => this.setState({ newTaskName: text }) }
              placeholder="Task name" 
              style={[{ flex: 1 }, styles.input ]} 
            />
          </View>

          <TouchableOpacity style={ styles.button } onPress={ ()=>onAddNewTask(this.state.newTaskName) }>
            <Text style={{ color: 'white' }}>Add view</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const addView = (title)=>{
  return {
    type: "ADD",
    title: title
  };
}
export default connect(
  state => { // tham số 1 gán props cho Component qua state, cũng là để lắng nghe state đó luôn(nếu không cần dùng props nào thì thôi để {})
    return {}
},
dispatch => {
    return{
      onAddNewTask: (title) => dispatch(addView(title))  // khai báo action qua props từ đây có thể gọi trực tiếp hành động với dispatch luôn(onAddNewTask được gán qua props luôn) 
    }
}
)(AddView);


const styles = StyleSheet.create({

  addView: {
    ...Platform.select({
      ios: {
        height: 94,
        paddingTop: 20,
      },
      android: {
        height: 74,
      }  
    }),
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    elevation: 2
  },

  input : {
    height: 30, 
    padding: 5, 
    borderRadius: 5, 
    borderColor: 'lightgray',
    borderWidth: 1,
    fontSize: 15
  },

  button : {
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3', 
    padding: 7
  },
});