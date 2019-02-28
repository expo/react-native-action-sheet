/**
 * @format
 * @flow
 */

import * as React from 'react';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import ActionSheet from './ActionSheet';
import type { ActionSheetOptions } from './ActionSheet';

type Props = $ReadOnly<{|
  +tintIcons?: boolean,
  +tintColor?: string,
  +textStyle?: TextStyleProp,
  +titleTextStyle?: TextStyleProp,
  +messageTextStyle?: TextStyleProp,
  +showSeparators?: boolean,
  +separatorStyle?: ViewStyleProp,
  +children: any,
|}>;

export default class ActionSheetProvider extends React.Component<Props> {
  static childContextTypes = {
    showActionSheetWithOptions: Function,
  };

  static defaultProps = {
    textStyle: {},
    tintIcons: true,
    titleTextStyle: {},
    messageTextStyle: {},
    showSeparators: false,
    separatorStyle: {},
  };

  _actionSheetRef: any;

  // TODO: we should make more strict annotation
  getNextValue = (config: ActionSheetOptions, propKey: any): any =>
    config[propKey] !== undefined ? config[propKey] : this.props[propKey];

  // TODO: we should make more strict annotation
  getNextObject = (config: ActionSheetOptions, propKey: any): any => ({
    ...this.props[propKey],
    ...config[propKey],
  });

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args: any) => {
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
