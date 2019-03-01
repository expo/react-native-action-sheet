/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import * as React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EXAMPLES from './RNTesterExample';
import ActionSheetExample from './ActionSheetExample';

export default class App extends React.Component<void> {
  _renderExample = example => {
    return (
      <View key={example.title} style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>{example.title}</Text>
        <View style={styles.exampleInnerContainer}>{example.render()}</View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.sectionTitle}> ActionSheet Examples</Text>
          <ActionSheetExample />
          {Platform.OS === 'ios' ? (
            <React.Fragment>
              <Text style={styles.sectionTitle}> RNTester Examples</Text>
              {EXAMPLES.map(this._renderExample)}
            </React.Fragment>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    fontSize: 24,
    marginHorizontal: 8,
    marginTop: 24,
  },
  exampleContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  exampleTitle: {
    fontSize: 18,
  },
  exampleInnerContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 16,
  },
});
