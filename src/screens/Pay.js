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
export default class Pay extends Component {


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
                    paddingVertical: 7,
                    paddingHorizontal: 15
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            marginRight: 27,
                            fontSize: 16,
                            alignSelf:'center',
                            color: '#8B8A8A'
                        }}>Ruta</Text>
                        <Text style={{
                            fontSize: 20
                        }}>Caguas - Aguas Buenas</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 61,
                        }}>Costo</Text>
                        <Text style={{
                            fontSize: 30,
                            marginLeft: 125,
                            fontFamily:'HelveticaNeue'
                        }}>$1.50</Text>
                    </View>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 120,
                    backgroundColor: '#FFF'
                }}>
                    <Text style={{
                        color: '#FF3030',
                        fontSize: 12,
                        textAlign: 'center'
                    }}>
                        Debe agregar mas fondos para poder efectuar el pago
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginTop: 13}}>
                            <Text style={{
                                fontSize: 50,
                                fontFamily:'HelveticaNeue',
                                marginLeft: 52
                            }}>
                                $.75
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                paddingHorizontal: 15,
                                paddingBottom:10,
                                backgroundColor:'transparent'
                            }}>
                                Fondos disponibles
                            </Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => Alert.alert('Recargar')}>
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                marginRight: 13,
                                width: 136,
                                height: 83,
                                borderRadius: 5,
                                justifyContent: 'center',
                                backgroundColor: '#D8D8D8'
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>
                                    <Entypo style={{alignSelf: 'center', paddingRight: 10}}
                                            name="wallet" size={20} color={'#616161'}/>
                                    Recargar
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 126,
                    backgroundColor: '#FFF',
                    paddingHorizontal: 15,
                    paddingVertical: 10
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: '#CACACA'
                    }}>Venta</Text>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: 83,
                        borderColor: '#979797',
                        borderWidth: 1,
                        height: 83,
                        backgroundColor: '#D8D8D8',
                        marginBottom: 21,
                        borderRadius: 41.5,
                        alignSelf: 'center'
                    }}/>
                </View>

                <View style={{width: '100%', height: 3}}/>

                <View style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: '#FFF'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: 20,
                            color: '#CACACA',
                            paddingHorizontal: 15,
                            paddingTop: 30
                        }}>Total</Text>
                        <Text style={{
                            fontSize: 60,
                            color:'#0A0A0A',
                            alignSelf:'center',
                            marginLeft: 37,
                            fontFamily:'HelveticaNeue'
                        }}>
                            $3.00
                        </Text>
                    </View>
                </View>
                <View style={{width: '100%', height: 3}}/>
                <View style={{flex: 1,
                    paddingVertical: 25,
                    paddingHorizontal:10
                }}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus metus,
                        at posuere neque. Sed pharetra nibh eget orci convallis at posuere leo convallis. </Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PayConfirmed')}>
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        justifyContent: 'center',
                        bottom: 0,
                        height: 59,
                        backgroundColor: '#D8D8D8'
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20
                        }}>Continuar</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
AppRegistry.registerComponent('Pay', () => Pay);
