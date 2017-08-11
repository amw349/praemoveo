/**
 * Created by Edxe on 7/14/17.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Animated,
    Dimensions,
    Alert,
    Easing,
    BackHandler,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";

export default  class About extends Component{

    static navigationOptions = {
        title: 'Sobre Nosotros',
    };

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{textAlign:'center'
                ,textAlignVertical:'center'}}>Hello</Text>
            </View>
        )
    }
}