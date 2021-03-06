/**
 * Created by Edxe on 7/21/17.
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Button,Easing,Animated} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Init from './src/Init';
import SelectRoute from './src/screens/SelectRoute';
import About from './src/screens/About';
import RouteInfo from './src/screens/RouteInfo';
import PayConfirmed from './src/screens/PayConfirmed';
import InRouteToDestination from './src/components/InRouteToDestination';
import Pay from './src/screens/Pay'

function forVertical(props) {
    const {layout, position, scene} = props;

    const index = scene.counter;
    const height = layout.initHeight;

    const translateX = 0;
    const translateY = position.interpolate({
        inputRange: ([index - 1, index, index + 1]: Array<number>),
        outputRange: ([height, 0, 0]: Array<number>)
    });

    return {
        opacity: .3,
        transform: [{translateX}, {translateY}]
    };
}


const TransporteUrbano = DrawerNavigator({
    Init: { screen: Init},
    About: { screen: About},

});

const routeNavigation = StackNavigator({
        Home: {screen: TransporteUrbano,},
        InitialRouteSelect: {screen: SelectRoute, mode: 'Modal',},
        InRouteToDestination: {screen: InRouteToDestination},
        RouteInfo: {screen: RouteInfo},
        Pay: {screen: Pay},
        PayConfirmed: {screen: PayConfirmed}
    },
    {
        mode: 'card',
        headerMode: 'none',
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 0, 0],
                });
                // debugger
                /*const opacity = position.interpolate({
                    outputRange: [counter - 1, counter - 0.99, counter],
                    inputRange: [0, 1, 1],
                });*/
                const opacity = position.interpolate({
                    outputRange: [0,0],
                    inputRange: [0,0],
                });

                return { opacity, transform: [{ translateY }] }
            },
        }),
        cardStyle: {
            opacity: 1,
            shadowOpacity: 0,
            backgroundColor: 'transparent',
        },
        navigationOptions: {
            cardStack: {
                gesturesEnabled: true,
            },
        }
    },);

AppRegistry.registerComponent('TransporteUrbano', () => routeNavigation);
