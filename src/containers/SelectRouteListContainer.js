/**
 * Created by alexandraward on 7/18/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation'

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Svg, {Circle} from 'react-native-svg';
import SelectRouteListItem from "../components/SelectRouteListItem";

export default class SelectRouteListContainer extends Component {

    props: {
        routes: PropTypes.object,
        borderWidth: 3,
        borderRadius: 1
    };

    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => (
        <View style={{flexDirection: 'row', height: 53}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Svg height="30" width="30">
                        <Circle cx="15" cy="15" r="7.5" fill="none" stroke={item.color} strokeWidth="5"/>
                    </Svg>
                </View>
                <View style={{flex: 3 / 5, flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, fontFamily: 'Helvetica-Light'}}>{item.fullName}</Text>
                    <Text style={{fontSize: 12, fontFamily: 'Helvetica-Light'}}>Sale cada {item.interval}</Text>
                </View>
                <View style={{flex: 1 / 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons name='ios-star-outline' size={18} />
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 4/5, alignItems: 'center'}}>
                        <Text style={{fontSize: 12, fontFamily: 'Helvetica-Light', marginTop: 12}}>Próxima llegada</Text>
                        <Text style={{fontSize: 14, fontFamily: 'Helvetica-Light', marginBottom: 12}}>{item.eta} (en {item.interval})</Text>
                    </View>
                    <View style={{flex: 1/5, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Entypo name="chevron-thin-right" size={18} style={{marginRight: 10}}/>
                    </View>
                </View>
            </View>
        </View>
    );

    renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ced0ce"
            }}
            />
        );
    };

    render() {

        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                    <TouchableHighlight accessibilityTraits="button"
                                        underlayColor='transparent'
                                        style={{...StyleSheet.absoluteFillObject,top:50,left:22,height:30,zIndex:1002,}}
                                        onPress={() => this.props.navigation.goBack()}>

                        <MaterialIcons name="arrow-back" size={30}></MaterialIcons>
                    </TouchableHighlight>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, .2)',
                    height: 150
                }}>
                    <Text>Aguas Buenas</Text>
                </View>
                <View style={{flexDirection: 'row', height: 38, padding: 12}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: 'Helvetica-Light'}}>Próximas llegadas</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'right', fontFamily: 'Helvetica-Light'}}>4 resultados</Text>
                    </View>
                </View>
                {this.renderSeparator()}
                <FlatList
                    data={params.routesList.routes}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>

        );
    }
}

AppRegistry.registerComponent('SelectRouteListContainer', () => SelectRouteListContainer);
