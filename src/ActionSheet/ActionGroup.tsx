import * as React from 'react';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import TouchableNativeFeedbackSafe from './TouchableNativeFeedbackSafe';
import { ActionSheetOptions } from '../types';

type Props = ActionSheetOptions & {
  tintIcons: boolean | null;
  onSelect: (i: number) => boolean;
  startIndex: number;
  length: number;
};

const BLACK_54PC_TRANSPARENT = '#0000008a';
const BLACK_87PC_TRANSPARENT = '#000000de';
const DESTRUCTIVE_COLOR = '#d32f2f';

export default class ActionGroup extends React.Component<Props> {
  static defaultProps = {
    title: null,
    message: null,
    showSeparators: false,
    tintIcons: true,
    textStyle: {},
  };

  render() {
    return (
      <View style={styles.groupContainer}>
        {this._renderTitleContent()}
        <ScrollView>{this._renderOptionViews()}</ScrollView>
      </View>
    );
  }

  _renderRowSeparator = (key: string | number) => {
    return (
      <View
        key={key && `separator-${key}`}
        style={[styles.rowSeparator, this.props.separatorStyle]}
      />
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
      destructiveButtonIndex,
      onSelect,
      startIndex,
      length,
      textStyle,
      tintColor,
      showSeparators,
    } = this.props;
    const optionViews: React.ReactNode[] = [];
    const nativeFeedbackBackground = TouchableNativeFeedbackSafe.Ripple(
      'rgba(180, 180, 180, 1)',
      false
    );

    for (let i = startIndex; i < startIndex + length; i++) {
      const defaultColor = tintColor
        ? tintColor
        : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
      const color = i === destructiveButtonIndex ? DESTRUCTIVE_COLOR : defaultColor;
      const iconSource = icons != null ? icons[i] : null;

      optionViews.push(
        <TouchableNativeFeedbackSafe
          key={i}
          pressInDelay={0}
          background={nativeFeedbackBackground}
          onPress={() => onSelect(i)}
          style={styles.button}>
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
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16,
  },
  groupContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 32,
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
