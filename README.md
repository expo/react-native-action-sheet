# react-native-action-sheet [![Slack](http://slack.exponentjs.com/badge.svg)](http://slack.exponentjs.com)

ActionSheet is a cross-platform React Native component that uses the native UIActionSheet on iOS and a JS implementation on Android. Almost a drop in replacement for [ActionSheetIOS](https://facebook.github.io/react-native/docs/actionsheetios.html) except it cannot be called statically.

## Installation
```
npm install @exponent/react-native-action-sheet
```

## Usage

Wrap your entire app in `ActionSheet`. We recommend using [context](https://facebook.github.io/react/docs/context.html) to pass `ActionSheet` to the rest of your app.

```js
class MainApp extends React.Component {

  static childContextTypes = {
    actionSheet: PropTypes.func,
  };

  getChildContext() {
    return {
      actionSheet: () => this._actionSheetRef,
    };
  }

  render() {
    return (
      <ActionSheet ref={component => this._actionSheetRef = component}>
        // Render the rest of your app here.
      </ActionSheet>
    );
  }
}
```

To open the action sheet:

```js
class OtherComponent extends React.Component {

  static contextTypes = {
    actionSheet: PropTypes.func,
  };

  _onOpenActionSheet() {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    let options = ['Delete', 'Save', 'Cancel'];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 2;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      // Do something here
    });
  }
}
```
