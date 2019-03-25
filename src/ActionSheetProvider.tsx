import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import ActionSheet from './ActionSheet';

type Props = {
  icons?: Array<React.ReactNode>;
  tintIcons?: boolean;
  textStyle?: TextStyle;
  titleTextStyle?: TextStyle;
  messageTextStyle?: TextStyle;
  showSeparators?: boolean;
  separatorStyle?: ViewStyle;
  children: any;
};

export default class ActionSheetProvider extends React.Component<Props> {
  static defaultProps = {
    textStyle: {},
    tintIcons: true,
    titleTextStyle: {},
    messageTextStyle: {},
    showSeparators: false,
    separatorStyle: {},
  };

  _actionSheetRef: any;

  getNextValue = (config, propKey) =>
    config[propKey] !== undefined ? config[propKey] : this.props[propKey];
  getNextObject = (config, propKey) => ({ ...this.props[propKey], ...config[propKey] });

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args) => {
        const [config, ...rest] = args;
        const nextConfig = {
          ...config,
          textStyle: this.getNextObject(config, 'textStyle'),
          tintIcons: this.getNextValue(config, 'tintIcons'),
          tintColor: this.getNextValue(config, 'tintColor'),
          titleTextStyle: this.getNextObject(config, 'titleTextStyle'),
          messageTextStyle: this.getNextObject(config, 'messageTextStyle'),
          showSeparators: this.getNextValue(config, 'showSeparators'),
          separatorStyle: this.getNextObject(config, 'separatorStyle'),
        };

        this._actionSheetRef.showActionSheetWithOptions(nextConfig, ...rest);
      },
    };
  }

  render() {
    return (
      <ActionSheet ref={component => (this._actionSheetRef = component)}>
        {React.Children.only(this.props.children)}
      </ActionSheet>
    );
  }
}
