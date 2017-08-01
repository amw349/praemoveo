/**
 * Created by Edxe on 7/21/17.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {DrawerNavigator, createNavigationContainer, createNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Setup from './src/Setup';
// import * as screen from './src/screens';
import SelectRouteListContainer from './src/containers/SelectRouteListContainer';
import About from './src/screens/About';


const TransporteUrbano = DrawerNavigator({
    Map: {screen: Setup,},
    InitialRouteSelect: {screen: SelectRouteListContainer},
    About: {screen: About},
});

AppRegistry.registerComponent('TransporteUrbano', () => TransporteUrbano);
