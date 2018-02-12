import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import PlaceList from './src/components/PlaceList'

export default class App extends Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangeHandler = val => {
    this.setState({placeName: val});
  }

  placeNameSubmitHandler = () => {
    if (this.state.placeName.trim() === '') 
      return;

    this.setState(prevState => {
      return {
        places: prevState.places.concat(this.state.placeName)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'A place to visit'}
            style={{
            width: 300
          }}
            value={this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
            style={styles.placeInput}/>
          <Button
            title='add'
            style={styles.placeButton}
            onPress={this.placeNameSubmitHandler}/>
        </View>
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
