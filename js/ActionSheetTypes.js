/**
 * @flow
 * @format
 */

import * as React from 'react';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type ActionSheetIOSOptions = {|
  +options: string[],
  +cancelButtonIndex?: number,
  +destructiveButtonIndex?: number,
  +message?: string,
  +title?: string,
  +tintColor?: string,
|};

export type ShareActionSheetIOSOptions = {|
  +url?: string,
  +message?: string,
  +subject?: string,
  /** The activities to exclude from the ActionSheet.
   * For example: ['com.apple.UIKit.activity.PostToTwitter']
   */
  +excludedActivityTypes?: string[],
  +tintColor?: string,
|};

// For Web or Android
export type ActionSheetOptions = ActionSheetIOSOptions & {
  +icons?: Array<number | React.Node>,
  +tintIcons?: boolean,
  +textStyle?: TextStyleProp,
  +titleTextStyle?: TextStyleProp,
  +messageTextStyle?: TextStyleProp,
  +showSeparators?: boolean,
  +separatorStyle?: ViewStyleProp,
};

export type OnSelectCallback = (buttonIndex: number) => void;
export type FailureCallback = (error: Error) => void;
export type SuccessCallback = (success: boolean, method: string) => void;
export type ShowActionSheetWithOptions = (
  option: ActionSheetOptions,
  onSelect: OnSelectCallback,
) => void;
