import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './Context';

export default function connectActionSheet(WrappedComponent) {
  const ConnectedActionSheet = (props, context) => {
    return (
      <Consumer>
        {(showActionSheetWithOptions) => (
          <WrappedComponent
            {...props}
            showActionSheetWithOptions={showActionSheetWithOptions}
          />
        )}
      </Consumer>
    );
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
