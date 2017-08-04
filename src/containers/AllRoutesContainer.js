/**
 * Created by alexandraward on 7/17/17.
 */
'use strict';
import React, {Component} from "react";
import {AppRegistry, View, Text,TouchableOpacity,StyleSheet} from "react-native";
import MapView from "react-native-maps";
import Map from "../components/Map";
import AllRoutes from "../components/AllRoutes";
import PropTypes from "prop-types";

export default class AllRoutesContainer extends Component {

    props: {
        metroRoutes: PropTypes.object,
        caguasRoutes: PropTypes.object,
        routeSelected: PropTypes.func
    };

    state = {
        routes: this.props.metroRoutes,
        routeDesc: PropTypes.string,
        mapRef:PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    onPress(route){
        // this.props.routeSelected(route);
        // this.route.onPress(){
            // debugger;
            console.log(">>>>"+route);



    };

    renderRoutes() {
        return this.state.routes.map((element) =>
            <MapView.Polyline
                coordinates={element.geometry.coordinates}
                strokeColor={element.properties.color}
                onPress={() => this.onPress( element)}
                strokeWidth={5}>

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
