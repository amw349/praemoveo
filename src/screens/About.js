/**
 * Created by Edxe on 7/14/17.
 */
import React, {Component} from "react";

export default  class About extends Component{

    static navigationOptions = {
        title: 'Sobre Nosotros',
    };


    render(){

        const { navigate } = this.props.navigation;
        return (

            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}