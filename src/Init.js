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
import {FONT_WEIGHT, FONT_SIZE} from "./styles/AppStyles";
import AllRoutesContainer from "./containers/AllRoutesContainer";
import {NavigationActions} from "react-navigation";


export default class Init extends Component {

    constructor(props) {
        super(props);
        this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 1,
                duration: 500,
                delay: 0
            }
        );
        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 500,
                delay: 600
            }
        );
    }

    componentDidMount() {

    }

    state = {
        modalVisible: false,
        opacity: new Animated.Value(1),
        searchBarOpacity: 1
    };

    toggleModal = () => {
        if (!this.state.modalVisible) {
            this.fadeOut.start();
            this.setState({modalVisible: !this.state.modalVisible});
        } else {
            this.fadeIn.start();
            this.setState({modalVisible: !this.state.modalVisible});
        }
    };

    opacity(pressed) {
        if (pressed) {
            this.state.opacity.setValue(0.2);
        } else {
            this.state.opacity.setValue(1);
        }
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
                                            width: 30,
                                            zIndex: 1002,
                                        }}
                                        onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Animated.View style={{opacity: this.state.opacity}}>
                            <Ionicons name="ios-menu" size={30}/>
                        </Animated.View>
                    </TouchableHighlight>
                    {/*<!-- end burger menu -->*/}
                    <TouchableWithoutFeedback onPress={() => this.openRouteList()}>
                        <Animated.View style={[styles.destination, {opacity: this.state.opacity}]}>
                            <Text
                                style={{
                                    ...styles.map,
                                    fontFamily: FONT_WEIGHT.light,
                                    fontSize: FONT_SIZE.xLarge,
                                    color: '#EAEAEA'
                                }}>¿A dónde vamos hoy?</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    {/*</View>*/}
                    <AllRoutesContainer metroRoutes={require("./json/routesMetro/routesMetro")}
                                        caguasRoutes={require("./json/routesCaguas/routesCaguas")}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    openRouteList = () => {
        // this.props.navigation.navigate('InitialRouteSelect',{routesList:require("./json/routesFormat.json")})

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

const styles = StyleSheet.create({
    destination: {
        height: 52,
        backgroundColor: 'rgba(42, 54, 59, 0.7)',
        zIndex: 1003,
        marginLeft: 16,
        marginRight: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        ...StyleSheet.absoluteFillObject,
        top: 88
    }

});

AppRegistry.registerComponent('Init', () => Init);