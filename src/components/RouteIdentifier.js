/**
 * Created by scarbone on 8/7/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import PropTypes from "prop-types";
import Svg, {Circle} from "react-native-svg";

export default class RouteIdentifier extends Component {

    props: {
        color: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Svg height="30" width="30">
                <Circle cx="15" cy="15" r="7.5" fill="none" stroke={this.props.color} strokeWidth="5"/>
            </Svg>
        );
    }
}

AppRegistry.registerComponent('RouteIdentifier', () => RouteIdentifier);
