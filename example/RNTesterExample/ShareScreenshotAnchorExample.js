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
import { Alert, takeSnapshot, Text, StyleSheet, View } from 'react-native';
import { ActionSheetIOS } from '@expo/react-native-action-sheet';

type State = {|
  text: string,
|};

export default class ShareScreenshotAnchorExample extends React.Component<
  {},
  State,
> {
  state = {
    text: '',
  };

  anchorRef = React.createRef();

  render() {
    return (
      <View>
        <View style={style.anchorRow}>
          <Text style={style.button}>
            Click to show the Share ActionSheet ->
          </Text>
          <Text
            onPress={this.showShareActionSheet}
            style={style.button}
            ref={this.anchorRef}>
            HERE
          </Text>
        </View>
        <Text>{this.state.text}</Text>
      </View>
    );
  }

  showShareActionSheet = async () => {
    try {
      // Take the snapshot (returns a temp file uri)
      const uri = await takeSnapshot('window');
      // Share image data
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: uri,
          excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
        },
        error => Alert.alert('Error', error.message),
        (completed, method) => {
          let text;
          if (completed) {
            text = `Shared via ${method}`;
          } else {
            text = "You didn't share";
          }
          this.setState({ text });
        },
      );
    } catch (e) {
      Alert.alert('Error', e);
    }
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
