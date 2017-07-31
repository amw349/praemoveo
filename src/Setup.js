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
import Ionicons from "react-native-vector-icons/Ionicons";
import {FONT_WEIGHT, FONT_SIZE} from './styles/AppStyles';

export default class Setup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{...StyleSheet.absoluteFillObject,top:22,left:16,height:30,zIndex:1002,}}
                                    onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                    <Ionicons name="ios-menu" size={30}></Ionicons>
                </TouchableHighlight>
                <View style={styles.destination}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        onPress={() => this.props.navigation.navigate('InitialRouteSelect',{routesList:require("./json/routesFormat.json")})}>
                        <Text style={{...styles.map, fontFamily: FONT_WEIGHT.light, fontSize: FONT_SIZE.xLarge, color:'#EAEAEA'}}>¿A dónde vamos hoy?</Text>
                    </TouchableHighlight>
                </View>

                <Map />
                {/*onPress={() => this.setModalVisible(true)}>*/}
                {/*<Modal animationType={"slide"}
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {alert("Modal has been closed.")}}>
                    <SelectRouteListContainer routes={require("./json/routesFormat.json")}/>
                </Modal>*/}
            </View>
        )
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

AppRegistry.registerComponent('Setup', () => Setup);