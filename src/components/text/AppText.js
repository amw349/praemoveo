/**
 * Created by alexandraward on 7/27/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import {FONT_SIZE, FONT_WEIGHT} from '../../styles/AppStyles';

export default class AppText extends Component {

    props: {
        weight: PropTypes.string,
        size: PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    state = {
        weight: this.props.weight || FONT_WEIGHT.light,
        size: this.props.size || FONT_SIZE.medium
    };

    render() {
        return (
            <Text style={{
                ...this.props.style,
                fontFamily: this.state.weight,
                fontSize: this.state.size
            }}>{this.props.children}</Text>
        )
    }
}

AppRegistry.registerComponent('AppText', () => AppText);
