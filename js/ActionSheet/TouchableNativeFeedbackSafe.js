/**
 * @flow
 * @format
 */

import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

let TouchableComponent = Platform.select({
  web: TouchableOpacity,
  default: Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback,
});

if (TouchableComponent !== TouchableNativeFeedback) {
  TouchableComponent.SelectableBackground = () => ({});
  TouchableComponent.SelectableBackgroundBorderless = () => ({});
  TouchableComponent.Ripple = (color, borderless) => ({});
}

export default class TouchableNativeFeedbackSafe extends React.Component<any> {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless =
    TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;

  render() {
    if (TouchableComponent === TouchableNativeFeedback) {
      return (
        <TouchableComponent {...this.props}>
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableComponent>
      );
    } else {
      return (
        <TouchableComponent {...this.props}>
          {this.props.children}
        </TouchableComponent>
      );
    }
  }
}
