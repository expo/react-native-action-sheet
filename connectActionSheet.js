import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function connectActionSheet(WrappedComponent) {

  const ConnectedActionSheet = (props, context) => {
    return <WrappedComponent {...props} showActionSheetWithOptions={context.showActionSheetWithOptions} />;
  };

  ConnectedActionSheet.contextTypes = {
    showActionSheetWithOptions: React.PropTypes.func,
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
