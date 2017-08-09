/**
 * Created by alexandraward on 7/11/17.
 */
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
import DrawerIcon from './components/DrawerIcon'


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

    componentDidMount() {

    }

    state = {
        modalVisible: false,
        barRef: PropTypes.object,
        drawerRef: PropTypes.object,
        opacity: new Animated.Value(1),
        searchBarOpacity: 1
    };

    toggleModal = () => {
        this.state.barRef.toggleVisible();
        this.state.drawerRef.toggleVisible();
        this.setState({modalVisible: this.state.modalVisible});
    };

    opacity(pressed) {
        this.state.barRef.doFade(pressed);
        this.state.drawerRef.doFade(pressed);
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <DrawerIcon onPress={() => this.props.navigation.navigate('DrawerOpen')}
                            ref={ref => this.state.drawerRef = ref}/>
                <InitiatorBar onPress={() => this.openRouteList()} ref={ref => this.state.barRef = ref}/>
                <AllRoutesContainer metroRoutes={require("./json/routesMetro/routesMetro.json")}
                                    caguasRoutes={require("./json/routesCaguas/routesCaguas")}
                                    mapOpacity={pressed => this.opacity(pressed)}/>
                <View pointerEvents="none" style={{
                    ...StyleSheet.absoluteFillObject,
                    zIndex: 1004,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                }}>
                    <FontAwesome pointerEvents="none" name="map-pin" size={30}/>
                </View>
            </View>
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