import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from './ActionSheet';

export default class ActionSheetProvider extends React.Component {
  static propTypes = {
    textStyle: PropTypes.Object,
    children: PropTypes.any,
  };

  static childContextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  static defaultProps = {
    textStyle: {}
  }

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args) => {
        const [config, ...rest] = args
        const textStyle = {...this.props.textStyle, ...config.textStyle}
        const nextConfig = {...config, textStyle}

        this._actionSheetRef.showActionSheetWithOptions(nextConfig, ...rest)
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
