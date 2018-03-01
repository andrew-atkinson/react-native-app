import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import {connect} from 'react-redux'
import {deletePlace} from '../store/actions'

import Icon from 'react-native-vector-icons/Ionicons'

class PlaceDetail extends Component {
  deletePlaceHandler = () => {
    this.props.onDeletedPlace(this.props.selectedPlace.key)
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        <TouchableOpacity onPress={this.deletePlaceHandler} style={styles.trash}>
          <Icon name="ios-trash" color="red" size={30}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    height: 200,
    width: "100%"
  },
  placeName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20
  },
  trash: {
    alignItems: "center"
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onDeletedPlace: key => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)