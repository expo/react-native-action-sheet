'use strict';

import React from 'react';
import { ActionSheetIOS, View } from 'react-native';

export default class ActionSheet extends React.Component {
  render() {
    return <View style={{ flex: 1 }}>{React.Children.only(this.props.children)}</View>;
  }

  showActionSheetWithOptions(options, onSelect) {
    const iosOptions = {
      ...options,
      // A null title or message on iOS causes a crash
      title: options.title || undefined,
      message: options.message || undefined,
      icons: undefined,
    };

    ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
  }
}
