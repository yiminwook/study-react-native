import { AppRegistry } from 'react-native';
import RootLayout from '@app/layout';
import { name as appName } from '/app.json';

AppRegistry.registerComponent(appName, () => RootLayout);
