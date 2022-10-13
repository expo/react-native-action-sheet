import * as React from 'react';

import NativeActionSheet from './ActionSheet';
import CustomActionSheet from './ActionSheet/CustomActionSheet';
import { Provider } from './context';
import { ActionSheetOptions } from './types';

interface Props {
  children: React.ReactNode;
  useNativeDriver?: boolean;
  useCustomActionSheet?: boolean;
}

export default function ActionSheetProvider({
  children,
  useNativeDriver,
  useCustomActionSheet = false,
}: Props) {
  const actionSheetRef = React.useRef<NativeActionSheet>(null);

  const context = React.useMemo(
    () => ({
      showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {
        if (actionSheetRef.current) {
          actionSheetRef.current.showActionSheetWithOptions(options, callback);
        }
      },
    }),
    [actionSheetRef]
  );

  const ActionSheet = React.useMemo(
    () => (useCustomActionSheet ? CustomActionSheet : NativeActionSheet),
    [CustomActionSheet]
  );

  return (
    <Provider value={context}>
      <ActionSheet ref={actionSheetRef} useNativeDriver={useNativeDriver}>
        {React.Children.only(children)}
      </ActionSheet>
    </Provider>
  );
}
