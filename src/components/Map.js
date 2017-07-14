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
            console.log(screen.width, screen.height)
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
                    <MapView.Marker
                        coordinate={this.state.markerPosition}
                    >
                        <View style={styles.radius}>
                            <View style={styles.marker}></View>
                        </View>
                    </MapView.Marker>
                    <MapView.Polyline
                        coordinates={[
                            {
                                "longitude": -66.045635,
                                "latitude": 18.360138
                            },
                            {
                                "longitude": -66.046385505,
                                "latitude": 18.359497252
                            }
                            ,
                            {
                                "longitude": -66.046385505,
                                "latitude": 18.359497252
                            },
                            {
                                "longitude": -66.046394,
                                "latitude": 18.35949
                            },
                            {
                                "longitude": -66.046267,
                                "latitude": 18.358931
                            },
                            {
                                "longitude": -66.046669,
                                "latitude": 18.357698
                            },
                            {
                                "longitude": -66.053458,
                                "latitude": 18.358053
                            },
                            {
                                "longitude": -66.053691,
                                "latitude": 18.358241
                            },
                            {
                                "longitude": -66.05413,
                                "latitude": 18.360002
                            },
                            {
                                "longitude": -66.054165,
                                "latitude": 18.361272
                            },
                            {
                                "longitude": -66.054871,
                                "latitude": 18.361485
                            },
                            {
                                "longitude": -66.055359,
                                "latitude": 18.362077
                            },
                            {
                                "longitude": -66.060088,
                                "latitude": 18.36529
                            },
                            {
                                "longitude": -66.060932,
                                "latitude": 18.366169
                            },
                            {
                                "longitude": -66.061341,
                                "latitude": 18.366346
                            },
                            {
                                "longitude": -66.062454,
                                "latitude": 18.366368
                            },
                            {
                                "longitude": -66.062943,
                                "latitude": 18.366577
                            },
                            {
                                "longitude": -66.065046,
                                "latitude": 18.369286
                            },
                            {
                                "longitude": -66.066787,
                                "latitude": 18.369699
                            },
                            {
                                "longitude": -66.066492,
                                "latitude": 18.373594
                            },
                            {
                                "longitude": -66.066102,
                                "latitude": 18.375184
                            },
                            {
                                "longitude": -66.065834,
                                "latitude": 18.375936
                            },
                            {
                                "longitude": -66.06429,
                                "latitude": 18.378122
                            },
                            {
                                "longitude": -66.063716,
                                "latitude": 18.381054
                            },
                            {
                                "longitude": -66.062829,
                                "latitude": 18.383071
                            },
                            {
                                "longitude": -66.062821,
                                "latitude": 18.384748
                            },
                            {
                                "longitude": -66.063177,
                                "latitude": 18.385628
                            },
                            {
                                "longitude": -66.062833,
                                "latitude": 18.386698
                            },
                            {
                                "longitude": -66.062885,
                                "latitude": 18.387377
                            },
                            {
                                "longitude": -66.063049,
                                "latitude": 18.387639
                            },
                            {
                                "longitude": -66.06221,
                                "latitude": 18.388774
                            },
                            {
                                "longitude": -66.062784,
                                "latitude": 18.389305
                            },
                            {
                                "longitude": -66.062558,
                                "latitude": 18.389656
                            }
                            ,
                            {
                                "longitude": -66.062534,
                                "latitude": 18.389684
                            },
                            {
                                "longitude": -66.062301,
                                "latitude": 18.390043
                            },
                            {
                                "longitude": -66.062532,
                                "latitude": 18.390337
                            },
                            {
                                "longitude": -66.061933,
                                "latitude": 18.391074
                            },
                            {
                                "longitude": -66.062688,
                                "latitude": 18.390447
                            },
                            {
                                "longitude": -66.0633,
                                "latitude": 18.389697
                            },
                            {
                                "longitude": -66.063132,
                                "latitude": 18.389395
                            },
                            {
                                "longitude": -66.062287,
                                "latitude": 18.388805
                            },
                            {
                                "longitude": -66.063084,
                                "latitude": 18.387604
                            },
                            {
                                "longitude": -66.06292,
                                "latitude": 18.38736
                            },
                            {
                                "longitude": -66.062872,
                                "latitude": 18.386711
                            },
                            {
                                "longitude": -66.063228,
                                "latitude": 18.385635
                            },
                            {
                                "longitude": -66.062866,
                                "latitude": 18.384742
                            },
                            {
                                "longitude": -66.062872,
                                "latitude": 18.383065
                            },
                            {
                                "longitude": -66.063762,
                                "latitude": 18.381064
                            },
                            {
                                "longitude": -66.064339,
                                "latitude": 18.378135
                            },
                            {
                                "longitude": -66.065859,
                                "latitude": 18.375957
                            },
                            {
                                "longitude": -66.066145,
                                "latitude": 18.375187
                            },
                            {
                                "longitude": -66.066623,
                                "latitude": 18.372993
                            },
                            {
                                "longitude": -66.066864,
                                "latitude": 18.369588
                            },
                            {
                                "longitude": -66.065051,
                                "latitude": 18.36919
                            },
                            {
                                "longitude": -66.062867,
                                "latitude": 18.366406
                            },
                            {
                                "longitude": -66.061121,
                                "latitude": 18.366188
                            },
                            {
                                "longitude": -66.060101,
                                "latitude": 18.365196
                            },
                            {
                                "longitude": -66.055438,
                                "latitude": 18.362042
                            },
                            {
                                "longitude": -66.054885,
                                "latitude": 18.361409
                            },
                            {
                                "longitude": -66.054205,
                                "latitude": 18.361177
                            },
                            {
                                "longitude": -66.054261,
                                "latitude": 18.360007
                            },
                            {
                                "longitude": -66.053732,
                                "latitude": 18.357856
                            },
                            {
                                "longitude": -66.046617,
                                "latitude": 18.357598
                            },
                            {
                                "longitude": -66.046146,
                                "latitude": 18.358787
                            },
                            {
                                "longitude": -66.04617,
                                "latitude": 18.359257
                            },
                            {
                                "longitude": -66.046385505,
                                "latitude": 18.359497252
                            }
                            ,
                            {
                                "longitude": -66.046385505,
                                "latitude": 18.359497252
                            },
                            {
                                "longitude": -66.047668,
                                "latitude": 18.360927
                            },
                            {
                                "longitude": -66.048253,
                                "latitude": 18.36186
                            },
                            {
                                "longitude": -66.048931,
                                "latitude": 18.363487
                            },
                            {
                                "longitude": -66.045654,
                                "latitude": 18.364773
                            },
                            {
                                "longitude": -66.043415,
                                "latitude": 18.364669
                            },
                            {
                                "longitude": -66.043579,
                                "latitude": 18.362004
                            },
                            {
                                "longitude": -66.045635,
                                "latitude": 18.360138
                            }
                        ]}

                        strokeColor={'#ff0000'}
                        strokeWidth={2}
                    />
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
    },
    map: {
        flex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute'
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
