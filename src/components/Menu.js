/**
 * Created by Edxe on 7/12/17.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    Styles} from "react-native";

export default class Menu extends Component{

    render() {
        return (
            <ScrollView scrollsToTop={false} >
                <View style={{flex:1,paddingTop:50,paddingLeft:10}}>
                    <Text>Rutas</Text>
                </View>
            </ScrollView>

        );
    }

}



