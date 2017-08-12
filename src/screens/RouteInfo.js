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
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from  'react-native-vector-icons/Entypo'
export default class RouteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            route: this.props.navigation.state.params.route
        }
    }

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
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    marginTop: 50,
                    backgroundColor: '#FFF'
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{
                            color:'#8B8A8A',
                            marginRight:10,
                            marginLeft:-5,
                            fontSize: 18}}> Ruta </Text>
                        <Text style={{fontSize: 20}}>
                            {this.state.route.properties.fullName} - {this.state.route.id}
                        </Text>
                    </View>
                    <View style={{flex: 1, marginHorizontal: 3}}>
                        <Text style={{color:'#656464'}}>Sale cada 15 minutos (variable)</Text>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right:0,
                        bottom:'40%',
                        paddingHorizontal: 15,
                    }}>
                        <Entypo style={{alignSelf: 'center'}} name="star" size={27}
                                color={'rgba(250,236,139,1)'}/>
                        <Text style={{color:'#6F6F6F'}}>$0.75</Text>
                    </View>
                </View>
                <View style={{width: '100%', height: 1}}/>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    height: 23,
                    backgroundColor: '#FFF',
                    paddingHorizontal: 25
                }}>
                    <Text style={{
                        textAlignVertical: 'center',
                        fontSize: 13,
                        color:'#656464'}}>Lunes - Viernes 6:00 am - 6:00 pm</Text>
                </View>
                <View style={{
                    paddingHorizontal: 25,
                    paddingVertical: 25,
                    width: '100%',
                    height: 150,
                    backgroundColor: 'transparent'
                }}>
                    <Text style={{color:'#656464'}}> Paradas</Text>
                    <Text style={{paddingVertical: 6,
                    color:'#656464'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus quis lectus metus, at posuere neque </Text>
                </View>
                <View style={{
                    width: '100%',
                    height: 31,
                    paddingHorizontal: 25,
                    justifyContent: 'center',
                    backgroundColor: '#FFF'
                }}>
                    <Text style={{color:'#454545'}}>Parada las Monjitas</Text>
                </View>
            </View>
        )
    }
}
AppRegistry.registerComponent('RouteInfo', () => RouteInfo);
