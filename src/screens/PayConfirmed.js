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
    TouchableHighlight,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
export default class PayConfirmed extends Component {


    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        top: 12,
                                        left: 10,
                                        height: 30,
                                        zIndex: 1002,
                                    }}
                                    onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={40}/>
                </TouchableHighlight>
                <View style={{
                    width: '100%',
                    height: 76,
                    marginTop: 49,
                    backgroundColor: '#FFF',
                    paddingHorizontal: 28,
                    justifyContent:'center'
                }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{
                            fontSize:16,
                            alignSelf:'center',
                            fontFamily:'HelveticaNeue'
                        }}>Ruta</Text>
                        <Text style={{
                            textAlign:'center',
                            fontSize:20,
                            fontFamily:'HelveticaNeue',
                            paddingRight:10
                        }}>Caguas - Aguas Buenas</Text>
                    </View>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 120,
                    backgroundColor: '#FFF',
                }}>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 48,
                        fontFamily:'HelveticaNeue'
                    }}>
                        12:45 pm
                    </Text>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 28,
                        fontFamily:'HelveticaNeue'
                    }}>
                        Julio 27, 2017
                    </Text>
                    <Text style={{
                        fontSize:10,
                        paddingHorizontal: 29,
                        color:'#454545',
                        fontFamily:'HelveticaNeue'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus quis lectus metus, at posuere neque.
                    </Text>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 142,
                    backgroundColor: '#FFF',
                    paddingTop: 15
                }}>
                    <View style={{
                        width: 91,
                        height: 91,
                        backgroundColor: '#5FB73C',
                        borderRadius: 45.5,
                        borderColor:'#438528',
                        borderWidth:1,
                        alignSelf:'center'}}/>
                    <Text style={{
                        textAlign:'center',
                        fontSize:30,
                        color:'#6F6F6F',
                        fontFamily:'HelveticaNeue',
                        marginBottom: 9
                    }}> Pagado </Text>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: '#FFF',
                }}>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 60,
                        fontFamily:'HelveticaNeue'
                    }}>$3.00</Text>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 20,
                        fontFamily:'HelveticaNeue',
                        color:'#CACACA',
                    }}>
                        2 pasajes
                    </Text>
                </View>
                <Text style={{
                    fontSize: 18,
                    paddingTop: 25,
                    fontFamily:'HelveticaNeue',
                    textAlign: 'center'}}>
                    Muestre esta pantalla al chofer para demostrar el pago de al tarifa
                </Text>

            </View>
        )
    }
}
AppRegistry.registerComponent('PayConfirmed', () => PayConfirmed);
