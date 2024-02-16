import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

interface DismissKeyboardViewProps extends KeyboardAwareScrollViewProps {
  children: React.ReactNode;
}

export default function DismissKeyboardView({
  children,
  style,
  ...props
}: DismissKeyboardViewProps) {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss} //input 외부를 클릭하면 키보드가 내려감
      accessible={false} //스크린리더기가 인식하지 못하도록
    >
      <KeyboardAwareScrollView {...props} style={style}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
