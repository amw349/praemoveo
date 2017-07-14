/**
 * Created by alexandraward on 7/14/17.
 */
/**
 * Created by alexandraward on 7/11/17.
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
import routes from '../routes/routes.json';

export default class AllRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: routes.routes,
            strokeWidth: 2,
        }
    }

    renderRoutes() {
        let routes = [];
        for (i in this.state.routes) {
            routes.push(<MapView.Polyline
                coordinates={this.state.routes[i].geometry.coordinates}
                strokeColor={this.state.routes[i].properties.color}
                strokeWidth={this.state.strokeWidth}
            />);
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
        backgroundColor:'red',
        zIndex:-1
    }
});

AppRegistry.registerComponent('AllRoutes', () => AllRoutes);
