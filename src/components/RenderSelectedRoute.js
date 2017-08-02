/**
 * Created by alexandraward on 7/31/17.
 */
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
    }

    boundingBox() {
        var coords = this.props.route.geometry.coordinates;

        var lats = [];
        var lngs = [];

        for (var i = 0; i < coords[0].length; i++) {
            lats.push(coords[i].latitude);
            lngs.push(coords[i].longitude);
        }

        // calc the min and max lng and lat
        var minlat = Math.min.apply(null, lats),
            maxlat = Math.max.apply(null, lats);
        var minlng = Math.min.apply(null, lngs),
            maxlng = Math.max.apply(null, lngs);

        // create a bounding rectangle that can be used in leaflet
        bbox = [[minlat, minlng], [maxlat, maxlng]];

        // add the bounding box to the map, and set the map extent to it
        L.rectangle(bbox).addTo(map);
        map.fitBounds(bbox);
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
        return (
            <Map>
                <AllRoutes renderRoutes={renderRoutes}/>
            </Map>
        );
    }
}

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
