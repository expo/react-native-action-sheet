/**
 * @flow
 * @format
 */

import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import TouchableNativeFeedbackSafe from './TouchableNativeFeedbackSafe';

type ActionGroupProps = $ReadOnly<{|
  +options: string[],
  +onSelect: (i: number) => boolean,
  +startIndex: number,
  +length: number,
  +message: ?string,
  +title: ?string,
  +destructiveButtonIndex: ?number,
  +tintColor: ?string,
  +icons: ?Array<number | React.Node>,
  +tintIcons: ?boolean,
  +textStyle: ?any,
  +titleTextStyle: ?any,
  +messageTextStyle: ?any,
  +showSeparators: ?boolean,
  +separatorStyle: ?any,
|}>;

const BLACK_87PC_TRANSPARENT = '#000000de';
const BLACK_54PC_TRANSPARENT = '#0000008a';
const DESTRUCTIVE_COLOR = '#d32f2f';

export default class ActionGroup extends React.Component<ActionGroupProps> {
  static defaultProps = {
    title: null,
    message: null,
    showSeparators: false,
    tintIcons: true,
    textStyle: {},
  };

  render() {
    let {
      options,
      icons,
      tintIcons,
      destructiveButtonIndex,
      onSelect,
      startIndex,
      length,
      textStyle,
      tintColor,
      showSeparators,
    } = this.props;

    let optionViews = [];

    let nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(
      'rgba(180, 180, 180, 1)',
      false,
    );

    for (let i = startIndex; i < startIndex + length; i++) {
      const defaultColor = tintColor
        ? tintColor
        : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
      const color =
        i === destructiveButtonIndex ? DESTRUCTIVE_COLOR : defaultColor;
      const iconSource = icons != null && icons[i];
      let iconElement;

      if (iconSource) {
        if (typeof iconSource === 'number') {
          const iconStyle = [
            styles.icon,
            { tintColor: tintIcons ? color : null },
          ];
          iconElement = (
            <Image
              fadeDuration={0}
              source={iconSource}
              resizeMode="contain"
              style={iconStyle}
            />
          );
        } else {
          iconElement = <View style={styles.icon}>{iconSource}</View>;
        }
      }

      optionViews.push(
        <TouchableNativeFeedbackSafe
          key={i}
          pressInDelay={0}
          background={nativeFeedbackBackground}
          onPress={() => onSelect(i)}
          style={styles.button}>
          {iconElement}
          <Text style={[styles.text, textStyle, { color }]}>{options[i]}</Text>
        </TouchableNativeFeedbackSafe>,
      );

      if (showSeparators && i < startIndex + length - 1) {
        optionViews.push(this._renderRowSeparator(i));
      }
    }

    return (
      <View style={styles.groupContainer}>
        {this._renderTitleContent()}
        <ScrollView>{optionViews}</ScrollView>
      </View>
    );
  }

  _renderRowSeparator(key) {
    return (
      <View
        key={key ? `separator-${key}` : null}
        style={[styles.rowSeparator, this.props.separatorStyle]}
      />
    );
  }

  _renderTitleContent() {
    const {
      title,
      titleTextStyle,
      message,
      messageTextStyle,
      showSeparators,
    } = this.props;

    if (!title && !message) {
      return null;
    }

    return (
      <View>
        <View
          style={[
            styles.titleContainer,
            { paddingBottom: showSeparators ? 24 : 16 },
          ]}>
          {!!title && (
            <Text style={[styles.title, titleTextStyle]}>{title}</Text>
          )}
          {!!message && (
            <Text style={[styles.message, messageTextStyle]}>{message}</Text>
          )}
        </View>
        {!!showSeparators && this._renderRowSeparator('title')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 32,
  },
  text: {
    fontSize: 16,
    color: BLACK_87PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
  rowSeparator: {
    backgroundColor: '#dddddd',
    height: 1,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 16,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: BLACK_54PC_TRANSPARENT,
    textAlignVertical: 'center',
  },
});
