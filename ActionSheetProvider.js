import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from './ActionSheet';

export default class ActionSheetProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };

  static childContextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args) =>
        this._actionSheetRef.showActionSheetWithOptions(...args),
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
