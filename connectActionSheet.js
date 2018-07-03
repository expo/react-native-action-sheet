import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './Context';

export default function connectActionSheet(WrappedComponent) {
  const ConnectedActionSheet = (props, context) => {
    return (
      <Consumer>
        {(ref) => (
          <WrappedComponent
            {...props}
            showActionSheetWithOptions={
              (...args) => ref.showActionSheetWithOptions(...args)
            }
          />
        )}
      </Consumer>
    );
  };

  return hoistStatics(ConnectedActionSheet, WrappedComponent);
}
