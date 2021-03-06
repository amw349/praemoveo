/**
 * Created by Edxe on 7/17/17.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Animated,
    Dimensions,
    Alert,
    Easing,
    BackHandler,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";
import {FONT_SIZE, FONT_WEIGHT} from "../styles/AppStyles";
import AppText from "../components/text/AppText";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, {Circle} from "react-native-svg";
import RouteIdentifier from "../components/RouteIdentifier"

export default class SelectRoute extends Component {

    props: {
        borderWidth: 3,
        borderRadius: 1,
    };

    stateArray = [];

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        let {height, width} = Dimensions.get('window');

        const {params} = this.props.navigation.state;

        for (let i = 0; i < params.routes.length; i++) {
            this.stateArray[params.routes[i].id] = params.routes[i].favorite;
        }


        //Negative to reduce animation time
        //Posivite to add animation time
        //Max negative number is -500

        let animationTimer = -350;

        this.state = {
            slide: new Animated.Value(height),
            opacity: new Animated.Value(0),
            filterInputOpacity: new Animated.Value(0),
            //width: new Animated.Value(width * 0.5),
            width: new Animated.Value(width),
            textTranslate: new Animated.Value(0),
            closed: false,
        };


        this.slideIn = Animated.timing(
            this.state.slide, {
                toValue: 0,
                duration: 800 + animationTimer,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.slideOut = Animated.timing(
            this.state.slide, {
                toValue: height,
                duration: 800 + animationTimer,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.textSlideUp = Animated.timing(
            this.state.textTranslate, {
                toValue: -70,
                duration: 900 + animationTimer,
                delay: 600,
                easing: Easing.in(Easing.easing)
            }
        );

        this.textSlideDown = Animated.timing(
            this.state.textTranslate, {
                toValue: 0,
                duration: 600 + animationTimer,
                delay: 0,
                easing: Easing.in(Easing.easing)
            }
        );

        this.fadeIn = Animated.timing(
            this.state.opacity, {
                toValue: 0.8,
                duration: 1300 + animationTimer,
                delay: 0
            }
        );

        this.expand = Animated.timing(
            this.state.width, {
                toValue: width,
                duration: 800 + animationTimer,
                delay: 0
            }
        );


        this.fadeOut = Animated.timing(
            this.state.opacity, {
                toValue: 0,
                duration: 500 + animationTimer,
                delay: 100
            }
        );

        this.filterInputFade = Animated.timing(
            this.state.filterInputOpacity, {
                toValue: .7,
                duration: 300,
                delay: 500
            }
        );

        this.filterInputFadeOut = Animated.timing(
            this.state.filterInputOpacity, {
                toValue: 0,
                duration: 200,
                delay: 100
            }
        );
    };


    reRenderPage(itemId) {
        this.stateArray[itemId] = !this.stateArray[itemId];
        this.forceUpdate();
    }


    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <View style={{flexDirection: 'row', height: 53, backgroundColor: 'white'}} id={item.id}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                    <RouteIdentifier color={item.color}/>
                </View>
                <View style={{flex: 3 / 5, flexDirection: 'column', justifyContent: 'center'}}>
                    <AppText size={FONT_SIZE.large}>{item.fullName}</AppText>
                    <AppText size={FONT_SIZE.small}>Sale cada {item.interval}</AppText>
                </View>
                <TouchableWithoutFeedback onPress={() => this.reRenderPage(item.id)}>
                    <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                        {this.stateArray[item.id] ? <Ionicons name='ios-star' size={18}/> :
                            <Ionicons name='ios-star-outline' size={18}/>}
                    </View>
                </TouchableWithoutFeedback>
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
                                            onPress={() => this.props.navigation.navigate('InRouteToDestination', {selectedRoute: item})}>
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.closeWindow(this.props.navigation);
        });
        Animated.parallel([
            this.slideIn,
            this.fadeIn,
            //this.expand,
            this.textSlideUp,
            this.filterInputFade,

        ]).start();
    }

    closeWindow(navigation) {
        if (!this.state.closed) {
            this.setState({closed: !this.state.closed});
            navigation.state.params.toggleModal();
            Animated.parallel([
                this.slideOut,
                this.fadeOut,
                this.textSlideDown,
                this.filterInputFadeOut
            ]).start(() => navigation.goBack());
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                {/*     <View style={{flex:1,
                 marginLeft: 16,
                 marginRight: 16,
                 zIndex: 1003,
                 justifyContent: 'center',
                 ...StyleSheet.absoluteFillObject,
                 top:98,
                 flexDirection: 'row',}}>
                 <TextInput
                 style={{
                 height: 30,
                 flex:1,
                 borderRadius: 2,
                 backgroundColor:'#fff',
                 borderWidth:2,
                 borderColor:'#F4F4F4',
                 textAlign: 'left',
                 paddingLeft:70,
                 fontFamily: FONT_WEIGHT.light,
                 fontSize: FONT_SIZE.large
                 }}
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
                 maxLength={20}
                 />
                 </View>*/}
                <Animated.View style={{opacity: this.state.opacity, backgroundColor: "#FFF"}}>
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
                        <View style={{flexDirection: 'row', height: 38, padding: 12, backgroundColor: '#f7f7f7'}}>
                            <View style={{flex: 1}}>
                                <AppText size={FONT_SIZE.large}>Total de Rutas</AppText>
                            </View>
                            <View style={{flex: 1}}>
                                <AppText size={FONT_SIZE.small}
                                         style={{textAlign: 'right'}}>{params.routes.length} resultados</AppText>
                            </View>
                        </View>
                        <FlatList style={{backgroundColor: '#f7f7f7'}}
                                  data={params.routes}
                                  keyExtractor={this._keyExtractor}
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
