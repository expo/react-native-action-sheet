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
import { Alert, Text, StyleSheet, View } from 'react-native';
import { ActionSheetIOS } from '@expo/react-native-action-sheet';

type Props = {|
  +url: string,
|};

type State = {|
  text: string,
|};

export default class ShareActionSheetExample extends React.Component<
  Props,
  State,
> {
  state = {
    text: '',
  };

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>{this.state.text}</Text>
      </View>
    );
  }

  showShareActionSheet = () => {
    ActionSheetIOS.showShareActionSheetWithOptions(
      {
        url: this.props.url,
        message: 'message to go with the shared url',
        subject: 'a subject to go in the email heading',
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
  };
}

const style = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: '500',
  },
});
