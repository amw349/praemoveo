/**
 * Created by Edxe on 7/21/17.
 */



import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setup from './src/Setup';
// import * as screen from './src/screens';
import SelectRoute from './src/screens/SelectRoute';
import About from './src/screens/About';
import SelectTime from './src/components/SelectTime';

/*export default class TransporteUrbano extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Setup />
            </View>
        );
    }
}*/

const TransporteUrbano = DrawerNavigator({
    Map: { screen: Setup},
    InitialRouteSelect: { screen: SelectRoute},
    About: { screen: About},
    SelectTime: { screen: SelectTime}
});

AppRegistry.registerComponent('TransporteUrbano', () => TransporteUrbano);
