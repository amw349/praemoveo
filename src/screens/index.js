/**
 * Created by Edxe on 7/17/17.
 */
import { Navigation } from 'react-native-navigation';

import About from "./About"
import SelectRoute from "./SelectRoute"


export function registerScreens() {
    Navigation.registerComponent('screen.About', () => About);
    Navigation.registerComponent('screen.SelectRoute', () => SelectRoute);
}