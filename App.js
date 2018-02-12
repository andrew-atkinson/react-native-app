import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import PlaceList from './src/components/PlaceList'
import PlaceInput from './src/components/PlaceInput'
import placeImage from './src/assets/freedomTower.jpg'

export default class App extends Component {
  state = {
    places: []
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState
          .places
          .concat({key:Math.random(),
            name:placeName,
            image: placeImage
          })
      }
    })
  }

  placeDeletedHandler = key => {
    this.setState(prevState =>{
      return {
        places: prevState.places.filter(place=>{
          return place.key != key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
        <PlaceList places={this.state.places} onItemDeleted={this.placeDeletedHandler}/>
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
