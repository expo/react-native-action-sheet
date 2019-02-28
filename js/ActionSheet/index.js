/**
 * This implementation is for Web, Android
 * @format
 * @flow
 */

import * as React from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import ActionGroup from './ActionGroup';
import type { ActionSheetIOSOptions } from '../ActionSheetIOS';

export type ActionSheetOptions = ActionSheetIOSOptions & {
  // Web Android only
  +icons?: Array<number | React.Node>,
  +tintIcons?: boolean,
  +textStyle?: TextStyleProp,
  +titleTextStyle?: TextStyleProp,
  +messageTextStyle?: TextStyleProp,
  +showSeparators?: boolean,
  +separatorStyle?: ViewStyleProp,
};

type ActionSheetState = {|
  +isVisible: boolean,
  +isAnimating: boolean,
  +overlayOpacity: any,
  +sheetOpacity: any,
  +options: ?ActionSheetOptions,
  +onSelect: ?(i: number) => void,
|};

type ActionSheetProps = $ReadOnly<{|
  +children: ?any,
  +useNativeDriver: boolean,
|}>;

const OPACITY_ANIMATION_IN_TIME = 225;
const OPACITY_ANIMATION_OUT_TIME = 195;
const EASING_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const EASING_IN = Easing.out(EASING_OUT);

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
export default class ActionSheet extends React.Component<
  ActionSheetProps,
  ActionSheetState,
> {
  static defaultProps = {
    useNativeDriver: true,
  };

  state = {
    isVisible: false,
    isAnimating: false,
    options: null,
    onSelect: null,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0),
  };

  _actionSheetHeight = 360;
  _animateOutCallback: ?() => void = null;

  _setActionSheetHeight = ({ nativeEvent }) =>
    (this._actionSheetHeight = nativeEvent.layout.height);

  render() {
    const { isVisible, overlayOpacity } = this.state;
    const overlay = !!isVisible && (
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        {overlay}
        {!!isVisible && this._renderSheet()}
      </View>
    );
  }

  _renderSheet() {
    const { options, isAnimating, sheetOpacity } = this.state;

    if (!options) {
      return null;
    }

    const {
      options: optionsArray,
      icons,
      tintIcons,
      destructiveButtonIndex,
      textStyle,
      tintColor,
      title,
      titleTextStyle,
      message,
      messageTextStyle,
      showSeparators,
      separatorStyle,
    } = options;

    return (
      <TouchableWithoutFeedback onPress={this._selectCancelButton}>
        <Animated.View
          needsOffscreenAlphaCompositing={isAnimating}
          style={[
            styles.sheetContainer,
            {
              opacity: sheetOpacity,
              transform: [
                {
                  translateY: sheetOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this._actionSheetHeight, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.sheet} onLayout={this._setActionSheetHeight}>
            <ActionGroup
              options={optionsArray}
              icons={icons}
              tintIcons={tintIcons === undefined ? true : tintIcons}
              destructiveButtonIndex={destructiveButtonIndex}
              onSelect={this._onSelect}
              startIndex={0}
              length={optionsArray.length}
              textStyle={textStyle || {}}
              tintColor={tintColor}
              title={title || null}
              titleTextStyle={titleTextStyle}
              message={message || null}
              messageTextStyle={messageTextStyle}
              showSeparators={showSeparators}
              separatorStyle={separatorStyle}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  showActionSheetWithOptions(
    options: ActionSheetOptions,
    onSelect: (i: number) => void,
    onAnimateOut: () => void,
  ) {
    const { isVisible, overlayOpacity, sheetOpacity } = this.state;

    if (isVisible) {
      return;
    }

    this.setState({
      options,
      onSelect,
      isVisible: true,
      isAnimating: true,
    });

    overlayOpacity.setValue(0);
    sheetOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0.32,
        easing: EASING_OUT,
        duration: OPACITY_ANIMATION_IN_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 1,
        easing: EASING_OUT,
        duration: OPACITY_ANIMATION_IN_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false,
        });
      }
    });

    this._animateOutCallback = onAnimateOut;

    BackHandler.addEventListener(
      // $FlowFixMe: string [1] is incompatible with enum
      'actionSheetHardwareBackPress',
      this._selectCancelButton,
    );
  }

  _selectCancelButton = () => {
    const { options } = this.state;
    if (!options) {
      return false;
    }

    if (typeof options.cancelButtonIndex === 'number') {
      return this._onSelect(options.cancelButtonIndex);
    } else {
      return this._animateOut();
    }
  };

  _onSelect = (index: number): boolean => {
    const { isAnimating, onSelect } = this.state;

    if (isAnimating) {
      return false;
    }

    onSelect && onSelect(index);
    return this._animateOut();
  };

  _animateOut = (): boolean => {
    const { isAnimating, overlayOpacity, sheetOpacity } = this.state;

    if (isAnimating) {
      return false;
    }

    BackHandler.removeEventListener(
      // $FlowFixMe: string [1] is incompatible with enum
      'actionSheetHardwareBackPress',
      this._selectCancelButton,
    );

    this.setState({
      isAnimating: true,
    });

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        easing: EASING_IN,
        duration: OPACITY_ANIMATION_OUT_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
      Animated.timing(sheetOpacity, {
        toValue: 0,
        easing: EASING_IN,
        duration: OPACITY_ANIMATION_OUT_TIME,
        useNativeDriver: this.props.useNativeDriver,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isVisible: false,
          isAnimating: false,
        });
        if (typeof this._animateOutCallback === 'function') {
          this._animateOutCallback();
          this._animateOutCallback = null;
        }
      }
    });

    return true;
  };
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sheet: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
