import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import ShowActionSheetButton from './ShowActionSheetButton';

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
          <ShowActionSheetButton title="Options Only" />
          <ShowActionSheetButton title="Title" withTitle />
          <ShowActionSheetButton title="Title & Message" withTitle withMessage />
          <ShowActionSheetButton title="Icons" withIcons />
          <ShowActionSheetButton title="Title, Message, & Icons" withTitle withMessage withIcons />
          <ShowActionSheetButton title="Use Separators" withTitle withIcons withSeparators />
          <ShowActionSheetButton title="Custom Styles" withTitle withMessage withIcons withCustomStyles />
          {this._renderSelectionText()}
          <Text style={{ marginTop: 32 }}>
            Note: Icons and custom text styles are only available on Android. Separators can only be toggled on Android; they always show on iOS.
          </Text>
        </ScrollView>
      </View>
    );
  }
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
