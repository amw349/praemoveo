/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Map from './components/Map';

export default class Setup extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Map />
            </View>
        );
    }
}

AppRegistry.registerComponent('Setup', () => Setup);
