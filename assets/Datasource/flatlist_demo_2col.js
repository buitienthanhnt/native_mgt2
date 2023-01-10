
import React from 'react';
 
import { View, StyleSheet, SafeAreaView, FlatList, Text, Alert } from 'react-native';
 
export default function App() {
 
  const ITEMS = [
    {
      id: 1,
      data: 'A',
    },
    {
      id: 2,
      data: 'B',
    },
    {
      id: 3,
      data: 'C',
    },
    {
      id: 4,
      data: 'D',
    },
    {
      id: 5,
      data: 'E',
    },
    {
      id: 6,
      data: 'F',
    },
    {
      id: 7,
      data: 'G',
    },
    {
      id: 8,
      data: 'H',
    },
    {
      id: 9,
      data: 'I',
    },
    {
      id: 10,
      data: 'J',
    },
    {
      id: 11,
      data: 'K',
    },
    {
      id: 102,
      data: 'L',
    },
 
  ];
 
  const GridView = ({ data }) => (
    <View style={styleSheet.gridbox}>
      <Text style={styleSheet.gridText} onPress={() => { getOnPressItem(data) }}>{data}</Text>
    </View>
  );
 
  const getOnPressItem = (data) => {
 
    Alert.alert(data);
 
  }
 
  const Grid_Header = () => {
    return (
      <View style={{
        height: 50,
        width: "100%",
        backgroundColor: "#FF6F00",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
 
        <Text style={{ fontSize: 24, color: 'white' }}> GridView in React Native </Text>
 
      </View>
    );
  }
 
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
 
      <FlatList
        data={ITEMS}
        renderItem={({ item }) => <GridView data={item.data} />}
        keyExtractor={item => item.id}
        numColumns={2}
        key={item => item.id}
        ListHeaderComponent={Grid_Header}
      />
 
    </SafeAreaView>
  );
}
 
const styleSheet = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
 
  gridbox: {
    flex: 1,
    height: 75,
    margin: 2,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  gridText: {
    fontSize: 24,
    color: 'white'
  }
 
});