import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import PropTypes from 'prop-types';

export default function connectActionSheet(WrappedComponent) {
  class ConnectedActionSheet extends React.PureComponent {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          showActionSheetWithOptions={this.context.showActionSheetWithOptions}
        />
      );
    }
  };

  ConnectedActionSheet.contextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
