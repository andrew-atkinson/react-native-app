import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'

export default class PlaceInput extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    placeName: ''
  }

  placeNameChangeHandler = val => {
    this.setState({placeName: val});
  }

  placeNameSubmitHandler = () => {
    if (this.state.placeName.trim() === '') {
      return;
    }

    this.props.onPlaceAdded(this.state.placeName)
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'A place to visit'}
          style={{width: 300}}
          onChangeText={this.placeNameChangeHandler}
          style={styles.placeInput}/>
        <Button
          title='add'
          style={styles.placeButton}
          onPress={this.placeNameSubmitHandler}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
})
