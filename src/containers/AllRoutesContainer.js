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
    Easing,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Map from '../components/Map';
import AllRoutes from '../components/AllRoutes';
import PropTypes from 'prop-types';

export default class AllRoutesContainer extends Component {

    props: {
        metroRoutes: PropTypes.object,
        caguasRoutes: PropTypes.object,
        mapOpacity: PropTypes.func
    };

    state = {
        routes: this.props.metroRoutes.concat(this.props.caguasRoutes),
        yPosition: new Animated.Value(Dimensions.get('window').height),
        routeName: "",
        showLocationButton: true
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
        this.setState({
            routeName: route.properties.fullName,
            showLocationButton: false
        });
    }

    closeInfo() {
        this.slideDown.start();
        this.setState({
            showLocationButton: true
        });
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
                <Animated.View style={[styles.infoBox,
                    {transform: [{translateY: this.state.yPosition}]}]}>
                    <TouchableWithoutFeedback onPress={() => this.closeInfo()}>
                        <Ionicons
                            name="ios-arrow-round-back"
                            size={40}
                            style={styles.backButton}
                        />
                    </TouchableWithoutFeedback>
                    <Text style={styles.routeName}>Ruta {this.state.routeName}</Text>
                </Animated.View>
            </View>
        );
    }
}


const styles = new StyleSheet.create({
    infoBox: {
        padding: 20,
        height: '25%',
        alignItems: 'center',
        zIndex: 1005,
        borderRadius: 2,
        backgroundColor: '#FFF',
        marginBottom: 30,
        marginLeft: 16,
        marginRight: 16,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    routeName: {
        fontSize: 25,
        position: 'absolute',
        textAlign: 'center',
        top: 0,
    },
    backButton: {
        alignSelf: 'flex-start'
    }
});

AppRegistry.registerComponent('AllRoutesContainer', () => AllRoutesContainer);

