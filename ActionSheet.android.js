'use strict';
import React, { PropTypes } from 'react';
import {
  Animated,
  BackAndroid,
  Easing,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const OPACITY_ANIMATION_TIME = 250;
const Y_ANIMATION_TIME = 250;
const OFFSCREEN_HEIGHT = 9999;
const PIXEL = 1 / PixelRatio.get();

class ActionGroup extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    destructiveButtonIndex: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    startIndex: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
  };

  render() {
    const {
      options,
      destructiveButtonIndex,
      onSelect,
      startIndex,
      length,
    } = this.props;

    let optionViews = [];
    for (let i = startIndex; i < startIndex + length; i++) {
      let color = '#007aff';
      if (i === destructiveButtonIndex) {
        color = '#ff3b30';
      }

      optionViews.push(
        <TouchableOpacity
          key={i}
          onPress={() => onSelect(i)}
          style={styles.button}
        >
          <Text style={[styles.text, { color }]}>
            {options[i]}
          </Text>
        </TouchableOpacity>
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
  constructor(props, context) {
    super(props, context);

    this._onCancel = () => this._onSelect(this.state.options.cancelButtonIndex);

    this.state = {
      isVisible: false,
      isAnimating: false,
      options: null,
      onSelect: null,
      sheetHeight: OFFSCREEN_HEIGHT,
      overlayOpacity: new Animated.Value(0),
      sheetY: new Animated.Value(-OFFSCREEN_HEIGHT),
      isWaitingForSheetHeight: false,
    };
  }

  render() {
    const { isVisible, options } = this.state;

    let overlay = null;
    if (isVisible) {
      overlay = <Animated.View style={[styles.overlay, { opacity: this.state.overlayOpacity }]} />;
      if (options.cancelButtonIndex) {
        overlay = <TouchableWithoutFeedback onPress={this._onCancel}>{overlay}</TouchableWithoutFeedback>;
      }
    }

    const sheet = isVisible ? this._renderSheet() : null;

    return (
      <View style={[{ flex: 1 }, this.props.style]}>
        {React.Children.only(this.props.children)}
        {overlay}
        {sheet}
      </View>
    );
  }

  _renderSheet() {
    const numOptions = this.state.options.options.length;

    return (
      <Animated.View style={[styles.sheetContainer, { bottom: this.state.sheetY }]}>
        <View onLayout={this._onLayout} style={styles.sheet}>
          <ActionGroup
            options={this.state.options.options}
            destructiveButtonIndex={this.state.options.destructiveButtonIndex}
            onSelect={this._onSelect}
            startIndex={0}
            length={numOptions - 1}
          />
          <ActionGroup
            options={this.state.options.options}
            destructiveButtonIndex={this.state.options.destructiveButtonIndex}
            onSelect={this._onSelect}
            startIndex={numOptions - 1}
            length={1}
          />
        </View>
      </Animated.View>
    );
  }

  showActionSheetWithOptions(options, onSelect) {
    if (this.state.isVisible) {
      return;
    }

    this.setState({
      options,
      onSelect,
      isVisible: true,
      isAnimating: true,
      isWaitingForSheetHeight: true,
    });

    this.state.overlayOpacity.setValue(0);
    this.state.sheetY.setValue(-this.state.sheetHeight);

    Animated.timing(this.state.overlayOpacity, {
      toValue: 0.3,
      easing: Easing.in(Easing.linear),
      duration: OPACITY_ANIMATION_TIME,
    }).start();

    if (options.cancelButtonIndex) {
      this._backAndroidEventListener = BackAndroid.addEventListener('actionSheetHardwareBackPress', this._onCancel);
    }
  }

  _onSelect = index => {
    if (this.state.isAnimating) return false;

    this.state.onSelect(index);

    if (this._backAndroidEventListener) {
      this._backAndroidEventListener.remove();
    }

    this.setState({ isAnimating: true });

    Animated.timing(this.state.overlayOpacity, {
      toValue: 0,
      easing: Easing.in(Easing.linear),
      duration: OPACITY_ANIMATION_TIME,
    }).start(result => {
      if (result.finished) {
        this.setState({
          isVisible: false,
          isAnimating: false,
        });
      }
    });

    Animated.timing(this.state.sheetY, {
      toValue: -this.state.sheetHeight,
      easing: Easing.inOut(Easing.ease),
      duration: Y_ANIMATION_TIME,
    }).start();

    return true;
  }

  _onLayout = event => {
    if (!this.state.isWaitingForSheetHeight) {
      return;
    }

    const height = event.nativeEvent.layout.height;
    this.setState({
      isWaitingForSheetHeight: false,
      sheetHeight: height,
    });

    this.state.sheetY.setValue(-height);
    Animated.timing(this.state.sheetY, {
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      duration: Y_ANIMATION_TIME,
    }).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false,
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    backgroundColor: '#fefefe',
    borderRadius: 4,
    borderColor: '#cbcbcb',
    borderWidth: PIXEL,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
  },
  rowSeparator: {
    backgroundColor: '#cbcbcb',
    height: PIXEL,
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
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: 'transparent',
  },
});
