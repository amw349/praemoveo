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
        var routes = [];
        for (i in this.state.routes) {
            routes[i] = <MapView.Polyline
                coordinates={this.state.routes[i].geometry.coordinates}
                strokeColor={this.state.routes[i].properties.color}
                strokeWidth={this.state.strokeWidth}
            />;
        }
        return routes;
    }

    render() {
        let renderRoutes = this.renderRoutes();
        return (
            <View style={styles.container}>
                {renderRoutes}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

AppRegistry.registerComponent('AllRoutesCaguas', () => AllRoutesCaguas);
