'use strict';

import React from 'react';
import {
  ActionSheetIOS,
  View,
} from 'react-native';

export default class ActionSheet extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {React.Children.only(this.props.children)}
      </View>
    );
  }

  showActionSheetWithOptions(options, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions(options, onSelect);
  }
}
