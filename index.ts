import {AppRegistry} from 'react-native';
import {initializePresentationLayer} from './src/presentation/PresentationLayer';
// @ts-ignore
import {name as appName} from './app.json';
import {initializeDomainLayer} from './src/domain/DomainLayer';
import {initializeDataLayer} from './src/data/DataLayer';

initializeDataLayer();
const {store} = initializeDomainLayer();
const App = initializePresentationLayer(store);

AppRegistry.registerComponent(appName, () => App);
