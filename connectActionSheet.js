import React from 'react';

export default function connectActionSheet(WrappedComponent) {

  const ConnectedActionSheet = (props, context) => {
    return <WrappedComponent { ...props } actionSheet={context.actionSheet} />;
  };

  ConnectedActionSheet.contextTypes = {
    actionSheet: React.PropTypes.func
  };

  return ConnectedActionSheet;
}