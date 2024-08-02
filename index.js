/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import i18n from "./app/languages/i18n";

// adding: react-native-stack navigator
import 'react-native-gesture-handler';


AppRegistry.registerComponent(appName, () =>App);
