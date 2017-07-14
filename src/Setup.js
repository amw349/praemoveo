/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight, Animated} from "react-native";
import Map from "./components/Map";
import SideMenu from "react-native-side-menu";
import Menu from "./components/Menu";
import Animation from "lottie-react-native";

export default class Setup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }


    state = {
        isOpen: false,
        selectedItem: 'About',
    };

    componentDidMount() {
      /*  Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 100,
        }).start();
        */
        // this.animation.play();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen,});
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    };


    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;

        return (

            <View style={{flex: 1}}>
        {/*        <View style={{flex: 1,zIndex:1005,width: 200,height: 200}}>
                    <Animation
                        ref={animation => {this.animation = animation;}}
                        style={{width: 250,height: 200,zIndex:1005,}}
                        source={require('./lottie/menuButton1.json')}
                    />
                </View>*/}

                <SideMenu menu={menu} disableGestures={true} isOpen={this.state.isOpen}>

                    <View style={{...StyleSheet.absoluteFillObject,
                    top:40,
                    left:22,
                    height:30,
                    zIndex:1002,
                    }}>

                        <TouchableHighlight accessibilityTraits="button"
                                            underlayColor='transparent'
                                            onPress={() => this.toggle()}>
                            <Text >Open Menu</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.ueruigoing}>
                        <Text style={{...styles.map,fontSize:20,color:'#EAEAEA'}}>¿A donde vamos hoy?</Text>

                    </View>
                    <Map />
                </SideMenu>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'HelveticaNeue-Thin',
        // fontFamilyThin: 'HelveticaNeue-Thin',
        // fontFamilyLight: 'HelveticaNeue-Light',
        // fontFamilyMedium: 'HelveticaNeue-Medium',
    },
    ueruigoing: {
        height: 52,
        backgroundColor: 'rgba(69, 69, 69, 0.4)',
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
