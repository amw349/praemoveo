/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
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
        this.offSet = 0;
    }

    componentDidMount() {

    }

    state = {
        modalVisible: false,
        barRef: PropTypes.object,
        drawerRef: PropTypes.object,
        pinRef: PropTypes.object,
        opacity: new Animated.Value(1),
        pinLocation: new Animated.ValueXY(0),
        searchBarOpacity: 1,
        toggledPin: false
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

    pinAnimation() {
        if (this.state.toggledPin) {
            this.slideToTop.start();
        } else {
            this.slideToMiddle.start();
        }
        this.setState({toggledPin: !this.state.toggledPin})
    }

    measure() {
        this.state.pinRef.measure((fx, fy, width1, height1, px, py) => {
            let {width, height} = Dimensions.get('window');
            let aspectRatio = width / height;
            let transX = (width * 0.5) - px;
            let transY = (height * 0.5) - py;
            this.slideToMiddle = Animated.timing(
                this.state.pinLocation, {
                    toValue: {x: transX - (width1 / 2), y: transY - (height1 * aspectRatio)},
                    duration: 500,
                    delay: 0
                }
            );
            this.slideToTop = Animated.timing(
                this.state.pinLocation, {
                    toValue: {x: 0, y: 0},
                    duration: 500,
                    delay: 0
                }
            );
        });
    }

    render() {
        const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);
        return (
            <View style={{flex: 1}}>
                <DrawerIcon onPress={() => this.props.navigation.navigate('DrawerOpen')}
                            ref={ref => this.state.drawerRef = ref}/>
                <InitiatorBar onPress={() => this.openRouteList()} ref={ref => this.state.barRef = ref}/>
                <AllRoutesContainer metroRoutes={require("./json/routesMetro/routesMetro.json")}
                                    caguasRoutes={require("./json/routesCaguas/routesCaguas")}
                                    mapOpacity={pressed => this.opacity(pressed)}/>
                <TouchableWithoutFeedback onPress={() => this.pinAnimation()}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            zIndex: 1004,
                            right: 0,
                            marginRight: 16,
                            flex: 1,
                            top: 150,
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            transform: this.state.pinLocation.getTranslateTransform()
                        }}>
                        <View onLayout={() => this.measure()}
                              ref={ref => this.state.pinRef = ref}
                              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <AnimatedIcon
                                name="map-pin"
                                style={{
                                    fontSize: this.state.pinLocation.y.interpolate({
                                        inputRange: [0, Dimensions.get('window').height/4],
                                        outputRange: [20, 25]
                                    })
                                }}/>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
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