import React from 'react';
import ActionSheet from './ActionSheet';

export default class ActionSheetProvider extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  static childContextTypes = {
    showActionSheetWithOptions: React.PropTypes.func,
  };

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args) => this._actionSheetRef.showActionSheetWithOptions(...args),
    };
  }

  render() {
    return (
      <ActionSheet ref={component => this._actionSheetRef = component}>
        {React.Children.only(this.props.children)}
      </ActionSheet>
    );
  }
}