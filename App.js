/**
 * Created by Edxe on 7/21/17.
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Button} from "react-native";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import Setup from "./src/Setup";
// import * as screen from './src/screens';
import SelectRouteListContainer from "./src/containers/SelectRouteListContainer";
import About from "./src/screens/About";


function forVertical(props) {
    const {layout, position, scene} = props;

    const index = scene.index;
    const height = layout.initHeight;

    const translateX = 0;
    const translateY = position.interpolate({
        inputRange: ([index - 1, index, index + 1]: Array<number>),
        outputRange: ([height, 0, 0]: Array<number>)
    });

    return {
        // opacity: .3,
        transform: [{translateX}, {translateY}]
    };
}


const TransporteUrbano = DrawerNavigator({
    Map: {screen: Setup,},
    About: {screen: About},
});

const routeNavigation = StackNavigator({
        Home: {screen: TransporteUrbano,},
        InitialRouteSelect: {screen: SelectRouteListContainer, mode: 'Modal',},
    },
    {
        mode: 'card',
        headerMode: 'none',
        // transitionConfig: () => ({ screenInterpolator: forVertical }),
        cardStyle: {
            opacity: 1,
        },
        navigationOptions: {
            cardStack: {
                gesturesEnabled: true,
            },
        }
    },);

AppRegistry.registerComponent('TransporteUrbano', () => routeNavigation);
