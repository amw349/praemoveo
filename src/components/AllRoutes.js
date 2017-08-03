/**
 * Created by alexandraward on 7/17/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

export default class AllRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this.props.renderRoutes}
            </View>
        );
    }
}

AppRegistry.registerComponent('AllRoutes', () => AllRoutes);
