/**
 * Created by alexandraward on 8/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

export default class RenderRoutes extends Component {
    props: {
        routes: PropTypes.object,
        busData: PropTypes.object,
        strokeWidth: PropTypes.number
    };

    state = {
        routes: this.props.routes,
        strokeWidth: this.props.strokeWidth || 3
    };

    constructor(props) {
        super(props);
    }

    renderRoutes() {
        return (
            <MapView.Polyline
                coordinates={this.state.routes.geometry.coordinates}
                strokeColor={this.state.routes.color}
                strokeWidth={this.state.strokeWidth}>
            </MapView.Polyline>
        );
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <View>
                {renderRoutes}
            </View>
        );
    }
}

AppRegistry.registerComponent('RenderRoutes', () => RenderRoutes);