import React, { Component } from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import PlaceList from '../components/PlaceList'

class FindPlaceScreen extends Component {
  render() {
    return (
      <View>
        <PlaceList places={this.props.places}/>
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

