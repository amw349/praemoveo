/**
 * Created by alexandraward on 7/31/17.
 */
import React, {Component} from 'react';
import {AppRegistry, Alert, Text, TouchableHighlight, View, Modal, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Map from './Map';
import AllRoutes from './AllRoutes';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class RenderSelectedRoute extends Component {
    props: {
        route: PropTypes.object;
        busData: PropTypes.object;
    }

    boundingBox() {
        var coords = this.props.route.geometry.coordinates;
        var formatedCoords = [];
        for (var i = 0; i < coords.length; i++) {
            formatedCoords.push(
                latLng = {
                    latitude: coords[i].latitude,
                    longitude: coords[i].longitude
                }
            )
        }
        return formatedCoords;


        // create a bounding rectangle that can be used in leaflet
        // bbox = [[minlat, minlng], [maxlat, maxlng]];
        //
        // // add the bounding box to the map, and set the map extent to it
        // L.rectangle(bbox).addTo(map);
        // map.fitBounds(bbox);
    }

    constructor(props) {
        super(props);
        console.log("bbox", this.props.route.geometry.coordinates)
    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.props.route.geometry.coordinates}
                strokeColor={this.props.route.color}
                strokeWidth={2}>
            </MapView.Polyline>
        )
            ;
    }

    render() {
        let renderRoutes = this.renderRoutes();
        let boundingBoxCoordinates = this.boundingBox();
        return (
            <Map boundingBoxC={boundingBoxCoordinates}>
                <AllRoutes renderRoutes={renderRoutes}/>
            </Map>
        );
    }
}

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
