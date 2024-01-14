import { Platform } from 'react-native';
import Config from 'react-native-config';

export const API_URL =
  Platform.OS === 'ios' ? Config.IOS_API_URL : Config.ANDROID_API_URL;
