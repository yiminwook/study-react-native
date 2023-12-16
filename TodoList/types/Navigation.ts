import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Main: undefined;
};
