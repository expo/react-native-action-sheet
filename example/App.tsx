import {
  ActionSheetProvider,
  connectActionSheet,
  ActionSheetProps,
} from '@expo/react-native-action-sheet';
import { Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';

import ShowActionSheetButton from './ShowActionSheetButton';

type Props = ActionSheetProps & {
  useCustomActionSheet: boolean;
  setUseCustomActionSheet: (next: boolean) => void;
};

interface State {
  selectedIndex?: number | null;
  isModalOpen: boolean;
}

class App extends React.Component<Props, State> {
  state: State = {
    selectedIndex: null,
    isModalOpen: false,
  };

  _updateSelectionText = (selectedIndex?: number) => {
    this.setState({
      selectedIndex,
    });
  };

  _renderSelectionText = () => {
    const { selectedIndex } = this.state;
    const text =
      selectedIndex === null || selectedIndex === undefined
        ? 'No Option Selected'
        : `Option #${selectedIndex + 1} Selected`;
    return <Text style={styles.selectionText}>{text}</Text>;
  };

  _renderSectionHeader = (text: string) => {
    return <Text style={styles.sectionHeaderText}>{text}</Text>;
  };

  _toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  async _onShare() {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  }

  _renderButtons() {
    const { showActionSheetWithOptions } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            display: Platform.OS === 'ios' ? 'flex' : 'none',
          }}>
          {this._renderSectionHeader('Use Custom Action Sheet')}
          <Text style={{ marginBottom: 10 }}>
            On iOS the default action sheet will be the native UI. However, you can optionally
            enable the custom JS action sheet by setting the useCustomActionSheet prop on the
            provider.
          </Text>
          <Entypo.Button
            backgroundColor={this.props.useCustomActionSheet ? '#3e3e3e' : 'white'}
            name={this.props.useCustomActionSheet ? 'check' : 'circle'}
            color={this.props.useCustomActionSheet ? '#fff' : '#3e3e3e'}
            style={{
              borderColor: '#3e3e3e',
              borderWidth: 2,
            }}
            onPress={() => this.props.setUseCustomActionSheet(!this.props.useCustomActionSheet)}>
            <Text
              style={{
                fontSize: 15,
                color: this.props.useCustomActionSheet ? '#fff' : '#3e3e3e',
              }}>
              Use Custom Action Sheet
            </Text>
          </Entypo.Button>
        </View>
        {this._renderSectionHeader('Universal Options')}
        <ShowActionSheetButton
          title="Options Only"
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Title"
          withTitle
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Title & Message"
          withTitle
          withMessage
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Cancel Button Tint Color"
          withCancelButtonTintColor
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="iPad Anchor"
          withAnchor
          withTitle
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Nested Action Sheets"
          onSelection={(index) => {
            if (!index || index < 3) {
              showActionSheetWithOptions(
                {
                  title: 'Sub Action Sheet',
                  options: ['One', 'Two', 'Three', 'Done'],
                  cancelButtonIndex: 3,
                },
                this._updateSelectionText
              );
            }
          }}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Share Menu"
          showActionSheetWithOptions={() =>
            showActionSheetWithOptions(
              {
                title: 'Share Menu',
                options: ['Share', 'Cancel'],
                cancelButtonIndex: 1,
              },
              (i) => {
                i === 0 && this._onShare();
              }
            )
          }
        />
        {this._renderSectionHeader('Android-Only Options')}
        <ShowActionSheetButton
          title="Icons"
          withIcons
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Title, Message, & Icons"
          withTitle
          withMessage
          withIcons
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Use Separators"
          withTitle
          withIcons
          withSeparators
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="Custom Styles"
          withTitle
          withMessage
          withIcons
          withCustomStyles
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        <ShowActionSheetButton
          title="More Options"
          withExtendedOptions
          stickyCancel
          onSelection={this._updateSelectionText}
          showActionSheetWithOptions={showActionSheetWithOptions}
        />
        {this._renderSectionHeader('Special Cases')}
        <TouchableOpacity onPress={this._toggleModal}>
          <Text style={styles.link}>Open Modal</Text>
        </TouchableOpacity>
        {this.state.isModalOpen && (
          <Modal>
            <View style={{ flex: 1, padding: 30 }}>
              <ShowActionSheetButton
                useModal
                title="Options Only"
                onSelection={this._updateSelectionText}
                showActionSheetWithOptions={showActionSheetWithOptions}
              />

              <TouchableOpacity onPress={this._toggleModal}>
                <Text style={styles.link}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.headerText}>
            {
              'Hello!\n\nThis is a simple example app to demonstrate @expo/react-native-action-sheet.'
            }
          </Text>
          {this._renderButtons()}
          {this._renderSelectionText()}
          <Text style={styles.notes}>
            Note: Icons and custom text styles are only available on Android. Separators can only be
            toggled on Android; they always show on iOS.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const ConnectedApp = connectActionSheet<any>(App);

export default function WrappedApp() {
  const [useCustomActionSheet, setUseCustomActionSheet] = useState(false);

  return (
    <ActionSheetProvider useCustomActionSheet={useCustomActionSheet}>
      <ConnectedApp
        useCustomActionSheet={useCustomActionSheet}
        setUseCustomActionSheet={setUseCustomActionSheet}
      />
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingVertical: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  notes: {
    marginTop: 32,
  },
  sectionHeaderText: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  selectionText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
