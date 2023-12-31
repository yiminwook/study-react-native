import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

interface DismissKeyboardViewProps extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

function DismissKeyboardView({
  children,
  style,
  ...props
}: DismissKeyboardViewProps) {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss} //input 외부를 클릭하면 키보드가 내려감
      accessible={false} //스크린리더기가 인식하지 못하도록
    >
      <KeyboardAvoidingView
        {...{
          behavior: Platform.OS === 'android' ? 'position' : 'padding',
          ...props,
        }}
        style={style}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboardView;
