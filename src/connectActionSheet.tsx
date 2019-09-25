import * as React from 'react';
import { Consumer, Context } from './context';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & Context>
) {
  const ConnectedActionSheet = (props: OwnProps) => {
    return (
      <Consumer>
        {({ showActionSheetWithOptions }) => {
          return (
            <WrappedComponent {...props} showActionSheetWithOptions={showActionSheetWithOptions} />
          );
        }}
      </Consumer>
    );
  };

  return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}
