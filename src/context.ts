import * as React from 'react'
import { ActionSheetOptions } from './types';

export type Context = {
  showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => void;
};

const { Provider, Consumer } = React.createContext<Context>({
  showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {},
});

export { Provider, Consumer };