/**
 * Created by Edxe on 7/17/17.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Animated,
    Dimensions,
    Easing,
    TextInput
} from "react-native";
import PropTypes from "prop-types";
import {FONT_SIZE, FONT_WEIGHT} from "../styles/AppStyles";
import AppText from "../components/text/AppText";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, {Circle} from "react-native-svg";

export default class SelectRoute extends Component {

    props: {
        borderWidth: 3,
        borderRadius: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        let {height, width} = Dimensions.get('window');

        this.state = {
            slide: new Animated.Value(height),
            opacity: new Animated.Value(0),
            inputOpacity: new Animated.Value(0),
            width: new Animated.Value(width * 0.50),
            textTranslate: new Animated.Value(0)
        };


        this.slideIn = Animated.timing(
            this.state.slide, {
                toValue: 0,
                duration: 800,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.textSlideUp = Animated.timing(
            this.state.textTranslate, {
                toValue: -50,
                duration: 900,
                delay: 600,
                easing: Easing.in(Easing.easing)
            }
        );

        this.textSlideDown = Animated.timing(
            this.state.textTranslate, {
                toValue: 0,
                duration: 600,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 0.8,
                duration: 1300,
                delay: 0
            }
        );

        this.expand = Animated.timing(
            this.state.width, {
                toValue: width,
                duration: 800,
                delay: 0
            }
        );

        this.slideOut = Animated.timing(
            this.state.slide, {
                toValue: height,
                duration: 500,
                delay: 600,
                easing: Easing.in(Easing.easing)
            }
        );

        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 500,
                delay: 600
            }
        );

        this.inputFade = Animated.timing(
            this.state.inputOpacity, {
                toValue: 1,
                duration: 800,
                delay: 600
            }
        );
    };

    _renderItem = ({item}) => (
        <View style={{flexDirection: 'row', height: 53, backgroundColor: 'white'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Svg height="30" width="30">
                        <Circle cx="15" cy="15" r="7.5" fill="none" stroke={item.color} strokeWidth="5"/>
                    </Svg>
                </View>
                <View style={{flex: 3 / 5, flexDirection: 'column', justifyContent: 'center'}}>
                    <AppText size={FONT_SIZE.large}>{item.fullName}</AppText>
                    <AppText size={FONT_SIZE.small}>Sale cada {item.interval}</AppText>
                </View>
                <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                    {item.favorite ? <Ionicons name='ios-star' size={18}/> :
                        <Ionicons name='ios-star-outline' size={18}/>}
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 4 / 5, alignItems: 'center'}}>
                        <AppText size={FONT_SIZE.small} style={{marginTop: 12}}>Próxima llegada</AppText>
                        <AppText style={{marginBottom: 12}}>{item.eta} (en {item.interval})</AppText>
                    </View>
                    <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TouchableHighlight accessibilityTraits="button"
                                            underlayColor='transparent'
                                            onPress={() => this.props.navigation.navigate('SelectTime')}>
                            <Entypo name="chevron-thin-right" size={18} style={{marginRight: 10}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ced0ce"
            }}
            />
        );
    };


    componentDidMount() {
        Animated.parallel([
            this.slideIn,
            this.fadeIn,
            this.expand,
            this.textSlideUp,
            this.inputFade
        ]).start();
    }

    closer(navigation){
        navigation.state.params.toggleModal();
        navigation.goBack();
    }

    closeWindow(navigation) {
            Animated.parallel([
                this.slideOut,
                this.fadeOut,
                this.textSlideDown
            ]).start(() => this.closer(navigation));
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <Animated.View style={{opacity: this.state.opacity, backgroundColor: "#FFF"}}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        style={{
                                            ...StyleSheet.absoluteFillObject,
                                            top: 22,
                                            left: 16,
                                            height: 30,
                                            zIndex: 1002,
                                        }}
                                        onPress={() => this.closeWindow(this.props.navigation)}>
                        <Ionicons name="ios-arrow-round-back" size={40}/>
                    </TouchableHighlight>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, .8)',
                        height: 150
                    }}>
                        <Animated.View
                            style={[styles.destination, {
                                transform: [{translateY: this.state.textTranslate}]
                            }]}>
                            <View>
                                <AppText size={FONT_SIZE.xLarge}>¿A dónde vamos hoy?</AppText>
                            </View>
                        </Animated.View>
                        <View style={{borderBottomWidth: 1, marginTop: 10}}>
                            <TextInput
                                style={{
                                    width: 200,
                                    textAlign: 'center',
                                    fontFamily: FONT_WEIGHT.light,
                                    fontSize: FONT_SIZE.xLarge
                                }}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                maxLength={20}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', height: 38, padding: 12, backgroundColor: '#f7f7f7'}}>
                        <View style={{flex: 1}}>
                            <AppText size={FONT_SIZE.large}>Próximas llegadas</AppText>
                        </View>
                        <View style={{flex: 1}}>
                            <AppText size={FONT_SIZE.small}
                                     style={{textAlign: 'right'}}>{params.routesList.routes.length} resultados</AppText>
                        </View>
                    </View>
                </Animated.View>
                <View style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Animated.View
                        style={[{
                            flex: 1,
                            width: this.state.width,
                            backgroundColor: '#FFF',
                            transform: [{translateY: this.state.slide}]
                        }]}>
                        {this.renderSeparator()}
                        <FlatList style={{backgroundColor: '#f7f7f7'}}
                                  data={params.routesList.routes}
                                  renderItem={this._renderItem}
                                  ItemSeparatorComponent={this.renderSeparator}
                        />
                    </Animated.View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    destination: {
        height: 52,
        backgroundColor: 'transparent',
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

AppRegistry.registerComponent('SelectRoute', () => SelectRoute);
