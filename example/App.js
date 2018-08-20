import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

const saveIcon = require('./img/baseline_save_black_24dp.png');
const shareIcon = require('./img/baseline_share_black_24dp.png');
const cancelIcon = require('./img/baseline_cancel_black_24dp.png');
const deleteIcon = require('./img/baseline_delete_black_24dp.png');

export default class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <App />
      </ActionSheetProvider>
    );
  }
}

@connectActionSheet
class App extends React.Component {
  state = {
    selectedIndex: null,
  };

  _updateSelectionText = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  _renderButton = (title, onPress) => (
    <View style={{ marginBottom: 12 }}>
      <Entypo.Button
        name="code"
        backgroundColor="#3e3e3e"
        onPress={onPress}>
        <Text style={{ fontSize: 15, color: '#fff' }}>{title}</Text>
      </Entypo.Button>
    </View>
  );

  _renderSelectionText = () => {
    const { selectedIndex } = this.state;
    const text = selectedIndex === null
      ? 'No Option Selected'
      : `Option #${selectedIndex + 1} Selected`;

    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', color: 'blue', fontSize: 16 }}>
          {text}
        </Text>
      </View>
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              {"Hello!\n\nThis is a simple example app to demonstrate @expo/react-native-action-sheet."}
            </Text>
          </View>
          {this._renderButton('Options Only', this._onOpenActionSheet(false, false, false, false, false))}
          {this._renderButton('Title', this._onOpenActionSheet(true, false, false, false, false))}
          {this._renderButton('Title & Message', this._onOpenActionSheet(true, true, false, false, false))}
          {this._renderButton('Icons', this._onOpenActionSheet(false, false, true, false, false))}
          {this._renderButton('Title, Message, & Icons', this._onOpenActionSheet(true, true, true, false, false))}
          {this._renderButton('Use Separators', this._onOpenActionSheet(true, false, true, true, false))}
          {this._renderButton('Custom Styles', this._onOpenActionSheet(true, true, true, false, true))}
          {this._renderSelectionText()}
          <Text style={{ marginTop: 32 }}>
            Note: Icons and custom text styles are only available on Android. Separators can only be toggled on Android; they always show on iOS.
          </Text>
        </ScrollView>
      </View>
    );
  }

  _onOpenActionSheet = (
    withTitle,
    withMessage,
    withIcons,
    withSeparators,
    withCustomStyles,
  ) => () => {
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
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  contentContainer: {
    alignItems: 'center',
  },
});
