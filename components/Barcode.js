import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import ProductDetails from './ProductDetails';
import BarcodeScanner from './BarcodeScanner';

export default class Barcode extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        showProduct: false,
      };
    }

  toggleState = () => {
    this.setState({
        showProduct: !this.state.showProduct
      });
  }

  showDetails() {
    if(this.state.showProduct){
      return(
        // this should be a call to the barcode Scanner
        <BarcodeScanner/>
        <ProductDetails
          barcode={this.props.barcode}
        />
      )
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.toggleState}
          title="Company Details"
          color="#841500"
          accessibilityLabel="Show the product scanned and company info"
          />
          {this.showDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
