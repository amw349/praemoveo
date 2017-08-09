/**
 * Created by alexandraward on 7/28/17.
 */
'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, TouchableHighlight, View, Modal, StyleSheet, Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Svg, {Circle} from 'react-native-svg';
import Map from './Map';
import RenderSelectedRoute from './RenderSelectedRoute';
import AppText from './text/AppText';
import {FONT_WEIGHT, FONT_SIZE} from '../styles/AppStyles';

const {width, height} = Dimensions.get('window');

export default class InRouteToDestination extends Component {

    props: {
        selectedRoute: PropTypes.object
    }

    state = {
        modalVisible: false,
        selectedRoute: this.props.navigation.state.params.selectedRoute
    }

    constructor(props) {
        super(props);
        console.log("selected route transferred correctly", props)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight accessibilityTraits="button"
                                    underlayColor='transparent'
                                    style={{
                                        ...StyleSheet.absoluteFillObject,
                                        top: 22,
                                        left: 16,
                                        height: 30,
                                        zIndex: 1002,
                                    }}
                                    onPress={() => this.props.navigation.navigate('InitialRouteSelect')}>
                    <Ionicons name="ios-arrow-round-back" size={40}></Ionicons>
                </TouchableHighlight>
                <RenderSelectedRoute busData={require("../json/ROUTE_33_GO")} route={this.state.selectedRoute} />
                {/* \/\/\/ Everything about the modal view.*/}
                {/*<View style={{*/}
                    {/*position: 'absolute',*/}
                    {/*left: 0,*/}
                    {/*right: 0,*/}
                    {/*flexDirection: 'row',*/}
                    {/*flex: 0.1,*/}
                    {/*bottom: -10,*/}
                    {/*width: 367,*/}
                    {/*height: 67,*/}
                    {/*marginHorizontal: 4,*/}
                    {/*borderWidth: 2,*/}
                    {/*borderColor: 'red',*/}
                    {/*backgroundColor: 'white',*/}
                    {/*zIndex: 10003*/}
                {/*}}>*/}
                    {/*<Modal*/}
                        {/*animationType={"slide"}*/}
                        {/*transparent={false}*/}
                        {/*visible={this.state.modalVisible}*/}
                        {/*onRequestClose={() => {*/}
                            {/*alert("Modal has been closed.")*/}
                        {/*}}*/}
                        {/*style={{zIndex: 1003}}*/}
                    {/*>*/}
                        {/*<View style={{marginTop: 20}}>*/}
                            {/*<View>*/}
                                {/*<TouchableHighlight onPress={() => {*/}
                                    {/*this.setModalVisible(!this.state.modalVisible)*/}
                                {/*}}>*/}
                                    {/*<Entypo name="chevron-thin-down" size={18}/>*/}
                                {/*</TouchableHighlight>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</Modal>*/}

                    {/*<TouchableHighlight onPress={() => {*/}
                        {/*this.setModalVisible(true)*/}
                    {/*}}>*/}
                        {/*<View style={{flex: 1, flexDirection: 'row'}}>*/}
                            {/*/!*<View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>*!/*/}
                                {/*/!*<Svg height="30" width="30">*!/*/}
                                    {/*/!*<Circle cx="15" cy="15" r="7.5" fill="none" stroke={this.state.selectedRoute.color} strokeWidth="5"/>*!/*/}
                                {/*/!*</Svg>*!/*/}
                            {/*/!*</View>*!/*/}
                            {/*/!*<View style={{flex: 3 / 5, flexDirection: 'column', justifyContent: 'center'}}>*!/*/}
                                {/*/!*<AppText size={FONT_SIZE.large}>{this.state.selectedRoute.fullName}</AppText>*!/*/}
                                {/*/!*<AppText size={FONT_SIZE.small}>Sale cada {this.state.selectedRoute.interval}</AppText>*!/*/}
                            {/*/!*</View>*!/*/}
                            {/*/!*<View>*!/*/}
                                {/*/!*{this.state.selectedRoute.favorite ? <Ionicons name='ios-star' size={18}/> :*!/*/}
                                    {/*/!*<Ionicons name='ios-star-outline' size={18}/>}*!/*/}
                            {/*/!*</View>*!/*/}
                        {/*</View>*/}
                    {/*</TouchableHighlight>*/}
                {/*</View>*/}
            </View>
        );
    }
}

AppRegistry.registerComponent('InRouteToDestination', () => InRouteToDestination);
