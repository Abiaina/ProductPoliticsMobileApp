import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal'; // 2.4.0


export default class About extends Component {
  state = {
    visibleModal: null,
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{ color:'white' }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
    <ScrollView>
      <View style={styles.data}>
        <Text style={styles.dataTitle}>How we work</Text>
        <Text> - Ever wonder about the companies you interact {'with'} everyday {'?'}</Text>
        <Text> - Scan any barcode {'of'} a product to learn the political impacts {'of'} your purchase</Text>
      </View>
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Data Sources</Text>
        <Text> - Open Secrets API</Text>
        <Text> - upcitemdb API</Text>
        <Text> - {'govtrack.us'}</Text>
      </View>
        {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      </ScrollView>
    </View>
  );

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  data: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'stretch',
    padding: 15,
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255, 0.2)',
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
