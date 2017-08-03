/**
 * Created by alexandraward on 7/31/17.
 */
'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, TouchableHighlight, View, Modal, StyleSheet, Dimensions} from 'react-native';
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

    constructor(props) {
        super(props);
    }

    boundingBoxCenter() {
        let coords = this.props.route.geometry.coordinates;

        let lats = [];
        let lngs = [];

        for (let i = 0; i < coords.length; i++) {
            lats.push(coords[i].latitude);
            lngs.push(coords[i].longitude);
        }

        // calc the min and max lng and lat
        let minlat = Math.min.apply(null, lats),
            maxlat = Math.max.apply(null, lats);
        let minlng = Math.min.apply(null, lngs),
            maxlng = Math.max.apply(null, lngs);
        let clat = minlat + ((maxlat - minlat) / 2);
        let clng = minlng + ((maxlng - minlng) / 2);

        // create a bounding rectangle that can be used to create a polygon on react-native-maps
        let bbox = [{latitude: minlat, longitude: minlng}, {latitude: maxlat, longitude: maxlng}];

        // bounding box center
        let cbbox = {latitude: clat , longitude: clng}

        return cbbox;
    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.props.route.geometry.coordinates}
                strokeColor={this.props.route.color}
                strokeWidth={2}>
            </MapView.Polyline>
        );
    }

    render() {
        let routeRegion = this.boundingBoxCenter();
        let renderRoutes = this.renderRoutes();
        return (
            <Map region={routeRegion} route={this.props.route}>
                <AllRoutes renderRoutes={renderRoutes}/>
            </Map>
        );
    }
}

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
