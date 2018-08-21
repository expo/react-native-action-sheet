import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

class ShowActionSheetButton extends React.PureComponent {
  _showActionSheet = () => {
    const {
      withTitle,
      withMessage,
      withIcons,
      withSeparators,
      withCustomStyles,
    } = this.props;
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Delete', 'Save', 'Share', 'Cancel'];
    const icons = withIcons ? [deleteIcon, saveIcon, shareIcon, cancelIcon] : null;
    const title = withTitle ? 'Choose An Action' : null;
    const message = withMessage ? 'This library tries to mimic the native share sheets as close as possible.' : null;
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 3;
    const textStyle = withCustomStyles ? { fontSize: 20, fontWeight: '500', color: 'blue' } : null;
    const titleTextStyle = withCustomStyles ? { fontSize: 24, textAlign: 'center', fontWeight: '700', color: 'orange' } : null;
    const messageTextStyle = withCustomStyles ? { fontSize: 12, color: 'purple', textAlign: 'right' } : null;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title,
        message,
        icons, // Android only
        showSeparators: withSeparators, // Affects Android only; default is false
        textStyle, // Android only
        titleTextStyle, // Android only
        messageTextStyle, // Android only
      },
      buttonIndex => {
        // Do something here depending on the button index selected

        this._updateSelectionText(buttonIndex)
      }
    );
  };

  render() {
    return (
      <Entypo.Button
        name="code"
        style={{ marginBottom: 12 }}
        backgroundColor="#3e3e3e"
        onPress={this._showActionSheet}>
        <Text style={{
          fontSize: 15,
          color: '#fff'
        }}>{title}</Text>
      </Entypo.Button>
    );
  }
}

ShowActionSheetButton.propTypes = {
  title: PropTypes.string.isRequired,
  withTitle: PropTypes.boolean,
  withMessage: PropTypes.boolean,
  withIcons: PropTypes.boolean,
  withSeparators: PropTypes.boolean,
  withCustomStyles: PropTypes.boolean,
};

ShowActionSheetButton.defaultProps = {
  withTitle: false,
  withMessage: false,
  withIcons: false,
  withSeparators: false,
  withCustomStyles: false,
};

export default ShowActionSheetButton;
