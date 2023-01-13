import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity  } from 'react-native';
import * as Clipboard from 'expo-clipboard'; // npx expo install expo-clipboard   https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

export default function AddressDetail(props, { route, navigation }) {
  const [copiedText, setCopiedText] = React.useState('');
  const { firstname, lastname, street, city, postcode, region, telephone } = props.address_data;

  useEffect(() => {
    // Update the document title using the browser API
  });

  return (
    <View style={styles.container}>
      <Text>{firstname} {lastname}</Text>
      <Text>{street.length != 1 ? street.join(" ") : street[0]}</Text>
      <Text>{city}-{region.region}-{postcode}</Text>
      <Text>T: {telephone}</Text>
      <TouchableOpacity onPress={() => { }}>
        <Text style={{ color: "blue" }}>Edit address</Text>
      </TouchableOpacity>
    </View>
  );

  // ================================
  {/* <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
              <Button title="View copied text" onPress={fetchCopiedText} />
              <Text style={styles.copiedText}>{copiedText}</Text> */}

  // const copyToClipboard = async () => {
  //   await Clipboard.setStringAsync('hello world123123123');
  //   console.log("coppy!");
  // };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  // };
  // ================================
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red'
  },
});
