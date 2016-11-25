import React from 'react';

export default function connectActionSheet(WrappedComponent) {

  const ConnectedActionSheet = (props, context) => {
    return <WrappedComponent {...props} showActionSheetWithOptions={context.showActionSheetWithOptions} />;
  };

  ConnectedActionSheet.contextTypes = {
    showActionSheetWithOptions: React.PropTypes.func,
  };

  return ConnectedActionSheet;
}