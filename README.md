# react-native-action-sheet [![Slack](https://slack.getexponent.com/badge.svg)](https://slack.getexponent.com)

ActionSheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a JS implementation on Android. Almost a drop in replacement for [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html) except it cannot be called statically.

## Installation
```
npm install @exponent/react-native-action-sheet
```

## A basic ActionSheet Setup

import ActionSheetProvider & connectActionSheet   

```
import { ActionSheetProvider, connectActionSheet } from '@exponent/react-native-action-sheet';
```

wrap your component with `<ActionSheetProvider />`   

```
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

decorate your main component   

```
@connectActionSheet
class App extends React.Component { /* ... */ }
```

access actionSheet method as this.props.showActionSheetWithOptions   
```
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

Try it in Exponent: https://getexponent.com/@community/react-native-action-sheet-example

## Usage

[See the example app source](https://github.com/exponent/react-native-action-sheet/tree/master/example)
