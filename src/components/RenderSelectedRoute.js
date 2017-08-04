/**
 * Created by alexandraward on 7/31/17.
 */
'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, TouchableHighlight, TouchableOpacity, View, Modal, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Map from './Map';
import AllRoutes from './AllRoutes';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class RenderSelectedRoute extends Component {
    props: {
        route: PropTypes.object;
        busData: PropTypes.object;
    };

    state = {
        mapRef2: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route
        }
    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.state.route.geometry.coordinates}
                strokeColor={this.state.route.color}
                strokeWidth={2}>
            </MapView.Polyline>
        );
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <Map route={this.state.route} ref={ref => { this.state.mapRef2 = ref; }}>
                <AllRoutes renderRoutes={renderRoutes}/>
                {/*<View style={[...StyleSheet.absoluteFillObject]}>*/}
                <View style={[...StyleSheet.absoluteFillObject, styles.buttonContainer]}>
                    <TouchableOpacity
                        onPress={() => this.state.mapRef2.fitToRoute(this.state.route.geometry.coordinates)}
                        style={styles.button}
                    >
                        <Text>Fit To Route</Text>
                    </TouchableOpacity>
                </View>
            </Map>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        // backgroundColor: 'blue',
        top: 150
    },
});

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
