'use strict';

import React from 'react';
import { ActionSheetIOS, View, StyleSheet } from 'react-native';

export default class ActionSheet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {React.Children.only(this.props.children)}
      </View>
    );
  }

  showActionSheetWithOptions(options, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions(options, onSelect);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
