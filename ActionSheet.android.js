// @flow

import React, { PropTypes } from 'react';
import {
  Animated,
  BackAndroid,
  Easing,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  NativeModules,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Not everybody has this enabled yet
// const useNativeDriver = !!NativeModules.NativeAnimatedModule;
// wait for RN 0.33.0 
const useNativeDriver = false;

type ActionSheetOptions = {
  options: Array<string>,
  destructiveButtonIndex: ?number,
  cancelButtonIndex: ?number,
}

type ActionGroupProps = {
  options: Array<string>,
  destructiveButtonIndex: ?number,
  onSelect: (i: number) => boolean,
  startIndex: number,
  length: number,
}

type ActionSheetState = {
  isVisible: boolean,
  isAnimating: boolean,
  options: ?ActionSheetOptions,
  onSelect: ?(i: number) => void,
  overlayOpacity: any,
  sheetOpacity: any,
}

type ActionSheetProps = {
  children: ?any,
}

const OPACITY_ANIMATION_TIME = 150;
const PIXEL = 1 / PixelRatio.get();

class ActionGroup extends React.Component {
  props: ActionGroupProps;

  static propTypes = {
    options: PropTypes.array.isRequired,
    destructiveButtonIndex: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    startIndex: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  };

  render() {
    let {
      options,
      destructiveButtonIndex,
      onSelect,
      startIndex,
      length,
    } = this.props;

    let optionViews = [];

    let nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(
      'rgba(180, 180, 180, 1)',
      false
    );

    for (let i = startIndex; i < startIndex + length; i++) {
      let color = '#444444';
      if (i === destructiveButtonIndex) {
        color = '#ff3b30';
      }

      optionViews.push(
        <TouchableNativeFeedbackSafe
          key={i}
          pressInDelay={0}
          background={nativeFeedbackBackground}
          onPress={() => onSelect(i)}
          style={styles.button}>
          <Text style={[styles.text, {color}]}>
            {options[i]}
          </Text>
        </TouchableNativeFeedbackSafe>
      );

      if (i < startIndex + length - 1) {
        optionViews.push(
          <View key={`separator-${i}`} style={styles.rowSeparator} />
        );
      }
    }

    return (
      <View style={styles.groupContainer}>
        {optionViews}
      </View>
    );
  }
}

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
export default class ActionSheet extends React.Component {
  props: ActionSheetProps;
  _animateOutCallback: ?() => void = null;

  state: ActionSheetState = {
    isVisible: false,
    isAnimating: false,
    options: null,
    onSelect: null,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0),
  };

  render() {
    let { isVisible } = this.state;
    let overlay = isVisible ? (
      <Animated.View style={[styles.overlay, {
        opacity: this.state.overlayOpacity,
      }]} />
    ) : null;

    let sheet = isVisible ? this._renderSheet() : null;

    return (
      <View style={{flex: 1}}>
        {React.Children.only(this.props.children)}
        {overlay}
        {sheet}
      </View>
    );
  }

  _renderSheet() {
    if (!this.state.options) {
      return;
    }

    let numOptions = this.state.options.options.length;

    return (
      <TouchableWithoutFeedback onPress={this._selectCancelButton}>
        <Animated.View
          needsOffscreenAlphaCompositing={this.state.isAnimating}
          style={[styles.sheetContainer, {
            opacity: this.state.sheetOpacity,
            transform: [{scale: this.state.sheetOpacity.interpolate({inputRange: [0, 0.5, 1], outputRange: [0.6, 1, 1]})}],
          }]}>
          <View style={styles.sheet}>
            <ActionGroup
              options={this.state.options.options}
              destructiveButtonIndex={this.state.options.destructiveButtonIndex}
              onSelect={this._onSelect}
              startIndex={0}
              length={numOptions}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  showActionSheetWithOptions(
    options: ActionSheetOptions,
    onSelect: (i: number) => void,
    onAnimateOut: () => void
  ) {
    if (this.state.isVisible) {
      return;
    }

    this.setState({
      options,
      onSelect,
      isVisible: true,
      isAnimating: true,
    });

    this.state.overlayOpacity.setValue(0);
    this.state.sheetOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0.5,
        easing: Easing.in(Easing.linear),
        duration: OPACITY_ANIMATION_TIME,
        useNativeDriver,
      }),
      Animated.timing(this.state.sheetOpacity, {
        toValue: 1,
        easing: Easing.in(Easing.linear),
        duration: OPACITY_ANIMATION_TIME,
        useNativeDriver,
      }),
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false,
        });
      }
    });

    this._animateOutCallback = onAnimateOut;

    BackAndroid.addEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
  }

  _selectCancelButton = () => {
    if (!this.state.options) {
      return;
    }

    if (typeof this.state.options.cancelButtonIndex === 'number') {
      return this._onSelect(this.state.options.cancelButtonIndex);
    } else {
      return this._animateOut();
    }
  }

  _onSelect = (index: number): boolean => {
    if (this.state.isAnimating) {
      return false;
    }

    this.state.onSelect && this.state.onSelect(index);
    return this._animateOut();
  }

  _animateOut = (): boolean => {
    if (this.state.isAnimating) {
      return false;
    }

    BackAndroid.removeEventListener('actionSheetHardwareBackPress', this._selectCancelButton);

    this.setState({
      isAnimating: true,
    });

    Animated.parallel([
      Animated.timing(this.state.overlayOpacity, {
        toValue: 0,
        easing: Easing.in(Easing.linear),
        duration: OPACITY_ANIMATION_TIME,
        useNativeDriver,
      }),
      Animated.timing(this.state.sheetOpacity, {
        toValue: 0,
        easing: Easing.in(Easing.linear),
        duration: OPACITY_ANIMATION_TIME,
        useNativeDriver,
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
  }
}

let TouchableComponent;

if (Platform.OS === 'android') {
  TouchableComponent = Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback;
} else {
  TouchableComponent = TouchableOpacity;
}

if (TouchableComponent !== TouchableNativeFeedback) {
  TouchableComponent.SelectableBackground = () => ({});
  TouchableComponent.SelectableBackgroundBorderless = () => ({});
  TouchableComponent.Ripple = (color, borderless) => ({});
}

class TouchableNativeFeedbackSafe extends React.Component {

  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;

  render() {
    if (TouchableComponent === TouchableNativeFeedback) {
      return (
        <TouchableComponent {...this.props} style={{}}>
          <View style={this.props.style}>
            {this.props.children}
          </View>
        </TouchableComponent>
      );
    } else {
      return (
        <TouchableComponent {...this.props}>
          {this.props.children}
        </TouchableComponent>
      );
    }
  }
}

let styles = StyleSheet.create({
  groupContainer: {
    backgroundColor: '#fefefe',
    borderRadius: 4,
    borderColor: '#cbcbcb',
    borderWidth: PIXEL,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 50,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
  },
  rowSeparator: {
    backgroundColor: '#dddddd',
    height: 1,
    flex: 1,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sheet: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
