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

  constructor() {
    super();
    this.onRefActionSheet = this.onRefActionSheet.bind(this);
  }

  getChildContext() {
    return {
      showActionSheetWithOptions: (...args) =>
        this._actionSheetRef.showActionSheetWithOptions(...args),
    };
  }

  onRefActionSheet(_actionSheetRef) {
    this._actionSheetRef = _actionSheetRef;
  }

  render() {
    return (
      <ActionSheet ref={this.onRefActionSheet}>
        {React.Children.only(this.props.children)}
      </ActionSheet>
    );
  }
}
