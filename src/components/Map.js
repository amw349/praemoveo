/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated
} from 'react-native';
import MapView from 'react-native-maps';
import AllRoutes from './AllRoutes';


const screen = Dimensions.get('window'); // returns a {width, height}
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    watchID: ?number = null

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)

                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }

                this.setState({
                    initialPosition: initialRegion,
                    markerPosition: initialRegion
                })
            },
            (error) => alert(JSON.stringify(error)),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            })
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude: lat,
                longitude: long,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA
            }
            this.setState({
                initialPosition: lastRegion,
                markerPosition: lastRegion
            })
        })
    }

    // clearing the watch
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         provider={MapView.PROVIDER_GOOGLE}
                         region={this.state.initialPosition}>
                    <MapView.Marker coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}></View>
                        </View>
                    </MapView.Marker>
                    <AllRoutes />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1001
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
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    }
});


AppRegistry.registerComponent('Map', () => Map);
