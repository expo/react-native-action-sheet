import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

type Context = {
  showActionSheetWithOptions: () => any;
};

export default function connectActionSheet<WrappedComponentProps>(
  WrappedComponent: React.ComponentType<any>
) {
  const ConnectedActionSheet = (props: WrappedComponentProps, context: Context) => {
    return (
      <WrappedComponent
        {...props}
        showActionSheetWithOptions={context.showActionSheetWithOptions}
      />
    );
  };

  // @ts-ignore
  return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}
