import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import PlaceList from './src/components/PlaceList'
import PlaceInput from './src/components/PlaceInput'

export default class App extends Component {
  state = {
    places: []
  }

  onPlaceAdded = placeName => {
    this.setState(prevState => {
      return {
        places: prevState
          .places
          .concat(placeName)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.onPlaceAdded}/>
        <PlaceList places={this.state.places}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});
