/**
 * Created by alexandraward on 7/17/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import MapView from 'react-native-maps';
import Map from '../components/Map';
import AllRoutes from '../components/AllRoutes';
import PropTypes from 'prop-types';

export default class AllRoutesContainer extends Component {

    props: {
        metroRoutes: PropTypes.object,
        caguasRoutes: PropTypes.object
    };

    state = {
        routes: this.props.metroRoutes.concat(this.props.caguasRoutes)
    };

    constructor(props) {
        super(props);
    }

    renderRoutes() {
        return this.state.routes.map((element) =>
            <MapView.Polyline
                coordinates={element.geometry.coordinates}
                strokeColor={element.properties.color}
                strokeWidth={2}>
                <MapView.Callout tooltip onPress={(value) => {
                    tooltip = !tooltip
                }}>
                    <Text>{element.fullName}</Text>
                </MapView.Callout>
            </MapView.Polyline>
        );
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <Map>
                <AllRoutes renderRoutes={renderRoutes}/>
            </Map>
        );
    }
}

AppRegistry.registerComponent('AllRoutesContainer', () => AllRoutesContainer);
