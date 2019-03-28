import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  TouchableWithoutFeedbackProps,
} from 'react-native';

// This TouchableOpacity has the same staic method of TouchableNativeFeedback
class CustomTouchableOpacity extends TouchableOpacity {
  static SelectableBackground = () => ({});
  static SelectableBackgroundBorderless = () => ({});
  static Ripple = (color: string, borderless?: boolean) => ({});
}

const TouchableComponent = Platform.select({
  web: CustomTouchableOpacity,
  default: Platform.Version <= 20 ? CustomTouchableOpacity : TouchableNativeFeedback,
});

type Props = TouchableWithoutFeedbackProps & {
  pressInDelay: number;
  background: any;
};

export default class TouchableNativeFeedbackSafe extends React.Component<Props> {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;

  render() {
    if (TouchableComponent === TouchableNativeFeedback) {
      return (
        <TouchableComponent {...this.props} style={{}}>
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableComponent>
      );
    } else {
      // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
      return <TouchableComponent {...this.props}>{this.props.children}</TouchableComponent>;
    }
  }
}
