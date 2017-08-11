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
export default class RouteInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            route: this.props.navigation.state.params.route
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor:'gray'}}>


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

                <View style={{
                    width:'100%',
                    height:'25%',
                    marginTop:'15%',
                    backgroundColor:'#FFF'}}>
                    <Text style={{textAlign: 'center'}}>{this.state.route.properties.fullName}
                    - {this.state.route.id}</Text>
                </View>
                <Text style={{
                    textAlignVertical: 'center',
                    textAlign: 'center'}}> Route Info </Text>
            </View>
        )
    }
}
AppRegistry.registerComponent('RouteInfo', () => RouteInfo);
