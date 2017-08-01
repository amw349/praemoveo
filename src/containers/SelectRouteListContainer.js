/**
 * Created by alexandraward on 7/18/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Animated,
    Dimensions,
    Easing,
    BackHandler,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation'

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from "../components/Map";
import Svg, {Circle} from 'react-native-svg';
import SelectRouteListItem from "../components/SelectRouteListItem";

export default class SelectRouteListContainer extends Component {

    props: {
        routes: PropTypes.object,
        borderWidth: 3,
        borderRadius: 1,
        setState: PropTypes.func
    };

    constructor(props) {
        super(props);

        let {height, width} = Dimensions.get('window');


        this.state = {
            slide: new Animated.Value(height),
            opacity: new Animated.Value(0),
            inputOpacity: new Animated.Value(0),
            width: new Animated.Value(width * 0.50),
            textTranslate: new Animated.Value(0)
        };


        this.slideIn = Animated.timing(
            this.state.slide, {
                toValue: 0,
                duration: 500,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.textSlide = Animated.timing(
            this.state.textTranslate, {
                toValue: -50,
                duration: 600,
                delay: 600,
                easing: Easing.in(Easing.easing)
            }
        );

        this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 0.8,
                duration: 1000,
                delay: 0
            }
        );

        this.expand = Animated.timing(
            this.state.width, {
                toValue: width,
                duration: 500,
                delay: 0
            }
        );

        this.slideOut = Animated.timing(
            this.state.slide, {
                toValue: height,
                duration: 300,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 300,
                delay: 0
            }
        );

        this.inputFade = Animated.timing(
            this.state.inputOpacity, {
                toValue: 1,
                duration: 600,
                delay: 600
            }
        );
    }

    _renderItem = ({item}) => (
        <View>
            <View style={{flexDirection: 'row', height: 53}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height="30" width="30">
                            <Circle cx="15" cy="15" r="7.5" fill="none" stroke={item.color} strokeWidth="5"/>
                        </Svg>
                    </View>
                    <View style={{flex: 3 / 5, flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, fontFamily: 'Helvetica-Light'}}>{item.fullName}</Text>
                        <Text style={{fontSize: 12, fontFamily: 'Helvetica-Light'}}>Sale cada {item.interval}</Text>
                    </View>
                    <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name='ios-star-outline' size={18}/>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 4 / 5, alignItems: 'center'}}>
                            <Text style={{fontSize: 12, fontFamily: 'Helvetica-Light', marginTop: 12}}>Próxima
                                llegada</Text>
                            <Text style={{fontSize: 14, fontFamily: 'Helvetica-Light', marginBottom: 12}}>{item.eta}
                                (en {item.interval})</Text>
                        </View>
                        <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Entypo name="chevron-thin-right" size={18} style={{marginRight: 10}}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ced0ce"
            }}
            />
        );
    };


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.closeWindow);

        Animated.parallel([
            this.slideIn,
            this.fadeIn,
            this.expand,
            this.textSlide,
            this.inputFade
        ]).start();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.closeWindow)
    }

    closeWindow() {
        Animated.parallel([
            this.slideOut,
            this.fadeOut
        ]).start(() => this.props.setState(false))
    }

    render() {

        const routes = this.props.routes;
        return (
            <View style={{flex: 1}}>
                <Animated.View style={{opacity: this.state.opacity, backgroundColor: "#FFF"}}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        style={{
                                            ...StyleSheet.absoluteFillObject,
                                            top: 50,
                                            left: 22,
                                            height: 30,
                                            zIndex: 1002,
                                        }}
                                        onPress={() => this.closeWindow()}>

                        <MaterialIcons name="arrow-back" size={30}/>
                    </TouchableHighlight>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, .2)',
                        height: 150
                    }}>
                        <Animated.View style={[styles.destination, {marginTop: 75, transform: [{translateY: this.state.textTranslate}]}]}>
                            <TouchableHighlight accessibilityTraits="button"
                                                underlayColor='transparent'
                            >
                                <Text style={{...styles.map,fontSize: 20, color: '#EAEAEA'}}>
                                    ¿A donde vamos hoy?</Text>
                            </TouchableHighlight>
                        </Animated.View>
                    </View>
                    <View style={{flexDirection: 'row', height: 38, padding: 12}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontFamily: 'Helvetica-Light'}}>Próximas llegadas</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'right', fontFamily: 'Helvetica-Light'}}>4 resultados</Text>
                        </View>
                    </View>
                </Animated.View>
                <View style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Animated.View
                        style={[{
                            flex: 1,
                            width: this.state.width,
                            backgroundColor: '#FFF',
                            transform: [{translateY: this.state.slide}]
                        }]}>
                        {this.renderSeparator()}
                        <FlatList
                            data={routes.routes}
                            renderItem={this._renderItem}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </Animated.View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('SelectRouteListContainer', () => SelectRouteListContainer);
