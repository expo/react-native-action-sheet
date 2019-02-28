
# react-native-actionsheet

## Getting started

`$ npm install @expo/react-native-action-sheet --save`

### Mostly automatic installation

`$ react-native link @expo/react-native-action-sheet`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@expo/react-native-actionsheet` and add `EXActionsheet.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libEXActionsheet.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.expo.actionsheet.EXActionsheetPackage;` to the imports at the top of the file
  - Add `new EXActionsheetPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-actionsheet'
  	project(':react-native-actionsheet').projectDir = new File(rootProject.projectDir, 	'../node_modules/@expo/react-native-actionsheet/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-actionsheet')
  	```


## Usage
```javascript
import EXActionsheet from '@expo/react-native-action-sheet';

// TODO: What to do with the module?
EXActionsheet;
```
  