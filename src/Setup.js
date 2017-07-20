/**
 * Created by alexandraward on 7/11/17.
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight, Animated} from "react-native";
import Map from "./components/Map";
import SideMenu from "react-native-side-menu";
import Menu from "./components/Menu";
import SelectRoute from './components/SelectRouteListItem';
import Animation from "lottie-react-native";
import {StackNavigator} from "react-navigation";
import About from "./screens/About";
import SelectRouteListContainer from './containers/SelectRouteListContainer';

const App = StackNavigator({
    about: { screen: About },
    selectRoute: { screen: SelectRoute },
});

export default class Setup extends Component {

    constructor(props) {
        super(props);
        // this.setAnim = this.setAnim.bind(this);
    }

    // state = {
    //     isOpen: false,
    //     selectedItem: 'About',
    //     progress: new Animated.Value(0),
    //
    // };
    //
    // componentDidMount() {
    //
    // }
    //
    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen,
    //     });
    //     this.state.progress.setValue(0);
    //     Animated.timing(this.state.progress, {
    //         toValue: 1,
    //         duration: 3000,
    //     }).start(({ finished }) => {
    //         if (finished) this.forceUpdate();
    //     });
    // }
    //
    // updateMenuState(isOpen) {
    //     this.setState({isOpen,});
    // }
    //
    // onMenuItemSelected = (item) => {
    //     this.setState({
    //         isOpen: false,
    //         selectedItem: item,
    //     });
    // };
    //
    // setAnim(anim) {
    //     this.animation = anim;
    // }




    render() {
        // const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return (
            //
            // <SideMenu menu={menu} disableGestures={true} isOpen={this.state.isOpen}>
            //     <View onPress={() => this.toggle()}
            //           style={{...StyleSheet.absoluteFillObject,top:0,left:22,height:30,zIndex:1002,}}>
            //         <TouchableHighlight accessibilityTraits="button"
            //                             underlayColor='transparent'
            //                             onPress={() => this.toggle(this.animate)}>
            //             <View>
            //                 <Animation
            //                     ref={this.setAnim}
            //                     speed={1}
            //                     style={{left:-55,top:-10,paddingTop:1,width: 250,height: 150,zIndex:1005,...StyleSheet.absoluteFillObjec}}
            //                     source={require('./lottie/menuButton1.json')}
            //                 />
            //             </View>
            //         </TouchableHighlight>
            //     </View>
            //     <View style={styles.destination}>
            //         <Text style={{...styles.map,fontSize:20,color:'#EAEAEA'}}>¿A donde vamos hoy?</Text>
            //     </View>
            //     <Map />
            // </SideMenu>
            //
            <SelectRouteListContainer routesList={require('./json/routesFormat')} />
    );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'HelveticaNeue-Thin',
        // fontFamilyThin: 'HelveticaNeue-Thin',
        // fontFamilyLight: 'HelveticaNeue-Light',
        // fontFamilyMedium: 'HelveticaNeue-Medium',
    },
    destination: {
        height: 52,
        backgroundColor: 'rgba(42, 54, 59, 0.7)',
        zIndex: 1003,
        marginLeft: 21,
        marginRight: 21,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        ...StyleSheet.absoluteFillObject,
        top: 88
    }

});

AppRegistry.registerComponent('Setup', () => Setup);
