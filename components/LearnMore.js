import React, { Component } from 'react';
import { Button, Linking, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';

export default class LearnMore extends Component {
  render() {
    return (
      <View style={styles.dataContainer}>

        <Button
          title="Open URL with Expo.WebBrowser"
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

});
