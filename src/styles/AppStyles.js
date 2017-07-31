/**
 * Created by alexandraward on 7/26/17.
 */
'use strict';
import React from 'react';
import {
    AppRegistry,
} from 'react-native';

const FONT_SIZE = {
    xSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 20
};

const FONT_WEIGHT = {
    light: 'Helvetica Light',
    bold: 'Helvetica Bold'
};

AppRegistry.registerComponent('Common', () => Common);

module.exports = {FONT_SIZE, FONT_WEIGHT};