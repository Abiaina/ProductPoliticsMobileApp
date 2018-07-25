import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import ScanContainer from './components/ScanContainer'
import ProductDetails from './components/ProductDetails'
import About from './components/About'
import Definition from './components/Definition'

import { BarCodeScanner, Permissions, LinearGradient } from 'expo';


export default class App extends React.Component {
  constructor() {
      super();
      this.state = {
        scanBarcode: false,
        barcodeData: null,
        home: true,
      };
      this.handleOnBarcodeScan = this.handleOnBarcodeScan.bind(this);
    }

  toggleState = () => {
    this.setState({
      scanBarcode: !this.state.scanBarcode,
      barcodeData: null,
      home: !this.state.home,
    });
  }

  resetHomeState = () => {
    this.setState({
      scanBarcode: false,
      barcodeData: null,
      home: true,
    });
  }

  homeButton () {
    return (
      <View>
        {this._renderButton('Home', this.resetHomeState)}
      </View>
    )
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{ color:'white' }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  scanButton () {
    return (
    <View>
      {this._renderButton('Scan', this.toggleState)}
    </View>
    )
  }


  showProduct() {
    return (
      <ProductDetails
        barcode={this.state.barcodeData}
      />
    )
  }

  showScanContainer() {
    return (
      <ScanContainer
        onBarcodeScan={this.handleOnBarcodeScan}
      />
    )
  }

  handleOnBarcodeScan(data) {
    this.setState({
      barcodeData: data,
      scanBarcode: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <LinearGradient
            colors={['white', 'rgb(30,144,255)']}
            style={{alignItems: 'center', flex: 1, alignSelf: 'stretch' }}>

          <View style={styles.header}>
            <Image source={require('./P2.png')}/>
            <Text style={{fontSize: 12,
              fontWeight: 'bold',}}>Product To Politics</Text>
          </View>
          <View style={styles.dataContainer}>
          {(this.state.barcodeData !== null) ?
             this.showProduct() : ((this.state.scanBarcode) ? this.showScanContainer() : this.scanButton())
          }
          </View>

          <View style={styles.navButtonContainer}>
            <View>
              {this.state.home ? <Text></Text> : this.homeButton()}
            </View>
            <Definition/>
            <About/>
          </View>

        </LinearGradient>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    header: {
      alignSelf: 'stretch',
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10,
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 10,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      width: 100,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    navButtonContainer: {
      alignSelf: 'center',
      height: 75,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: 10,
    },
    backgroundGradient: {
      left: 0,
      right: 0,
      top: 0,
      flex: 1,
      position: 'absolute',
    },
    dataContainer: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 10,
    },
    data: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 25,
    },
    dataText: {

    },
});
