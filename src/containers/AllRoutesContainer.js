/**
 * Created by alexandraward on 7/17/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import AllRoutes from '../components/AllRoutes';
import PropTypes from 'prop-types';

export default class AllRoutesContainer extends Component {

    props: {
        routes: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    renderRoutes() {
        return this.props.routes.routes.map((element) =>
            <MapView.Polyline
                coordinates={element.geometry.coordinates}
                strokeColor={element.properties.color}
                strokeWidth={2}
            />
        );
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <View>
                <AllRoutes renderRoutes={renderRoutes}/>
            </View>
        );
    }
}

AppRegistry.registerComponent('AllRoutesContainer', () => AllRoutesContainer);
