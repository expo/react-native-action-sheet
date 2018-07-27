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
  const options = ['Delete', 'Save', 'Cancel'];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 2;
  
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

## Universal Props

The same options available on https://facebook.github.io/react-native/docs/actionsheetios.html#showactionsheetwithoptions

## Android-Only Props

`textStyle` (Text.propTypes.style, optional): Apply any text style props to the options. If the `tintColor` option is provided, it takes precedence over a color text style prop.

`titleTextStyle` (Text.propTypes.style, optional): Apply any text style props to the title if present.

`messageTextStyle` (Text.propTypes.style, optional): Apply any text style props to the message if present.

`showSeparators`: (boolean, optional; default: false): Show separators between items. On iOS, separators always show so this prop has no effect.

## Try it out

Try it in Expo: https://expo.io/@community/react-native-action-sheet-example

## Usage

[See the example app source](https://github.com/expo/react-native-action-sheet/tree/master/example)
