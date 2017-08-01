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
import Map from "./components/Map";
import SelectRouteListContainer from './containers/SelectRouteListContainer'
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Setup extends Component {

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

    setModalVisible = (visible) => {
        if (visible) {
            this.fadeOut.start();
        } else {
            this.fadeIn.start();
        }
        this.setState({modalVisible: visible});
    };

    render() {
        return (

            <View style={{flex: 1}}>
                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        top: 50,
                                        left: 22,
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

                                        onPress={() => this.setModalVisible(true)}>
                        <Text style={{...styles.map, fontSize: 20, color: '#EAEAEA'}}>¿A donde vamos hoy?</Text>
                    </TouchableHighlight>
                </Animated.View>
                <Map />
                <Modal animationType={"none"}
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {
                           alert("Modal has been closed.")
                       }}>
                    <SelectRouteListContainer routes={require("./json/routesFormat.json")}
                                              setState={this.setModalVisible}/>
                </Modal>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'HelveticaNeue-Thin',
        // fontFamilyThin: 'HelveticaNeue-Thin',
        // fontFamilyLight: 'HelveticaNeue-Light',
        // fontFamilyMedium: 'HelveticaNeue-Medium',
    },
    destination: {
        height: 52,
        backgroundColor: 'rgba(42, 54, 59, 0.7)',
        zIndex: 1003,
        marginLeft: 21,
        marginRight: 21,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        ...StyleSheet.absoluteFillObject,
        top: 88
    }

});

AppRegistry.registerComponent('Setup', () => Setup);