import * as React from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

import { ActionSheetOptions } from '../types';
import TouchableNativeFeedbackSafe from './TouchableNativeFeedbackSafe';

type Props = ActionSheetOptions & {
  tintIcons: boolean | null;
  onSelect: (i: number) => boolean;
  startIndex: number;
  length: number;
};

const BLACK_54PC_TRANSPARENT = '#0000008a';
const BLACK_87PC_TRANSPARENT = '#000000de';
const DESTRUCTIVE_COLOR = '#d32f2f';
const RIPPLE_COLOR = 'rgba(180, 180, 180, 1)';

/**
 * Can be used as a React ref for a component to auto-focus for accessibility on render.
 * @param ref The component to auto-focus
 */
const focusViewOnRender = (ref: React.Component | null) => {
  if (ref) {
    const reactTag = findNodeHandle(ref);
    if (reactTag) {
      if (Platform.OS === 'android') {
        // @ts-ignore: sendAccessibilityEvent is missing from @types/react-native
        UIManager.sendAccessibilityEvent(
          reactTag,
          // @ts-ignore: AccessibilityEventTypes is missing from @types/react-native
          UIManager.AccessibilityEventTypes.typeViewFocused
        );
      } else {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }
};

const isIndexDestructive = (index: number, destructiveIndex?: number | number[]) => {
  if (Array.isArray(destructiveIndex)) {
    return destructiveIndex.includes(index);
  }

  return index === destructiveIndex;
};

const isIndexDisabled = (index: number, disabledButtonIndices: number[] = []) => {
  return disabledButtonIndices.includes(index);
};

export default class ActionGroup extends React.Component<Props> {
  static defaultProps = {
    title: null,
    message: null,
    showSeparators: false,
    tintIcons: true,
    textStyle: {},
    stickyCancel: false,
  };

  render() {
    return (
      <View style={[styles.groupContainer, this.props.containerStyle]}>
        {this._renderTitleContent()}
        <ScrollView>{this._renderOptionViews()}</ScrollView>
        {this._renderCancelButton()}
      </View>
    );
  }

  _renderRowSeparator = (key: string | number) => {
    return (
      <View key={`separator-${key}`} style={[styles.rowSeparator, this.props.separatorStyle]} />
    );
  };

  _renderTitleContent = () => {
    const { title, titleTextStyle, message, messageTextStyle, showSeparators } = this.props;

    if (!title && !message) {
      return null;
    }

    return (
      <View>
        <View style={[styles.titleContainer, { paddingBottom: showSeparators ? 24 : 16 }]}>
          {!!title && <Text style={[styles.title, titleTextStyle]}>{title}</Text>}
          {!!message && <Text style={[styles.message, messageTextStyle]}>{message}</Text>}
        </View>
        {!!showSeparators && this._renderRowSeparator('title')}
      </View>
    );
  };

  _renderIconElement = (iconSource: React.ReactNode | null, color: string) => {
    const { tintIcons } = this.props;
    if (!iconSource) {
      return null;
    }

    if (typeof iconSource === 'number') {
      const iconStyle = [styles.icon, { tintColor: tintIcons ? color : undefined }];
      return <Image fadeDuration={0} source={iconSource} resizeMode="contain" style={iconStyle} />;
    } else {
      return <View style={styles.icon}>{iconSource}</View>;
    }
  };

  _renderOptionViews = () => {
    const {
      options,
      icons,
      cancelButtonIndex,
      cancelButtonTintColor,
      destructiveButtonIndex,
      disabledButtonIndices,
      destructiveColor = DESTRUCTIVE_COLOR,
      onSelect,
      startIndex,
      length,
      textStyle,
      tintColor,
      autoFocus,
      showSeparators,
      stickyCancel,
    } = this.props;
    const optionViews: React.ReactNode[] = [];
    const nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(RIPPLE_COLOR, false);

    for (let i = startIndex; i < startIndex + length; i++) {
      const defaultColor = tintColor
        ? tintColor
        : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
      const disabled = isIndexDisabled(i, disabledButtonIndices);
      const isCancelButton = i === cancelButtonIndex;
      if (isCancelButton && stickyCancel) {
        continue;
      }
      const color = isIndexDestructive(i, destructiveButtonIndex)
        ? destructiveColor
        : isCancelButton
        ? cancelButtonTintColor || defaultColor
        : defaultColor;
      const iconSource = icons != null ? icons[i] : null;

      optionViews.push(
        <TouchableNativeFeedbackSafe
          ref={autoFocus && i === 0 ? focusViewOnRender : undefined}
          key={i}
          pressInDelay={0}
          background={nativeFeedbackBackground}
          disabled={disabled}
          onPress={() => onSelect(i)}
          style={[styles.button, disabled && styles.disabledButton]}
          accessibilityRole="button"
          accessibilityLabel={options[i]}>
          {this._renderIconElement(iconSource, color)}
          <Text style={[styles.text, textStyle, { color }]}>{options[i]}</Text>
        </TouchableNativeFeedbackSafe>
      );

      if (showSeparators && i < startIndex + length - 1) {
        optionViews.push(this._renderRowSeparator(i));
      }
    }

    return optionViews;
  };

  _renderCancelButton = () => {
    if (!this.props.stickyCancel || this.props.cancelButtonIndex === undefined) {
      return null;
    }
    const {
      options,
      icons,
      cancelButtonIndex,
      cancelButtonTintColor,
      disabledButtonIndices,
      onSelect,
      textStyle,
      tintColor,
    } = this.props;
    const disabled = isIndexDisabled(cancelButtonIndex, disabledButtonIndices);
    const defaultColor = tintColor ? tintColor : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
    const color = cancelButtonTintColor || defaultColor;
    const nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(RIPPLE_COLOR, false);
    const iconSource = icons != null ? icons[cancelButtonIndex] : null;
    const cancelOption = options[cancelButtonIndex];

    return (
      <TouchableNativeFeedbackSafe
        pressInDelay={0}
        background={nativeFeedbackBackground}
        disabled={disabled}
        onPress={() => onSelect(cancelButtonIndex)}
        style={[styles.button, disabled && styles.disabledButton]}
        accessibilityRole="button"
        accessibilityLabel={cancelOption}>
        {this._renderIconElement(iconSource, color)}
        <Text style={[styles.text, textStyle, { color }]}>{cancelOption}</Text>
      </TouchableNativeFeedbackSafe>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  groupContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 32,
    justifyContent: 'center',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
  rowSeparator: {
    backgroundColor: '#dddddd',
    height: 1,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: BLACK_87PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 16,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
  titleContainer: {
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 24,
  },
});
