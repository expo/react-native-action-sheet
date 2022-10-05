# @expo/react-native-action-sheet

[![npm](https://img.shields.io/npm/v/@expo/react-native-action-sheet.svg?style=flat-square)](https://www.npmjs.com/package/@expo/react-native-action-sheet)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/goofi-mobile.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/discord-expo-green?style=flat-square&logo=discord)](https://discord.gg/4gtbPAdpaE)

React Native Action Sheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a pure JS implementation on Android.

| iOS                                                                                                                        | Android                                                                                                                        | Web                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/ios.gif" width="200" height="400"/> | <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/android.gif" width="200" height="400"/> | <img  src="https://raw.githubusercontent.com/expo/react-native-action-sheet/master/gif/web.gif" width="400" height="400"/> |

## <img src="data:image/png;base64,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" height="20" width="20" /> [Check out the example snack here!](https://snack.expo.dev/@expo-action-sheet/example)

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

  const onPress() => {
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

### Android/Web-Only Props

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

| Name              | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useNativeDriver` | boolean | Windows only option that provides the option to disable the [native animation](https://reactnative.dev/docs/animated#using-the-native-driver) driver for React Native Windows projects targeting _Windows 10 Version-1809 ; Build-10.0.17763.0_ and earlier. `useNativeDriver` is [supported in Version-1903 and later](https://microsoft.github.io/react-native-windows/docs/win10-compat) so if your project is targeting that, you don't need to set this prop. |

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
