# react-native-action-sheet [![Slack](https://slack.expo.io/badge.svg)](https://slack.expo.io)

ActionSheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a JS implementation on Android. Almost a drop in replacement for [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html) except it cannot be called statically.

## Installation
```
npm install @expo/react-native-action-sheet
```

## A basic ActionSheet Setup

import ActionSheetProvider & connectActionSheet

```es6
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
```

wrap your top-level component with `<ActionSheetProvider />`

```es6
class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <App />
      </ActionSheetProvider>
    );
  }
}
```

decorate the component you want to use the action sheet with `@connectActionSheet`

```es6
@connectActionSheet
class App extends React.Component { /* ... */ }
```

access actionSheet method as `this.props.showActionSheetWithOptions`

```es6
_onOpenActionSheet = () => {
  // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
  let options = ['Delete', 'Save', 'Cancel'];
  let destructiveButtonIndex = 0;
  let cancelButtonIndex = 2;
  
  this.props.showActionSheetWithOptions({
    options,
    cancelButtonIndex,
    destructiveButtonIndex,
  },
  (buttonIndex) => {
    // Do something here depending on the button index selected
  });

}
```


## Try it out

Try it in Expo: https://expo.io/@community/react-native-action-sheet-example

## Usage

[See the example app source](https://github.com/expo/react-native-action-sheet/tree/master/example)
