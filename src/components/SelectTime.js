/**
 * Created by alexandraward on 7/27/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {FontSize, FontWeight} from '../styles/AppStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SelectTime extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={styles.statusBar}>Select Time screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        marginTop: 20
    }
});

AppRegistry.registerComponent('SelectTime', () => SelectTime);
