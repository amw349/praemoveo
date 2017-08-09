/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,

} from 'react-native';
import MapView from 'react-native-maps';
import TouchableItem from "../../node_modules/react-navigation/lib/views/TouchableItem";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const screen = Dimensions.get('window'); // returns a {width, height}
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
import * as mapStyles from "../styles/MapStyles";
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: undefined,
            userPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            onRoute: true
        }
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
                //Check if boundingBox prop has been passed
                //If it has been passed then we want our initial location
                //To be the bounding box, if not then get the user's current position
                if (this.props.boundingBoxC) {
                    this.setState({
                        initialPosition: this.refs.map.fitToCoordinates(this.props.boundingBoxC,
                            {
                                animated: false
                            }),
                        userPosition: initialRegion,
                        markerPosition: initialRegion
                    })
                } else {
                    this.setState({
                        initialPosition: initialRegion,
                        userPosition: initialRegion,
                        markerPosition: initialRegion
                    })
                }
            },
            (error) => alert(JSON.stringify(error)),
            {
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
                //initialPosition: lastRegion,
                userPosition: lastRegion,
                markerPosition: lastRegion
            })
        });

    }

    checkIfOnUserPosition(region) {
        if (JSON.stringify(region) ===
            JSON.stringify(this.state.userPosition)) {
            Alert.alert('HELLO');
        }
    }

    onRegionChange(region) {
        this.setState({initialPosition: region});
    }

    // clearing the watch
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    locationButton() {
        // if (!this.state.onRoute && this.props.boundingBoxC) {
        //     this.refs.map.fitToCoordinates(this.props.boundingBoxC, {
        //         animated: true
        //     });
        // } else {
        //     this.refs.map.animateToRegion(this.state.userPosition,
        //         500);
        // }
        this.refs.map.animateToRegion(this.state.userPosition,
            500);
        this.setState({onRoute: !this.state.onRoute});
    }

    showButton() {
        if (this.props.showLocationButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.locationButton()}>
                    <View style={styles.locationButton}>
                        <SimpleLineIcons name="location-pin" size={25} color="#FFF"/>
                    </View>
                </TouchableOpacity>
            )
        }
    }


    content() {
        let icon = this.showButton();
        if (this.props.mapOpacity) {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback delayPressIn={150}
                                              onPressIn={() => this.props.mapOpacity(true)}
                                              onPressOut={() => this.props.mapOpacity(false)}>
                        <MapView style={styles.map}
                                 ref="map"
                                 showsUserLocation={true}
                                 showsMyLocationButton={false}
                                 showsCompass={false}
                                 customMapStyle={this.mapStyle}
                                 provider={MapView.PROVIDER_GOOGLE}
                                 region={this.state.initialPosition}
                                 onRegionChange={() => this.onRegionChange()}
                                 onRegionChangeComplete={(region) => this.checkIfOnUserPosition(region)}
                        >
                            {this.props.children}
                        </MapView>
                    </TouchableWithoutFeedback>
                    {icon}
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <MapView style={styles.map}
                             ref="map"
                             showsUserLocation={true}
                             showsMyLocationButton={false}
                             showsCompass={false}
                             customMapStyle={this.mapStyle}
                             provider={MapView.PROVIDER_GOOGLE}
                             region={this.state.initialPosition}
                             onRegionChange={() => this.onRegionChange()}
                             onRegionChangeComplete={(region) => this.checkIfOnUserPosition(region)}
                    >
                        {this.props.children}
                    </MapView>
                    {icon}
                </View>
            )
        }
    }


    render() {
        let content = this.content();
        return (
            <View style={{flex: 1}}>
                {content}
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
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    locationButton: {
        width: 50,
        height: 50,
        margin: 20,
        borderRadius: 15,
        backgroundColor:'rgba(42, 54, 59, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        zIndex: 1004
    },
    infoBar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        zIndex: 1004,
        width: '100%',
        height: '25%',
        backgroundColor: '#FFF',
        marginBottom: 30,
    }
});

AppRegistry.registerComponent('Map', () => Map);
