/**
 * Created by alexandraward on 7/11/17.
 */
'use strict';
import React, {Component} from "react";
import {AppRegistry, StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Alert,TextInput} from "react-native";
import MapView from "react-native-maps";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import PropTypes from "prop-types";
import * as mapStyles from "../styles/MapStyles";

const screen = Dimensions.get('window'); // returns a {width, height}
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export default class Map extends Component {

    state = {
        mapRef: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
        initialPosition: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        currentPosition: {
            latitude: 0,
            longitude: 0
        },

    };
    }

    watchID: ?number = null;



    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);

                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                this.setState({
                    initialPosition: initialRegion,
                })
            },
            (error) => alert(JSON.stringify(error)),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);

            let lastRegion = {
                latitude: lat,
                longitude: long,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA
            };
            this.setState({
                currentPosition: lastRegion,
                userPosition: lastRegion,
            })
        });

        // debugger
        // let coordinates = this.props.metroRoutes.geometry.coordinates;
        // this.fitToRoute(coordinates);
    }

    // clearing the watch
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    locationButton() {
        this.state.mapRef.animateToRegion(this.state.userPosition,500);
    }

    onRegionChange(region){
        this.setState({currentPosition: region});
        // if (this.props.route) {
        //     this.state.mapRef.fitToCoordinates(this.props.route.geometry.coordinates, {
        //         edgePadding: DEFAULT_PADDING,
        //         animated: true,
        //     });
        // }
    }

    fitToRoute(coordinates: PropTypes.object) {
        console.log("llegue a fit to route");
        console.log("fit to route coords: ", coordinates);
        this.state.mapRef.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }



    render() {
        return (
            <View style={styles.container}>
                <MapView ref={ref=>this.state.mapRef = ref}
                         style={styles.map}
                         onMapReady={() => this.locationButton}
                         showsUserLocation={true}
                         showsMyLocationButton={false}
                         showsCompass={false}
                         customMapStyle={mapStyles.LIGHT}
                         provider={MapView.PROVIDER_GOOGLE}
                         region={this.state.currentPosition}
                         onRegionChange={region => this.onRegionChange(region)}>
                        {this.props.children}
                </MapView>
                <View>
                    <Text>{this.state.currentPosition.latitude}, {this.state.currentPosition.longitude}</Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => this.locationButton()}>
                    <View style={styles.locationButton}>
                        <SimpleLineIcons name="location-pin" size={25} color="#FFF"/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1001
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationButton: {
        width: 50,
        height: 50,
        margin: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(42, 54, 59, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        zIndex: 1004
    },
});

AppRegistry.registerComponent('Map', () => Map);
