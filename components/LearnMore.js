import React, { Component } from 'react';
import { Button, Linking, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';

export default class LearnMore extends Component {
  render() {
    return (
      <View style={styles.dataContainer}>

        <Button
          title="Learn More on Open Secrets"
          onPress={this._handleOpenWithWebBrowser}
          style={styles.button}
        />
      </View>
    );
  }


  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(this.props.link);
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 100,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
});
