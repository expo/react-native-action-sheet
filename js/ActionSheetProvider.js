// @flow
import React from 'react';
import ActionSheet from './ActionSheet';

type Props = {
  textStyle: any,
  tintIcons: boolean,
  tintColor: string,
  titleTextStyle: any,
  messageTextStyle: any,
  showSeparators: boolean,
  separatorStyle: any,
  children: any,
}

export default class ActionSheetProvider extends React.Component<Props> {
  _actionSheetRef: any = null

  static defaultProps = {
    textStyle: {},
    tintIcons: true,
    titleTextStyle: {},
    messageTextStyle: {},
    showSeparators: false,
    separatorStyle: {},
  };

  // $FlowFixMe
  getNextValue = (config, propKey) => config[propKey] !== undefined ? config[propKey] : this.props[propKey];
  // $FlowFixMe
  getNextObject = (config, propKey) => ({...this.props[propKey], ...config[propKey]});

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
      // $FlowFixMe
      <ActionSheet ref={component => (this._actionSheetRef = component)}>
        {React.Children.only(this.props.children)}
      </ActionSheet>
    );
  }
}
