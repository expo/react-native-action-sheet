import * as React from 'react';
import { Consumer, Context } from './ActionSheetProvider';

const connectActionSheet = (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  return (
    <Consumer>
      {({ showActionSheetWithOptions }) => {
        return (
          <WrappedComponent {...props} showActionSheetWithOptions={showActionSheetWithOptions} />
        )
      }}
    </Consumer>
  );
};

export default connectActionSheet
