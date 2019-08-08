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

  showActionSheetWithOptions(options: ActionSheetIOSOptions, onSelect: onSelect) {
    const iosOptions: ActionSheetIOSOptions = {
      ...options,
      // A null title or message on iOS causes a crash
      title: options.title || undefined,
      message: options.message || undefined,
    };
    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }
}
