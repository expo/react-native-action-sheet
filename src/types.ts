import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface ActionSheetProps {
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i?: number) => void | Promise<void>
  ) => void;
}

// for iOS
export interface ActionSheetIOSOptions {
  options: string[];
  title?: string;
  message?: string;
  tintColor?: string;
  cancelButtonIndex?: number;
  cancelButtonTintColor?: string;
  destructiveButtonIndex?: number | number[];
  anchor?: number;
  userInterfaceStyle?: 'light' | 'dark';
  disabledButtonIndices?: number[];
}

// for Android or Web
export interface ActionSheetOptions extends ActionSheetIOSOptions {
  icons?: React.ReactNode[];
  tintIcons?: boolean;
  textStyle?: TextStyle;
  titleTextStyle?: TextStyle;
  messageTextStyle?: TextStyle;
  autoFocus?: boolean;
  showSeparators?: boolean;
  containerStyle?: ViewStyle;
  separatorStyle?: ViewStyle;
  useModal?: boolean;
  destructiveColor?: string;
}
