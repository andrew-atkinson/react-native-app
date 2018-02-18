import React, { Component } from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import PlaceList from '../components/PlaceList'

class FindPlaceScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = e => {
    if (e.type === "NavBarButtonPress" && e.id === "SideDrawerToggle") {
      this.props.navigator.toggleDrawer({side: "left"})
    }
  }
  
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

