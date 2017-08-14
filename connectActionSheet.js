import hoistStatics from 'hoist-non-react-statics';
import React from 'react';

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
    showActionSheetWithOptions: React.PropTypes.func,
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
