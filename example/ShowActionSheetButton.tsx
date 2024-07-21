import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, TextStyle, ViewStyle, findNodeHandle } from 'react-native';

const icon = (name: React.ComponentProps<typeof MaterialIcons>['name']) => (
  <MaterialIcons key={name} name={name} size={24} />
);

interface Props {
  title: string;
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (buttonIndex?: number) => void
  ) => void;
  onSelection: (index?: number) => void;
  withTitle?: boolean;
  withMessage?: boolean;
  withIcons?: boolean;
  withSeparators?: boolean;
  withCustomStyles?: boolean;
  withCancelButtonTintColor?: boolean;
  withAnchor?: boolean;
  withExtendedOptions?: boolean;
  useModal?: boolean;
  stickyCancel?: boolean;
}

// A custom button that shows examples of different share sheet configurations
export default class ShowActionSheetButton extends React.PureComponent<Props> {
  static defaultProps = {
    withTitle: false,
    withMessage: false,
    withIcons: false,
    withSeparators: false,
    withCustomStyles: false,
    withAnchor: false,
    withCancelButtonTintColor: false,
    withExtendedOptions: false,
    onSelection: null,
    useModal: false,
    stickyCancel: false,
  };

  _anchorRef = React.createRef<any>();

  _showActionSheet = () => {
    const {
      withAnchor,
      withTitle,
      withMessage,
      withIcons,
      withSeparators,
      withCustomStyles,
      withCancelButtonTintColor,
      onSelection,
      showActionSheetWithOptions,
      useModal,
      stickyCancel,
      withExtendedOptions,
    } = this.props;
    console.log('stickyCancel', stickyCancel);
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Delete', 'Disabled', 'Save', 'Cancel'];
    const extendedOptions = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
      'Option 10',
      'Option 11',
      'Option 12',
      'Option 13',
      'Option 14',
      'Option 15',
      'Option 16',
      'Option 17',
      'Option 18',
      'Option 19',
      'Option 20',
    ];
    const icons = withIcons
      ? [icon('delete'), icon('save'), icon('share'), icon('cancel')]
      : undefined;
    const title = withTitle ? 'Choose An Action' : undefined;
    const message = withMessage
      ? 'This library tries to mimic the native share sheets as close as possible.'
      : undefined;
    const destructiveButtonIndex = 0;
    const disabledButtonIndices = [1];
    const cancelButtonIndex = 3;
    const textStyle: TextStyle | undefined = withCustomStyles
      ? {
          fontSize: 20,
          fontWeight: '500',
          color: 'blue',
        }
      : undefined;
    const titleTextStyle: TextStyle | undefined = withCustomStyles
      ? {
          fontSize: 24,
          textAlign: 'center',
          fontWeight: '700',
          color: 'orange',
        }
      : undefined;
    const messageTextStyle: TextStyle | undefined = withCustomStyles
      ? {
          fontSize: 12,
          color: 'purple',
          textAlign: 'right',
        }
      : undefined;
    const containerStyle: ViewStyle | undefined = withCustomStyles
      ? {
          backgroundColor: 'lightgrey',
        }
      : {};
    if (withExtendedOptions) {
      containerStyle.maxHeight = 500;
    }
    const anchor: number | null = this._anchorRef.current
      ? findNodeHandle(this._anchorRef.current)
      : null;

    showActionSheetWithOptions(
      {
        options: withExtendedOptions ? [...options, ...extendedOptions] : options,
        cancelButtonIndex,
        cancelButtonTintColor: withCancelButtonTintColor ? '#D93F0B' : undefined,
        destructiveButtonIndex,
        disabledButtonIndices,
        title,
        message,
        icons,
        //iPad only
        anchor: withAnchor && anchor ? anchor : undefined,
        // Android only
        tintIcons: true,
        // Android only; default is true
        showSeparators: withSeparators,
        // Affects Android only; default is false
        textStyle,
        // Android only
        titleTextStyle,
        // Android only
        messageTextStyle,
        // Android only,
        containerStyle,
        // Android only,
        useModal,
        // Android only
        stickyCancel,
      },
      (buttonIndex?: number) => {
        // Do something here depending on the button index selected
        onSelection(buttonIndex);
      }
    );
  };

  render() {
    const { title } = this.props;
    return (
      <View
        style={{
          margin: 6,
        }}>
        <Entypo.Button
          name="code"
          backgroundColor="#3e3e3e"
          onPress={this._showActionSheet}
          ref={this._anchorRef}>
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
            }}>
            {title}
          </Text>
        </Entypo.Button>
      </View>
    );
  }
}
