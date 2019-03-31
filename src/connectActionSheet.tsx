import * as React from 'react';
import { Consumer, Context } from './context';

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & Context>
) {
  return (props: OwnProps) => {
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
}
