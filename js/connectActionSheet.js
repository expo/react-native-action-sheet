// @flow
import hoistStatics from 'hoist-non-react-statics';
import React from 'react';

type Context = {
  showActionSheetWithOptions: Function
}

export default function connectActionSheet(WrappedComponent: any) {
  const ConnectedActionSheet = (props, context: Context) => {
    return (
      <WrappedComponent
        {...props}
        showActionSheetWithOptions={context.showActionSheetWithOptions}
      />
    );
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
