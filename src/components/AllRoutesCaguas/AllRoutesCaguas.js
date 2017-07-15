/**
 * Created by alexandraward on 7/14/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated
} from 'react-native';
import MapView from 'react-native-maps';
import routes from '../../json/caguasRoutes/routes';

export default class AllRoutesCaguas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: routes.routes,
            strokeWidth: 2,
        }
    }

    renderRoutes() {
        return this.state.routes.map((element) =>
            <MapView.Polyline
                coordinates={element.geometry.coordinates}
                strokeColor={element.properties.color}
                strokeWidth={this.state.strokeWidth}
            />
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

AppRegistry.registerComponent('AllRoutesCaguas', () => AllRoutesCaguas);
