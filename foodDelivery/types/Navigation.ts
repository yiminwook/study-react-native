// NativeStackScreenProps<AppStackParamList, T>;

export type AppStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AppTabParmaList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
};

export type DeliveryParamList = {
  Ing: undefined;
  Complete: { orderId: string };
};
