import { ActionSheetIOSOptions } from 'react-native';

export interface ActionSheetProps {
  showActionSheetWithOptions: (
    options: ActionSheetIOSOptions,
    callback: (buttonIndex: number) => void,
  ) => void;
}

export function connectActionSheet<T>(
  WrappedComponent: React.ComponentType<T & ActionSheetProps>,
): React.ComponentClass<T>;

export const ActionSheetProvider: React.ComponentClass;
