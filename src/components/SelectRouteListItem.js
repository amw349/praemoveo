/**
 * Created by alexandraward on 7/17/17.
 */
/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from 'react';
import PropType from "prop-types";
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';

export default class SelectRouteListItem extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    props:{
        item2Render: PropType.object
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <View style={{flexDirection: 'column', flex: 1/4, backgroundColor: 'skyblue' }}>
                    <Text>User input</Text>
                    {this.props.item2Render}
                </View>
                <View style={{flexDirection: 'column', flex: 3/4, backgroundColor: 'steelblue'}}>
                    <View style={{borderWidth: 2, borderColor: 'blue', flexDirection: 'row'}}>
                        <Text style={{flex: 1, backgroundColor: 'lightgreen'}}>1</Text>
                        <Text style={{flex: 1, backgroundColor: 'darkgreen'}}>2</Text>
                    </View>
                    <View style={{borderWidth: 2, borderColor: 'blue', flexDirection: 'row'}}>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'lightgreen'}}>1</Text>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'darkgreen'}}>2</Text>
                    </View>
                    <View style={{borderWidth: 2, borderColor: 'blue', flexDirection: 'row'}}>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'lightgreen'}}>1</Text>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'darkgreen'}}>2</Text>
                    </View>
                    <View style={{borderWidth: 2, borderColor: 'blue', flexDirection: 'row'}}>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'lightgreen'}}>1</Text>
                        <Text style={{flex: 1, width: 50, height: 50, backgroundColor: 'darkgreen'}}>2</Text>
                    </View>
                </View>
            </View>

            // version: test
            // {/*<View style={{flex: 1, backgroundColor: 'blue'}}>{this.props.renderRoutesList}</View>*/}
        );
    }
}

const styles = StyleSheet.create({});


AppRegistry.registerComponent('SelectRouteListItem', () => SelectRouteListItem);
