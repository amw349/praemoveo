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
            vehicleSpeed: 0,
        };
        this.timer = 'undefined';
        this.index = 0;
        this.totalTime = 0;
        this.addedTime = 0;
    }

    /**
     * As soon as the Render component mounts start the bus script.
     */
    componentDidMount() {
        this.busScript();
    }

    /**
     * The bus script that is in charge of animating the bus.
     * Takes a global index variable to iterate through the JSON of coordinates.
     * Gets the distance between two JSON coordinates using geoLib.getDistance.
     * Since the distance is in meters and we're working with miles, we need to convert miles to meters.
     * Now we have meters per hour, but we need meters per second, so we convert the hours to seconds.
     * Once we have our units converted we use the t (time) = d (distance)/ s (speed) which gives us,
     * timeOfInterpolation which is the time it takes for the bus to travel from Point A to point B in seconds.
     * This variable will be used to calculate how many points we need to create the smooth effect.
     * Since computers work with milliseconds we need to multiply timeOfInterpolation * 1000 to get the time in milliseconds.
     * Once we have the time in milliseconds we divide it by 1000/60, which is the amount of refreshes we want for the smooth effect,
     *
     */

    busScript() {
        TimerMixin.clearInterval(this.loopTimer);
        this.totalTime = this.addedTime;
        if (this.index === this.props.route.geometry.coordinates.length) {
            this.index = 1;
            // Alert.alert(`Trip time in minutes: ${this.minTommss(Math.round(this.totalTime/60 * 1000)/1000)}`);
            this.addedTime = 0;
            this.setState({vehiclePosition: this.props.route.geometry.coordinates[0]})
        }
        let nextPosition = Object.assign({}, this.props.route.geometry.coordinates[this.index++]);
        let currentPos = Object.assign({}, this.state.vehiclePosition);


        let busSpeed = Math.random() * 70 + 20;
        this.setState({vehicleSpeed: busSpeed});
        //Miles per hour converted to Miles per second
        let busSpeedInSeconds = busSpeed / 3600;

        const meterToMile = 1609.34;

        let timeOfInterpolation = geoLib.getDistance(currentPos, nextPosition) / (busSpeedInSeconds * meterToMile);

        let milliSecondsInterpolation = timeOfInterpolation * 1000;
        //Number of points to make it 60fps smooth
        let numberOfPoints = milliSecondsInterpolation / (1000 / 60);

        let points = this.generatePoints(currentPos, nextPosition, numberOfPoints);

        this.loop(points);

        this.addedTime += (timeOfInterpolation);

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

    loop(points) {
        let index = 0;
        this.loopTimer = TimerMixin.setInterval(() => {
            if (points[index]) {
                this.setState({vehiclePosition: points[index++]});
            } else {
                this.busScript();
            }
        }, 0);
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
    minTommss(minutes){
        let sign = minutes < 0 ? "-" : "";
        let min = Math.floor(Math.abs(minutes));
        let sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }
    render() {
        let renderRoutes = this.renderRoutes();
        let boundingBoxCoordinates = this.boundingBox();
        return (
            <View style={{flex:1}}>
                <View style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    top:0,
                    marginTop:15,
                    zIndex: 1005,
                }}>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 20
                    }}>Mph: {Math.round(this.state.vehicleSpeed)}</Text>
                    <Text style={{
                        textAlign:'center',
                        fontSize: 20
                    }}>Trip Time(mins): {this.minTommss(Math.round(this.totalTime/60 * 1000)/1000)}</Text>
                </View>
                <Map boundingBoxC={boundingBoxCoordinates} showLocationButton={true}
                busPosition={this.state.vehiclePosition} busIcon={true}>
                    <AllRoutes renderRoutes={renderRoutes}/>
                    <MapView.Marker
                        rotation={this.state.vehiclePositionDegree}
                        coordinate={this.state.vehiclePosition}
                        image={require('../img/van-top-view.png')}
                    />
                </Map>
            </View>
        );
    }
}

AppRegistry.registerComponent('RenderSelectedRoute', () => RenderSelectedRoute);
