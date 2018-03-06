import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

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
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ textAlign: 'center' }}>
            Hello! This is a simple example app to demonstrate @expo/react-native-action-sheet.
          </Text>
        </View>

        <Entypo.Button name="code" backgroundColor="#3e3e3e" onPress={this._onOpenActionSheet}>
          <Text style={{ fontSize: 15, color: '#fff' }}>Open action sheet</Text>
        </Entypo.Button>
      </View>
    );
  }

  _onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    let options = ['Delete', 'Save', 'Cancel'];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
