# @expo/react-native-action-sheet

[![npm](https://img.shields.io/npm/v/@expo/react-native-action-sheet.svg?style=flat-square)](https://www.npmjs.com/package/@expo/react-native-action-sheet)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/goofi-mobile.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/discord-expo-green?style=flat-square&logo=discord)](https://discord.gg/4gtbPAdpaE)

React Native Action Sheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a pure JS implementation on Android.

| iOS                                                                                                                        | Android                                                                                                                        | Web                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/ios.gif" width="200" height="400"/> | <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/android.gif" width="200" height="400"/> | <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/web.gif" width="400" height="400"/> |

## [Check out the example snack here!](https://snack.expo.dev/@expo-action-sheet/example)

## Installation

```
npm install @expo/react-native-action-sheet
```

or

```
yarn add @expo/react-native-action-sheet
```

## A basic ActionSheet Setup

### 1. Wrap your top-level component with `<ActionSheetProvider />`

ReactNativeActionSheet uses React context to allow your components to invoke the menu. This means your app needs to be wrapped with the `ActionSheetProvider` component first.

```jsx
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function AppContainer() {
  return (
    <ActionSheetProvider>
      <App />
    </ActionSheetProvider>
  );
}
```

### 2. Call the `showActionSheetWithOptions` method with a hook or a higher order component.

```tsx
// Using the provided hook
import { useActionSheet } from '@expo/react-native-action-sheet';

export default Menu() {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ['Delete', 'Save', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: number) => {
      switch (selectedIndex) {
        case 1:
          // Save
          break;

        case destructiveButtonIndex:
          // Delete
          break;

        case cancelButtonIndex:
          // Canceled
      }});
  }

  return (
    <Button title="Menu" onPress={onPress}/>
  )
};
```

Alternatively, any component can use the higher order component to access the context and pass the `showActionSheetWithOptions` as a prop.

```tsx
// Using a Higher Order Component to wrap your component
import { connectActionSheet } from '@expo/react-native-action-sheet';

function Menu({ showActionSheetWithOptions }) {
  /* ... */
}

export default connectActionSheet(Menu);
```

`Menu` component can now access the actionSheet prop as `showActionSheetWithOptions`.

## Options

The goal of this library is to mimic the native iOS and Android ActionSheets as closely as possible.

This library can also be used in the browser with Expo for web.

### Universal Props

| Name                     | Type                       | Description                                                   |
| ------------------------ | -------------------------- | ------------------------------------------------------------- |
| `options`                | array of strings           | A list of button titles **(required)**                        |
| `cancelButtonIndex`      | number                     | Index of cancel button in options                             |
| `cancelButtonTintColor`  | string                     | Color used for the change the text color of the cancel button |
| `destructiveButtonIndex` | number or array of numbers | Indices of destructive buttons in options                     |
| `title`                  | string                     | Title to show above the action sheet                          |
| `message`                | string                     | Message to show below the title                               |
| `tintColor`              | string                     | Color used for non-destructive button titles                  |
| `disabledButtonIndices`  | array of numbers           | Indices of disabled buttons in options                        |

### iOS Only Props

| Name                 | Type   | Description                                                                                                                                                                       |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `anchor`             | number | iPad only option that allows for docking the action sheet to a node. See [ShowActionSheetButton.tsx](/example/ShowActionSheetButton.tsx) for an example on how to implement this. |
| `userInterfaceStyle` | string | The interface style used for the action sheet, can be set to `light` or `dark`, otherwise the default system style will be used.                                                  |

### Custom Action Sheet Only (Android/Web) Props

The below props allow modification of the Android ActionSheet. They have no effect on the look on iOS as the native iOS Action Sheet does not have options for modifying these options.

| Name               | Type                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icons`            | array of required images or icons | Show icons to go along with each option. If image source paths are provided via `require`, images will be rendered for you. Alternatively, you can provide an array of elements such as vector icons, pre-rendered Images, etc.                                                                                                                                                                                                                                     |
| `tintIcons`        | boolean                           | Icons by default will be tinted to match the text color. When set to false, the icons will be the color of the source image. This is useful if you want to use multicolor icons. If you provide your own nodes/pre-rendered icons rather than required images in the `icons` array, you will need to tint them appropriately before providing them in the array of `icons`; `tintColor` will not be applied to icons unless they are images from a required source. |
| `textStyle`        | TextStyle                         | Apply any text style props to the options. If the `tintColor` option is provided, it takes precedence over a color text style prop.                                                                                                                                                                                                                                                                                                                                 |
| `titleTextStyle`   | TextStyle                         | Apply any text style props to the title if present.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `messageTextStyle` | TextStyle                         | Apply any text style props to the message if present.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `autoFocus`        | boolean                           | If `true`, this will give the first option screen reader focus automatically when the action sheet becomes visible. On iOS, this is the default behavior of the native action sheet.                                                                                                                                                                                                                                                                                |
| `showSeparators`   | boolean                           | Show separators between items. On iOS, separators always show so this prop has no effect.                                                                                                                                                                                                                                                                                                                                                                           |
| `containerStyle`   | ViewStyle                         | Apply any view style props to the container rather than use the default look (e.g. dark mode).                                                                                                                                                                                                                                                                                                                                                                      |
| `separatorStyle`   | ViewStyle                         | Modify the look of the separators rather than use the default look.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `useModal`         | boolean                           | Defaults to `false` (`true` if autoFocus is also `true`) Wraps the ActionSheet with a Modal, in order to show in front of other Modals that were already opened ([issue reference](https://github.com/expo/react-native-action-sheet/issues/164)).                                                                                                                                                                                                                  |
| `destructiveColor` | string                            | Modify color for text of destructive option. Defaults to `#d32f2f`.                                                                                                                                                                                                                                                                                                                                                                                                 |

## ActionSheetProvider Props

The following props can be set directly on the `ActionSheetProvider`

| Name                   | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useCustomActionSheet` | boolean | iOS only prop that uses the custom pure JS action sheet (Android/Web version) instead of the native ActionSheetIOS component. Defaults to `false`.                                                                                                                                                                                                                                                                                                                 |
| `useNativeDriver`      | boolean | Windows only option that provides the option to disable the [native animation](https://reactnative.dev/docs/animated#using-the-native-driver) driver for React Native Windows projects targeting _Windows 10 Version-1809 ; Build-10.0.17763.0_ and earlier. `useNativeDriver` is [supported in Version-1903 and later](https://microsoft.github.io/react-native-windows/docs/win10-compat) so if your project is targeting that, you don't need to set this prop. |

```jsx
// example of using useCustomActionSheet on iOS
export default function AppContainer() {
  return (
    <ActionSheetProvider useCustomActionSheet={true}>
      <App />
    </ActionSheetProvider>
  );
}
```

## Callback

The second parameter of the `showActionSheetWithOptions` function is a callback for when a button is selected. The callback takes a single argument which will be the zero-based index of the pressed option. You can check the value against your `cancelButtonIndex` to determine if the action was cancelled or not.

```tsx
function onButtonPress(selectedIndex: number) {
  // handle it!
}
```

## Try it out

Try it in Expo Snack: https://snack.expo.dev/@expo-action-sheet/example.

## Example

See the [example app](https://github.com/expo/react-native-action-sheet/tree/master/example).

### Usage

```
$ cd example
$ yarn

// build simulator
$ yarn ios
$ yarn android

// web
$ yarn web
```

## Development

### Setup

```
$ git clone git@github.com:expo/react-native-action-sheet.git
$ cd react-native-action-sheet
$ yarn
```

### Build

We use [bob](https://github.com/react-native-community/bob).

```
$ yarn build
```

### Lint & Format

```
// tsc
$ yarn type-check

// ESLint + Prettier
$ yarn lint
```
