# react-native-action-sheet [![Slack](https://slack.expo.io/badge.svg)](https://slack.expo.io)

ActionSheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a JS implementation on Android. Almost a drop in replacement for [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html) except it cannot be called statically.

## Installation

```
npm install @expo/react-native-action-sheet
```

## A basic ActionSheet Setup

import ActionSheetProvider & connectActionSheet

```es6
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
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
class App extends React.Component {
  /* ... */
}
```

access actionSheet method as `this.props.showActionSheetWithOptions`

```es6
_onOpenActionSheet = () => {
  // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
  const options = ['Delete', 'Save', 'Cancel'];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 2;

  this.props.showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    buttonIndex => {
      // Do something here depending on the button index selected
    },
  );
};
```

## Options

The goal of this library is to mimic the native iOS and Android ActionSheets as closely as possible.

This library can also be used with on web with Expo.

### Universal Props

The same options available on React Native's [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html#showactionsheetwithoptions) component exist for both iOS and Android in this library.

### Android-Only Props

The below props allow modification of the Android ActionSheet. They have no effect on the look on iOS as the native iOS Action Sheet does not have options for modifying these options.

- `icons` (array of required images or icons; optional): Show icons to go along with each option. If image source paths are provided via `require`, images will be rendered for you. Alternatively, you can provide an array of elements such as vector icons, pre-rendered Images, etc.
- `tintIcons` (boolean; optional; default: `true`): Icons by default will be tinted to match the text color. When set to false, the icons will be the color of the source image. This is useful if you want to use multicolor icons. If you provide your own nodes/pre-rendered icons rather than required images in the `icons` array, you will need to tint them appropriately before providing them in the array of `icons`; `tintColor` will not be applied to icons unless they are images from a required source.
- `textStyle` (Text.propTypes.style; optional): Apply any text style props to the options. If the `tintColor` option is provided, it takes precedence over a color text style prop.
- `titleTextStyle` (Text.propTypes.style; optional): Apply any text style props to the title if present.
- `messageTextStyle` (Text.propTypes.style; optional): Apply any text style props to the message if present.
- `showSeparators`: (boolean; optional; default: false): Show separators between items. On iOS, separators always show so this prop has no effect.
- `separatorStyle`: (View.propTypes.style; optional): Modify the look of the separators rather than use the default look.

## Try it out

Try it in Expo: https://expo.io/@community/react-native-action-sheet-example

## Usage

See the [example app](https://github.com/expo/react-native-action-sheet/tree/master/example) for examples of how to apply different options.
