/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight,TouchableWithoutFeedback, Animated} from "react-native";
import Map from "./components/Map";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Setup extends Component {

    constructor(props) {
        super(props);
        // this.setAnim = this.setAnim.bind(this);
    }


    componentDidMount() {

    }

    render() {
        return (

            <View style={{flex:1}}>
                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{...StyleSheet.absoluteFillObject,top:50,left:22,height:30,zIndex:1002,}}
                                    onPress={() => this.props.navigation.navigate('DrawerOpen')}>

                    <Ionicons name="ios-menu" size={30}></Ionicons>
                </TouchableHighlight>
                <View style={styles.destination}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'

                                        onPress={() => this.props.navigation.navigate('InitialRouteSelect',{routesList:require("./json/routesFormat.json")})}>
                        <Text style={{...styles.map,fontSize:20,color:'#EAEAEA'}}>¿A donde vamos hoy?</Text>
                    </TouchableHighlight>
                </View>
                <Map />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'HelveticaNeue-Thin',
        // fontFamilyThin: 'HelveticaNeue-Thin',
        // fontFamilyLight: 'HelveticaNeue-Light',
        // fontFamilyMedium: 'HelveticaNeue-Medium',
    },
    destination: {
        height: 52,
        backgroundColor: 'rgba(42, 54, 59, 0.7)',
        zIndex: 1003,
        marginLeft: 21,
        marginRight: 21,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        ...StyleSheet.absoluteFillObject,
        top: 88
    }

});

AppRegistry.registerComponent('Setup', () => Setup);