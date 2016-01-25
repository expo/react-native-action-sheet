'use strict';

import React, {
  Animated,
  BackAndroid,
  Easing,
  PixelRatio,
  PropTypes,
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
    let {
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
          style={styles.button}>
          <Text style={[styles.text, {color}]}>
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

    this._onSelect   = this._onSelect.bind(this);
    this._animateOut = this._animateOut.bind(this);
    this._onLayout   = this._onLayout.bind(this);

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
    let { isVisible } = this.state;
    let overlay = isVisible ? (
      <TouchableWithoutFeedback onPress={this._animateOut}>
        <Animated.View style={[styles.overlay, {
          opacity: this.state.overlayOpacity,
        }]}/>
      </TouchableWithoutFeedback>
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
    let numOptions = this.state.options.options.length;

    return (
      <Animated.View style={[styles.sheetContainer, {
        bottom: this.state.sheetY,
      }]}>
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

    BackAndroid.addEventListener('actionSheetHardwareBackPress', this._animateOut);
  }

  _onSelect(index) {
    if (this.state.isAnimating) {
      return;
    }

    if (index !== this.state.options.cancelButtonIndex) {
      this.state.onSelect(index);
    }

    this._animateOut();
  }

  _animateOut() {
    if (this.state.isAnimating) {
      return false;
    }

    BackAndroid.removeEventListener('actionSheetHardwareBackPress', this._animateOut);

    this.setState({
      isAnimating: true,
    });

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

  _onLayout(event) {
    if (!this.state.isWaitingForSheetHeight) {
      return;
    }

    let height = event.nativeEvent.layout.height;
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

let styles = StyleSheet.create({
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
