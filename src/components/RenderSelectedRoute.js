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
            vehiclePositionDegree: 0,
        };
        this.timer = 'undefined';
        this.index = 0;
        this.totalTime = 0;
    }


    componentDidMount() {
        this.busScript();
    }

    loop(points) {
        let index = 0;
        this.loopTimer = TimerMixin.setInterval(() => {
            if (points[index]) {
                this.setState({vehiclePosition: points[index++]});
            } else{
                this.busScript();
            }
        }, 1000 / 60);
    }

    busScript() {
        TimerMixin.clearInterval(this.loopTimer);
        if (this.index === this.props.route.geometry.coordinates.length) {
            this.index = 1;
            // Alert.alert(`${this.totalTime}`);
            this.totalTime = 0;
            this.setState({vehiclePosition: this.props.route.geometry.coordinates[0]})
        }
        let nextPosition = Object.assign({}, this.props.route.geometry.coordinates[this.index++]);
        let currentPos = Object.assign({}, this.state.vehiclePosition);


        let busSpeed = Math.random() * 70;
        //Miles per hour converted to Miles per second
        let busSpeedInSeconds = busSpeed / 3600;

        const meterToMile = 1609.34;

        let timeOfInterpolation = geoLib.getDistance(currentPos, nextPosition) / (busSpeedInSeconds * meterToMile);

        let milliSecondsInterpolation = timeOfInterpolation * 1000;
        this.interpolation = milliSecondsInterpolation;
        //Number of points to make it 60fps smooth
        let numberOfPoints = milliSecondsInterpolation / (1000 / 60);

        this.numberOfPoints = numberOfPoints;

        this.totalTime += milliSecondsInterpolation / 1000;
        let points = this.generatePoints(currentPos, nextPosition, numberOfPoints);
        console.log(`NumberOfPoints: ${Math.ceil(numberOfPoints)}`);
        console.log(points);
        console.log(`Milliseconds: ${milliSecondsInterpolation}`);
        console.log(`TotalTimeSeconds: ${this.totalTime}`);
        console.log('------------------------------------------');

        this.loop(points);

        // let points = this.generatePoints(currentPos, nextPosition, numberOfPoints);
        // this.loop(currentPos, )

        if (milliSecondsInterpolation !== 0)
            this.setState({vehiclePositionDegree: geoLib.getBearing(currentPos, nextPosition)});
    }

    generatePoints(point1, point2, numberOfPoints) {
        let deltLat = point2.latitude - point1.latitude;
        let deltLon = point2.longitude - point1.longitude;
        let stepLat = deltLat / (numberOfPoints + 1);
        let stepLon = deltLon / (numberOfPoints + 1);
        let listOfPoints = [];
        for (let i = 1; i <= numberOfPoints; i++) {
            listOfPoints.push({
                latitude: point1.latitude + stepLat * i,
                longitude: point1.longitude + stepLon * i
            })
        }
        return listOfPoints;
    }

    componentWillUnmount() {
        TimerMixin.clearInterval(this.timer);
        TimerMixin.clearInterval(this.loopTimer);
    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.props.route.geometry.coordinates}
                strokeColor={this.props.route.color}
                geodesic={true}
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
