/**
 * Created by alexandraward on 7/11/17.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Animated,
    Modal,
    Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AllRoutesContainer from "./containers/AllRoutesContainer";
import {NavigationActions} from "react-navigation";
import InitiatorBar from "./components/InitiatorBar";
import PropTypes from "prop-types";


export default class Init extends Component {

    constructor(props) {
        super(props);
        /*this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 1,
                duration: 500,
                delay: 0
            }
        );
        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 600,
                delay: 300
            }
        );*/
    }

    state = {
        modalVisible: false,
        searchBarOpacity: 1,
        barRef: PropTypes.object,
        opacity: new Animated.Value(1),
    };

    toggleModal = () => {
        this.state.barRef.toggleVisible();
        this.setState({modalVisible: this.state.modalVisible});
    };

    opacity(pressed) {
        this.state.barRef.doFade(pressed)
    };

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={() => this.opacity(true)} onPressOut={() => this.opacity(false)}>
                <View style={{flex: 1}}>
                    {/*<!-- burger menu -->*/}
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        style={{
                                        ...StyleSheet.absoluteFillObject,
                                        top: 22,
                                        left: 16,
                                        height: 30,
                                        zIndex: 1002,
                                    }}
                                        onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Animated.View >
                            <Ionicons name="ios-menu" size={30}/>
                        </Animated.View>
                    </TouchableHighlight>
                    {/*<!-- end burger menu -->*/}
                    <InitiatorBar onPress={()=>this.openRouteList()} ref={ref=>this.state.barRef = ref}/>
                    <AllRoutesContainer metroRoutes={[require("./json/routesMetro/C22.json")]} routeSelected={route=>console.log(route)}
                                        caguasRoutes={require("./json/routesCaguas/routesCaguas")}/>
                    <View pointerEvents="none" style={{...StyleSheet.absoluteFillObject,zIndex:1004, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                        <FontAwesome pointerEvents="none" name="map-pin" size={30}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    openRouteList = () => {

        if (!this.state.modalVisible) {
            this.toggleModal();

            const navigateAction = NavigationActions.navigate({
                routeName: 'InitialRouteSelect',
                params: {
                    routes: require("./json/routesFormat.json"),
                    toggleModal: this.toggleModal
                },
            });

            this.props.navigation.dispatch(navigateAction);
        }
    }
}


AppRegistry.registerComponent('Init', () => Init);