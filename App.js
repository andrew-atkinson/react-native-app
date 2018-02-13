import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import PlaceList from './src/components/PlaceList'
import PlaceInput from './src/components/PlaceInput'
import PlaceDetail from './src/components/PlaceDetail'

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState
          .places
          .concat({
            key: Math.random(),
            name: placeName,
            image: {
              uri: "https://img.posterlounge.co.uk/images/wbig/poster-new-york-skyline-by-night-1636" +
                  "907.jpg"
            }
          })
      }
    })
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState
          .places
          .find(place => {
            return place.key === key
          })
      }
    })
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState
          .places
          .filter(place => {
            return place.key != prevState.selectedPlace.key
          }),
        selectedPlace: null
      }
    })
  }

  ModalClosedHandler = () => {
    this.setState({selectedPlace: null})
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.ModalClosedHandler}/>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}/>
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
