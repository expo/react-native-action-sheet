// @flow
import React from 'react';
import { ActionSheetIOS, View } from 'react-native';

export type ActionSheetIOSOptions = {
  title?: ?string;
  options: string[];
  cancelButtonIndex?: number;
  destructiveButtonIndex?: number;
  message?: ?string;
  tintColor?: string;
}

export type onSelectCallback = (buttonIndex: number) => any

export default class ActionSheet extends React.Component<any> {
  showActionSheetWithOptions(options: ActionSheetIOSOptions, onSelect: onSelectCallback) {
    const iosOptions = {
      ...options,
      // A null title or message on iOS causes a crash
      title: options.title || undefined,
      message: options.message || undefined,
    };

    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }

  render() {
    return <View style={{ flex: 1 }}>{React.Children.only(this.props.children)}</View>;
  }
}
