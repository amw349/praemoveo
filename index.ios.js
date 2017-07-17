/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Setup from './src/Setup';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

export default class TransporteUrbano extends Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <Setup />
      </View>
    );
  }
}

AppRegistry.registerComponent('TransporteUrbano', () => TransporteUrbano);


