import React from 'react';
import ActionSheet from './ActionSheet';

export default class ActionSheetProvider extends React.Component {
  static childContextTypes = {
    actionSheet: React.PropTypes.func,
  };

  getChildContext() {
    return {
      actionSheet: () => this._actionSheetRef,
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