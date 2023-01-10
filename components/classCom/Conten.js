import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, Button } from "react-native";
// import { Button } from "react-native-web";
import Config from '../../assets/Datasource/Config';

class Conten extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "noi dung content",
            page: 1,
            values: null
        };
    }

    componentWillMount(){
        this.getdata(1, 5).then((data) => {
            this.setState({title: "", values: data, page: 1});
            // console.log("componentWillMount", this.state);
        })
     }

    getdata = function(_p = 1, p_size = 3){
        return fetch(Config.http+Config.ip+Config.uri_241+ Config.rest + Config.v1 + "productList/4?_p="+_p+"&p_size=" + p_size).then(
            (response) => response.json()
        ).then(
            (json)=> {return json;}
        ).catch(
            (error) => console.log(error)
        );
    }


    render(){
        if (this.state.values) {
            return(
                <View style={{height: "100%", alignItems: "center"}}>
                    <Button 
                        title="load more data:-->"
                        style={{borderRadius: 88, width: 220}}
                        onPress={()=> {
                            let _p = this.state.page;
                            this.getdata(_p+1).then((val) => {
                                let page_ = this.state.page;
                                this.setState({
                                    values: val,
                                    page: page_+1
                                })
                            })
                         
                        }}
                    ></Button>
                    {
                        (
                            ()=>{
                                let mixedc = [];
                                if (this.state.values != undefined) {
                                    for (let index = 0; index < this.state.values.items.length; index++) {
                                        mixedc.push(<Item 
                                            image_path = {this.state.values.items[index].image_path} 
                                            text_title={this.state.values.items[index].name} 
                                            key={index} 
                                            parent = {this}></Item>)
                                    }
                                }
                                return mixedc;
                            }
                        )()
                    }
    
                    <FlatList
                        data={this.state.values != undefined ? this.state.values.items : []}
                        renderItem= {({item})=> <Item 
                                                image_path = {item.image_path} 
                                                text_title={item.name} 
                                                key={item.eid} 
                                                parent = {this}
                                                navigation = {this.props.navigation}
                                                eid={item.eid}
                                            ></Item>
                        }
                        keyExtractor={item=> item.eid}  
                    ></FlatList>
                </View>
                
            );
        }else{
            return <Text style={{textAlign: "center"}}>loadding...</Text>
        }
        
    }
}

class Item extends React.Component{
    constructor(props){
        super(props);
        // console.log(props);
    }
    render(){
        // console.log(this.props);
        let image_path = this.props.image_path ?? "http://192.168.100.209/magento241/pub/media/catalog/product/cache/e0be443e0e32b79f95c6998419f56bfa/m/b/mb03-black-0.jpg";
        let resize = 1;

        return(
            <View>
                <Text style={css.text_title}>
                    {this.props.text_title != undefined ? this.props.text_title : "title of pro"}
                </Text>
                <View>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("DetailProduct", {pro_id: this.props.eid});
                        // this.props.parent.setState({title: image_path});
                        }}>
                    <Image 
                        style={{width: Dimensions.get("window").width, height: Dimensions.get("window").width*2/4, borderRadius: 20}}
                        resizeMode = {resize == 1 ? "cover" : "contain"}
                        source={{uri: image_path}}>

                        </Image>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const css = StyleSheet.create({
    magento: {
        backgroundColor: "violet",
        borderRadius: 6,
        borderWidth: 4,
        width: 180, height: 60, 
        alignItems: "center", 
        justifyContent: "center"
    },
    text_title: {
        fontSize: 18,
        paddingLeft: 12,
        color: "blue",
        textDecorationLine: "underline"
        
    }
});

export default Conten;