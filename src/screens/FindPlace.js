import React, { Component } from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import PlaceList from '../components/PlaceList'

class FindPlaceScreen extends Component {
  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => place.key === key)
    this.props.navigator.push({
      screen: "places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    })
  }

  render() {
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
      </View>
    )
  }
}

const MapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(MapStateToProps)(FindPlaceScreen)

