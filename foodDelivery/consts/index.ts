import { Platform } from 'react-native';
import Config from 'react-native-config';

export const API_URL =
  Platform.OS === 'ios' ? Config.IOS_API_URL : Config.AND_API_URL;
