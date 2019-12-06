import React, { useCallback, useRef } from 'react';
import ActionSheet from './ActionSheet';
import { Provider } from './context';
import { ActionSheetOptions } from './types';

interface Props {
  children: React.ReactNode;
}

const ActionSheetProvider = ({ children }: Props) => {
  const actionSheetRef = useRef<ActionSheet>(null);
  const getContext = useCallback(
    () => ({
      showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {
        actionSheetRef.current !== null &&
          actionSheetRef.current.showActionSheetWithOptions(options, callback);
      },
    }),
    [actionSheetRef]
  );

  return (
    <Provider value={getContext()}>
      <ActionSheet ref={actionSheetRef}>{React.Children.only(children)}</ActionSheet>
    </Provider>
  );
};

export default ActionSheetProvider;
