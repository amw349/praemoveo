/**
 * Created by alexandraward on 7/31/17.
 */
import React, {Component} from 'react';
import {AppRegistry, Alert, Text, TouchableHighlight, View, Modal, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Map from './Map';
import AllRoutes from './AllRoutes';
import PropTypes from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import geoLib from 'geolib';
const {width, height} = Dimensions.get('window');

export default class RenderSelectedRoute extends Component {
    props: {
        route: PropTypes.object;
        busData: PropTypes.object;
    };

    boundingBox() {
        let coords = this.props.route.geometry.coordinates;
        let formatedCoords = [];
        for (let i = 0; i < coords.length; i++) {
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
        this.state = {
            vehiclePosition: this.props.route.geometry.coordinates[0],
            vehiclePositionDegree:0,
        };
    }

    componentDidMount() {
        let index = 1;
         TimerMixin.setInterval(
             () => {
                 if(index === this.props.route.geometry.coordinates.length){
                     index = 1;
                     this.setState({vehiclePosition: this.props.route.geometry.coordinates[0]})
                 }
                 let nextPosition = Object.assign({}, this.props.route.geometry.coordinates[index++]);
                 let currentPos = Object.assign({}, this.state.vehiclePosition);
                 this.setState({vehiclePosition: nextPosition,vehiclePositionDegree: geoLib.getBearing(currentPos,nextPosition)});
                 },
             900
         );

    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.props.route.geometry.coordinates}
                strokeColor={this.props.route.color}
                strokeWidth={2}>
            </MapView.Polyline>
        )
    }

    render() {
        let renderRoutes = this.renderRoutes();
        let boundingBoxCoordinates = this.boundingBox();
        return (
            <Map boundingBoxC={boundingBoxCoordinates} showLocationButton={true}>
                <AllRoutes renderRoutes={renderRoutes}/>
                <MapView.Marker
                    rotation={this.state.vehiclePositionDegree}
                    coordinate={this.state.vehiclePosition}
                    image={require('../img/van-top-view.png')}
                />
            </Map>
        );
    }
}

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
