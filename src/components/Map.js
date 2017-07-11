/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 37.78825,
                             longitude: -122.4324,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
});


AppRegistry.registerComponent('Map', () => Map);
