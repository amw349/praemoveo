/**
 * Created by scarbone on 8/11/17.
 */
/**
 * Created by scarbone on 8/11/17.
 */
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
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class Pay extends Component {



    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'red', justifyContent:'center'}}>


                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        top: 22,
                                        left: 16,
                                        height: 30,
                                        zIndex: 1002,
                                    }}
                                    onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={40}/>
                </TouchableHighlight>


                <Text style={{
                    textAlignVertical: 'center',
                    textAlign: 'center'}}> Pagar </Text>
            </View>
        )
    }
}
AppRegistry.registerComponent('Pay', () => Pay);
