/**
 * Created by Edxe on 8/3/17.
 */
'use strict';

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, TouchableHighlight, Animated, TouchableWithoutFeedback} from "react-native";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";


export default class InitiatorBar extends Component {

    props: {
        onPress: PropTypes.func,
        fadeOpacity: PropTypes.number,
    };

    state = {
        opacity: new Animated.Value(1),
        visible: this.props.visible || true,
        fadeOpacity: this.props.fadeOpacity || 0.2
    };


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
                duration: 600,
                delay: 300
            }
        );
    }

    doFade(fade: PropTypes.bool) {
        if (fade) {
            this.state.opacity.setValue(this.state.fadeOpacity);
        } else {
            this.state.opacity.setValue(1);
        }
    };

    toggleVisible() {
        if (this.state.visible) {
            this.fadeOut.start();
            this.setState({visible: !this.state.visible});
        } else {
            this.fadeIn.start();
            this.setState({visible: !this.state.visible});
        }
    };


    render() {

        return (
            <TouchableHighlight accessibilityTraits="button"
                                underlayColor='transparent'
                                style={styles.touchable}
                                onPress={() => this.props.onPress()}>
                <Animated.View style={{opacity: this.state.opacity}}>
                    <Ionicons name="ios-menu" size={30}/>
                </Animated.View>
            </TouchableHighlight>
        );

    }
}

const styles = StyleSheet.create({
    touchable: {
        ...StyleSheet.absoluteFillObject,
        top: 22,
        left: 16,
        height: 30,
        width: 30,
        zIndex: 1002,
    }
});