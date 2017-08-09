/**
 * Created by alexandraward on 7/17/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    TouchableWithoutFeedback,
    Text,
    Animated,
    Dimensions,
    Alert,
    PanResponder,
    Easing,
    StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import Map from '../components/Map';
import AllRoutes from '../components/AllRoutes';
import PropTypes from 'prop-types';
import RouteIdentifier from '../components/RouteIdentifier'
import Swipable from 'react-native-swipeable'
export default class AllRoutesContainer extends Component {

    props: {
        metroRoutes: PropTypes.object,
        caguasRoutes: PropTypes.object,
        mapOpacity: PropTypes.func
    };

    state = {
        routes: this.props.metroRoutes.concat(this.props.caguasRoutes),
        routeNameColor: '#000',
        yPosition: new Animated.Value(Dimensions.get('window').height),
        xPosition: new Animated.Value(0),
        routeName: "",
        showLocationButton: true,
        busCode: ""
    };

    constructor(props) {
        super(props);
        let animationSpeed = 300;
        this.slideUp = Animated.timing(
            this.state.yPosition, {
                toValue: 0,
                duration: animationSpeed,
                delay: 0,
                easing: Easing.in(Easing.ease)
            }
        );
        this.slideDown = Animated.timing(
            this.state.yPosition, {
                toValue: Dimensions.get('window').height,
                duration: animationSpeed,
                delay: 0,
                easing: Easing.in(Easing.ease)
            }
        )
    }

    openInfo(route) {
        this.slideUp.start();
        this.animatedValue.setValue({x: 0, y: 0});
        this.setState({
            routeName: route.properties.fullName,
            routeNameColor: route.properties.color,
            busCode: route.id,
            showLocationButton: false
        });
    }

    closeInfo() {
        this.slideDown.start();
        this.setState({
            showLocationButton: true,
            translateY: new Animated.Value(0)
        });
    }

    pagar() {
        Alert.alert('Pagar');
    }

    recargar() {
        Alert.alert('Recargar');
    }

    componentWillMount() {
        //WE DON'T USE THE Y VALUE OF THE TRANSFORM IN OUR COMPONENT
        this.animatedValue = new Animated.ValueXY();
        this._value = {x: 0, y: 0};
        this.animatedValue.addListener((value) => this._value = value);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx > Dimensions.get('window').width * 0.015 ||
                    gestureState.dx < -Dimensions.get('window').width * 0.015;
            },
            onPanResponderGrant: (e, gestureState) => {
                this.animatedValue.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                });
                this.animatedValue.setValue({x: 0, y: 0})
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.animatedValue.x}
            ]),
            onPanResponderRelease: (e, gestureState) => {
                this.animatedValue.flattenOffset();
                if (gestureState.dx > Dimensions.get('window').width * 0.5) {
                    Animated.timing(this.animatedValue, {
                        toValue: {x: Dimensions.get('window').width, y: 0},
                        delay: 0,
                        easing: Easing.in(Easing.ease),
                        duration: 50,
                    }).start(this.closeInfo());
                }
                else if (gestureState.dx < -Dimensions.get('window').width * 0.5) {
                    Animated.timing(this.animatedValue, {
                        toValue: {x: -Dimensions.get('window').width, y: 0},
                        delay: 0,
                        easing: Easing.in(Easing.ease),
                        duration: 50,
                    }).start(this.closeInfo());
                } else {
                    Animated.timing(this.animatedValue, {
                        toValue: {x: 0, y: 0},
                        delay: 0,
                        easing: Easing.in(Easing.ease),
                        duration: 200,
                    }).start();
                }
            },
        })
    }

    renderRoutes() {
        return this.state.routes.map((element) =>
            <MapView.Polyline
                onPress={() => this.openInfo(element)}
                coordinates={element.geometry.coordinates}
                strokeColor={element.properties.color}
                strokeWidth={3}>
            </MapView.Polyline>
        );
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <View style={{flex: 1}}>
                <Map showLocationButton={this.state.showLocationButton}
                     mapOpacity={pressed => this.props.mapOpacity(pressed)}>
                    <AllRoutes renderRoutes={renderRoutes}/>
                </Map>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[styles.infoBox,
                        {
                            transform: [{translateX: this.animatedValue.x}, {translateY: this.state.yPosition}],
                            opacity: this.animatedValue.x.interpolate({
                                inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
                                outputRange: [0.4, 1, 0.4]
                            })
                        }
                    ]
                    }>

                    <View style={styles.headerRow}>
                        <RouteIdentifier color={this.state.routeNameColor}/>
                        <Text numberOfLines={1} style={styles.routeName}>
                            {this.state.busCode} - {this.state.routeName}</Text>
                        <Entypo style={{alignSelf: 'center', paddingRight: 10}} name="star" size={15}
                                color={'rgba(250,236,139,1)'}/>
                        <Text style={[styles.smallFont, {alignSelf: 'center'}]}>Costo $1.25</Text>
                    </View>


                    <View
                        style={{flex: 1, alignSelf: 'flex-start', marginLeft: 52, justifyContent: 'space-between'}}>
                        <Text style={styles.smallFont}>Tiemp espera: 3 min aprox.</Text>
                        <Text style={styles.smallFont}>Fondos disponibles: $5.00</Text>
                        <View/>
                        <View/>
                    </View>


                    <Text style={styles.addFundsText}>Debe agregar mas fondos para este viaje</Text>
                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback onPress={() => this.recargar()}>
                            <View style={{flex: 1}}>
                                <Text style={styles.buttonsText}>
                                    <Entypo style={{alignSelf: 'center', paddingRight: 10}}
                                            name="wallet" size={20}/>
                                    Recargar
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{width: 2}}/>

                        <TouchableWithoutFeedback onPress={() => this.pagar()}>
                            <View style={{flex: 4 / 3}}>
                                <Text style={styles.buttonsText}>Pagar</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                </Animated.View>
            </View>
        );
    }
}


const styles = new StyleSheet.create({
    infoBox: {
        overflow: 'visible',
        height: '25%',
        alignItems: 'center',
        zIndex: 1005,
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginBottom: 30,
        marginLeft: 16,
        marginRight: 16,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 3
    },
    routeName: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        color: 'rgba(69,69,69,1)'
    },
    smallFont: {
        fontSize: 14,
    },
    backButton: {
        padding: 10,
        position: 'absolute',
        left: 0,
        top: 0
    },
    buttons: {
        flex: 3 / 5,
        flexDirection: 'row',
        width: '95%',
        padding: 10
    },
    buttonsText: {
        fontSize: 18,
        flex: 1,
        borderRadius: 8,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: 'HelveticaNeue',
        backgroundColor: '#F7F7F7',
    },
    addFundsText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 52,
        marginBottom: -5
    },
    headerRow: {
        width: '95%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 10
    }
});

AppRegistry.registerComponent('AllRoutesContainer', () => AllRoutesContainer);

