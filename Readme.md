## node -v 16.20.0

## java -version 11.0.21

# RN

1. metro.config.js resolve "cjs", "mjs"
   https://stackoverflow.com/questions/72209822/immer-error-when-using-redux-toolkit-with-react-native-ios

2. codegen ios 12 patch package
   https://velog.io/@mingbee611/RN-value-is-unavailable-introduced-in-iOS-12.0

3. 빌드 캐시 삭제
   ./gradlew clean

4. import 순서정리 vsCode 단축키
   shift + option + O

# android

inspector - cmd + m

1. gradle 권한 추가
   chmod 755 android/gradlew

2. execution failed for task ':app:processdebugmainmanifest'
   https://borntodevelop.tistory.com/entry/Execution-failed-for-task-appprocessDebugMainManifest

3. Attempt to invoke virtual method'boolean com.facebook.react.uimanager.FabricViewStateManager.hasStateWrappper()
   https://stackoverflow.com/questions/67683149/react-native-build-error-attempt-to-invoke-virtual-methodboolean-com-facebook

4. localhost 주소 http://10.0.2.2

# ios

inspector - cmd + d

1. 'value' is unavailable introduced in ios 12.0
   https://velog.io/@psb7391/RN-Err-value-is-unavailable-introduced-in-ios-12.0

2. 빌드캐시 삭제 (.env config가 바뀌지 않을때)
   xCode shift + cmd + k 로 빌드파일 삭제
