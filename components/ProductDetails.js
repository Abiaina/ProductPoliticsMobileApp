import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Button, FlatList, Linking, ScrollView } from 'react-native';
import LearnMore from './LearnMore';
import { BarCodeScanner, Permissions, LinearGradient } from 'expo';




export default class ProductDetails extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        backendUrl: `https://product2politics.herokuapp.com/company_details/`,
        status: false,
        };
    }

  componentDidMount = () => {
    axios.get(this.state.backendUrl + String(this.props.barcode))
    .then ((response) => {
      console.log(response.data.product_url)
      const data = response.data;

      this.setState({
        parentCompany: data.company_name,
        lobbyingDollars: data.lobbying_dollars,
        topRecipients: data.top_recipients,
        companyShareHolders: data.company_share_holders,
        contributionDollars: data.contribution_dollars,
        mostLobbiedBill: data.most_lobbied_bill,
        mlbDescription: data.mlb_description,
        companyOSID: String(data.opensecretid),
        imageURL: String(data.product_url)
      })
    })
    .catch((error) => {
      this.setState({
        status: "No data on that barcode. Please return to homepage and scan another."
      });
    });
  }

  showDetails = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.parentCompany}>
        <Text style={{ fontSize: 20,
          fontWeight: 'bold', paddingBottom: 10}}>Political Activity of {this.state.parentCompany}</Text>
          <View style={styles.image}>
            <Image
              style={{height: 50, width: 50, resizeMode: 'contain'}}
             source={{uri: this.state.imageURL}}
             />
           </View>
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
    )
  }

  showMessage = () => {
    return (
      <View style={styles.containerMessage}>
        <Text style={{ fontSize: 20,
          fontWeight: 'bold',}}>{this.state.status}</Text>
      </View>
    )
  }

  render() {

    return (
      <View>
        {this.state.status ? this.showMessage() : this.showDetails()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 15,
    alignSelf: 'stretch',
  },
  parentCompany: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 8,

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
