/**
 * This implementation is only for iOS
 * @flow
 * @format
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionSheetIOS from '../ActionSheetIOS';
import type {
  ActionSheetIOSOptions,
  OnSelectCallback,
} from '../ActionSheetTypes';

type Props = $ReadOnly<{|
  +children?: any,
|}>;

export default class ActionSheet extends React.Component<Props> {
  showActionSheetWithOptions = (
    options: ActionSheetIOSOptions,
    onSelect: OnSelectCallback,
  ): void => {
    const iosOptions: ActionSheetIOSOptions = {
      ...options,
      // A null title or message on iOS causes a crash
      title: options.title || undefined,
      message: options.message || undefined,
    };

    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  };

  render() {
    return (
      <View style={style.container}>
        {React.Children.only(this.props.children)}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
