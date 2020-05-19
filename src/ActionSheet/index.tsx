import * as React from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import ActionGroup from './ActionGroup';
import { ActionSheetOptions } from '../types';

interface State {
  isVisible: boolean;
  isAnimating: boolean;
  options: ActionSheetOptions | null;
  onSelect: ((i: number) => void) | null;
  overlayOpacity: any;
  sheetOpacity: any;
}

interface Props {
  readonly useNativeDriver: boolean | undefined;
  readonly pointerEvents?: ViewProps['pointerEvents'];
}

const OPACITY_ANIMATION_IN_TIME = 225;
const OPACITY_ANIMATION_OUT_TIME = 195;
const EASING_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const EASING_IN = Easing.out(EASING_OUT);

// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
export default class ActionSheet extends React.Component<Props, State> {
  static defaultProps = {
    useNativeDriver: true,
  };

  _actionSheetHeight = 360;

  state: State = {
    isVisible: false,
    isAnimating: false,
    options: null,
    onSelect: null,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0),
  };

  _deferNextShow?: () => void = undefined;

  _setActionSheetHeight = ({ nativeEvent }: any) =>
    (this._actionSheetHeight = nativeEvent.layout.height);

  render() {
    const { isVisible, overlayOpacity, options } = this.state;
    const useModal = options ? options.useModal === true : false;
    const overlay = isVisible ? (
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      />
    ) : null;

    // While the sheet is visible, hide the rest of the app's content from screen readers.
    const appContent = (
      <View
        style={styles.flexContainer}
        importantForAccessibility={isVisible ? 'no-hide-descendants' : 'auto'}>
        {React.Children.only(this.props.children)}
      </View>
    );

    return (
      <View pointerEvents={this.props.pointerEvents} style={styles.flexContainer}>
        {appContent}
        {isVisible && !useModal && (
          <React.Fragment>
            {overlay}
            {this._renderSheet()}
          </React.Fragment>
        )}
        {isVisible && useModal && (
          <Modal animationType="none" transparent={true} onRequestClose={this._selectCancelButton}>
            {overlay}
            {this._renderSheet()}
          </Modal>
        )}
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
      autoFocus,
      showSeparators,
      containerStyle,
      separatorStyle,
    } = options;
    return (
      <TouchableWithoutFeedback importantForAccessibility="yes" onPress={this._selectCancelButton}>
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
              title={title || undefined}
              titleTextStyle={titleTextStyle}
              message={message || undefined}
              messageTextStyle={messageTextStyle}
              autoFocus={autoFocus}
              showSeparators={showSeparators}
              containerStyle={containerStyle}
              separatorStyle={separatorStyle}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  showActionSheetWithOptions = (options: ActionSheetOptions, onSelect: (i: number) => void) => {
    const { isVisible, overlayOpacity, sheetOpacity } = this.state;

    if (isVisible) {
      this._deferNextShow = this.showActionSheetWithOptions.bind(this, options, onSelect);
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
        this._deferNextShow = undefined;
      }
    });
    // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
    BackHandler.addEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
  };

  _selectCancelButton = () => {
    const { options } = this.state;

    if (!options) {
      return false;
    }

    if (typeof options.cancelButtonIndex === 'undefined') {
      return;
    } else if (typeof options.cancelButtonIndex === 'number') {
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

    // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
    BackHandler.removeEventListener('actionSheetHardwareBackPress', this._selectCancelButton);
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

        if (this._deferNextShow) {
          this._deferNextShow();
        }
      }
    });
    return true;
  };
}

const styles = StyleSheet.create({
  flexContainer: {
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sheet: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
