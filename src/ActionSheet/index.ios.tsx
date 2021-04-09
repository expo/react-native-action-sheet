import * as React from 'react';

import { ActionSheetIOS, View, ViewProps } from 'react-native';

import { ActionSheetIOSOptions } from '../types';

interface Props {
  readonly children: React.ReactNode;
  readonly pointerEvents?: ViewProps['pointerEvents'];
}

type onSelect = (buttonIndex: number) => void;

export default class ActionSheet extends React.Component<Props> {
  render() {
    return (
      <View pointerEvents={this.props.pointerEvents} style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
      </View>
    );
  }

  showActionSheetWithOptions(dataOptions: ActionSheetIOSOptions, onSelect: onSelect) {
    // ...dataOptions include other keys which use in android and web, thats why `Android-Only options` Crash on IOS
    const { cancelButtonIndex, destructiveButtonIndex, options, tintColor } = dataOptions;
    const iosOptions: ActionSheetIOSOptions = {
      cancelButtonIndex,
      destructiveButtonIndex,
      options,
      tintColor,
      // A null title or message on iOS causes a crash
      title: dataOptions.title || undefined,
      message: dataOptions.message || undefined,
      anchor: dataOptions.anchor || undefined,
      userInterfaceStyle: dataOptions.userInterfaceStyle || undefined,
    };
    // @ts-ignore: Even though ActionSheetIOS supports array of numbers for `destructiveIndex` the types are not yet updated. See https://github.com/facebook/react-native/pull/18254.
    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }
}
