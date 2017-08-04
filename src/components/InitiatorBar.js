/**
 * Created by Edxe on 8/3/17.
 */
'use strict';

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, Animated, TouchableWithoutFeedback} from "react-native";
import {FONT_WEIGHT, FONT_SIZE} from "../styles/AppStyles";
import PropTypes from "prop-types";

export default class InitiatorBar extends Component {

    props : {
        onPress: PropTypes.func,
        placeHolder: PropTypes.string,
        fadeOpacity:PropTypes.number,
    };

    state = {
        barTextPlaceHolder: this.props.placeHolder || 'A dónde vamos hoy?',
        opacity: new Animated.Value(1),
        visible:this.props.visible || true,
        fadeOpacity:this.props.fadeOpacity || 0.2
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

    toggleVisible()  {
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
            <TouchableWithoutFeedback onPress={() =>this.props.onPress()}>
                <Animated.View style={[styles.bar, {opacity: this.state.opacity}]}>
                    <Text style={styles.text}>{this.state.barTextPlaceHolder}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );

    }
}

const styles = StyleSheet.create({
    bar: {
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
    },
    text:{
        fontFamily: FONT_WEIGHT.light,
        fontSize: FONT_SIZE.xLarge,
        color: '#EAEAEA'
    }

});