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
    Modal
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {FONT_WEIGHT, FONT_SIZE} from "./styles/AppStyles";
import AllRoutesContainer from "./containers/AllRoutesContainer";
import {NavigationActions} from "react-navigation";


export default class Init extends Component {

    constructor(props) {
        super(props);
        // this.setAnim = this.setAnim.bind(this);

        this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 1,
                duration: 800,
                delay: 0
            }
        );

        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 1000,
                delay: 0
            }
        );

    }

    componentDidMount() {

    }

    state = {
        modalVisible: false,
        opacity: new Animated.Value(1)
    };

    toggleModal = () => {
        if (!this.state.modalVisible) {
            this.fadeOut.start();
        } else {
            this.fadeIn.start();
        }
        this.setState({modalVisible: !this.state.modalVisible});
    };

    render() {
        return (
            <View style={{flex: 1}}>
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
                    <Animated.View style={{opacity: this.state.opacity}}>
                        <Ionicons name="ios-menu" size={30}/>
                    </Animated.View>
                </TouchableHighlight>
                <Animated.View style={[styles.destination, {opacity: this.state.opacity}]}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        onPress={() => this.openRouteList()}>
                        <Text
                            style={{
                                ...styles.map,
                                fontFamily: FONT_WEIGHT.light,
                                fontSize: FONT_SIZE.xLarge,
                                color: '#EAEAEA'
                            }}>¿A dónde vamos hoy?</Text>
                    </TouchableHighlight>
                </Animated.View>
                {/*</View>*/}
                <AllRoutesContainer metroRoutes={require("./json/routesMetro/routesMetro")}
                                    caguasRoutes={require("./json/routesCaguas/routesCaguas")}/>
            </View>
        )
    }

    openRouteList = () => {
        // this.props.navigation.navigate('InitialRouteSelect',{routesList:require("./json/routesFormat.json")})
        const navigateAction = NavigationActions.navigate({
            routeName: 'InitialRouteSelect',
            params: {
                routes: require("./json/routesFormat.json"),
                toggleModal: this.toggleModal
            },
        });

        this.props.navigation.dispatch(navigateAction);

        this.toggleModal()
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