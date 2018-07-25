import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Button, FlatList, Linking, ScrollView } from 'react-native';
import LearnMore from './LearnMore';
import { BarCodeScanner, Permissions, LinearGradient } from 'expo';




export default class ProductDetails extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        update: 'this is the initial value',
        backendUrl: `https://p4api.herokuapp.com/company_details/`,
        upcUrl: 'https://api.upcitemdb.com/prod/trial/lookup?upc=',
        status: 'none',
        brand:'unknown',
        parentCompany: "unknown",
        lobbyingDollars: "unknown",
        topRecipients: [],
        companyShareHolders: [],
        contributionDollars: "unknown",
        mostLobbiedBill: "unknown",
        mlbDescription: "unknown"
        };
    }

  getCompanyPolitics = () => {
    axios.get(this.state.backendUrl + this.state.brand)
    .then ((response) => {
      const data = response.data;

      this.setState({
        parentCompany: data.company_name,
        lobbyingDollars: data.lobbying_dollars,
        topRecipients: data.top_recipients,
        companyShareHolders: data.company_share_holders,
        contributionDollars: data.contribution_dollars,
        mostLobbiedBill: data.most_lobbied_bill,
        mlbDescription: data.mlb_description,
        companyOSID: data.company.opensecretid
      })
    })
    .catch((error) => {
      this.setState({
        status: error,
      })
    });
  }

  componentDidMount = () => {
    axios.get(this.state.upcUrl + String(this.props.barcode))
    .then ((response) => {
      this.setState({
        brand: response.data.items[0].brand,
      }, this.getCompanyPolitics)
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        status: error,
      })
    });
  }

  render() {
console.log(this.state.topRecipients);

    return (
      <ScrollView>
        <View style={styles.dataContainer}>
          <View style={styles.parentCompany}>
            <Text style={{ fontSize: 20,
              fontWeight: 'bold',}}>Political Activity of {this.state.parentCompany}</Text>
            <Text style={{ fontSize: 12,
              fontWeight: 'bold',}}>{this.state.brand} is a subsidiary of {this.state.parentCompany}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.dataTitle}>Lobbying Dollars</Text>
            <Text>{this.state.lobbyingDollars}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.dataTitle}>Contribution Dollars</Text>
            <Text>{this.state.contributionDollars}</Text>
          </View>

          <View style={styles.data}>
                <Text style={styles.dataTitle}>Top Contribution Dollar Recipients</Text>
                  <FlatList
                    data={this.state.topRecipients}
                    renderItem={({item}) => (
                      <Text> - {item.name}</Text>
                     )}
                  />
          </View>

          <View style={styles.data}>
                <Text style={styles.dataTitle}>Company Share Holders</Text>
                <FlatList
                  data={this.state.companyShareHolders}
                  renderItem={({item}) => (
                    <Text> - {item.name}</Text>
                   )}
                />
          </View>

          <View style={styles.data}>
            <Text style={styles.dataTitle}>Most Lobbied Bill</Text>
            <Text style={{fontWeight:'bold'}}>{this.state.mostLobbiedBill}</Text>
            <Text>{this.state.mlbDescription}</Text>
          </View>

          <View style={styles.data}>
            <LearnMore
              link={`https://www.opensecrets.org/orgs/summary.php?id=${this.state.companyOSID}`}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    alignSelf: 'stretch',
  },
  parentCompany: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  data: {
    flex: 1,
    alignItems: 'center',
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
