/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import { findNodeHandle, Text, StyleSheet, View } from 'react-native';
import ActionSheetIOS from '@expo/react-native-action-sheet';

const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

type State = {|
  clicked: 'none' | 'Option 0' | 'Option 1' | 'Option 2' | 'Delete' | 'Cancel',
|};

export default class ActionSheetAnchorExample extends React.Component<
  {},
  State,
> {
  state = {
    clicked: 'none',
  };

  anchorRef = React.createRef();

  render() {
    return (
      <View>
        <View style={style.anchorRow}>
          <Text style={style.button}>
            Click there to show the ActionSheet ->
          </Text>
          <Text
            onPress={this.showActionSheet}
            style={style.button}
            ref={this.anchorRef}>
            HERE
          </Text>
        </View>
        <Text>Clicked button: {this.state.clicked}</Text>
      </View>
    );
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      // $FlowFixMe: anchor option isn't used
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        anchor: this.anchorRef.current
          ? findNodeHandle(this.anchorRef.current)
          : undefined,
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      },
    );
  };
}

const style = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: '500',
  },
  anchorRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
