import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from './ActionSheet';

export default class ActionSheetProvider extends React.Component {
  static propTypes = {
    textStyle: PropTypes.object,
    tintIcons: PropTypes.bool,
    tintColor: PropTypes.string,
    titleTextStyle: PropTypes.object,
    messageTextStyle: PropTypes.object,
    showSeparators: PropTypes.bool,
    separatorStyle: PropTypes.object,
    children: PropTypes.any.isRequired,
  };

  static childContextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  static defaultProps = {
    textStyle: {},
    tintIcons: true,
    titleTextStyle: {},
    messageTextStyle: {},
    showSeparators: false,
    separatorStyle: {},
  };

  getNextValue = (config, propKey) => config[propKey] !== undefined ? config[propKey] : this.props[propKey];

  getNextObject = (config, propKey) => ({...this.props[propKey], ...config[propKey]});

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
