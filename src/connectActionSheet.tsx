import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';

import { Consumer } from './context';
import { ActionSheetProps } from './types';

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & ActionSheetProps>
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
