import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal'; // 2.4.0


export default class About extends Component {


  render() {
    return (
      <View style={styles.container}>
        {this._renderButton('About', () => this.setState({ visibleModal: 1 }))}
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
