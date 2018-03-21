import React, { Component } from 'react'
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native'
import {connect} from 'react-redux'
import PlaceList from '../components/PlaceList'

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    fadeList: new Animated.Value(0)
  }

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

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
        this.setState({placesLoaded: true})
        this.placesLoadedHandler()
      }
    )
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.fadeList, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  render() {
    let content = (
      <Animated.View 
        style={{
          opacity: this.state.removeAnim,
          transform: [{
            scale: this.state.removeAnim.interpolate({
              inputRange: [0,1],
              outputRange:[12, 1]
            })
          }]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )

    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.fadeList
          }}
        >
          <PlaceList 
            places={this.props.places} 
            onItemSelected={this.itemSelectedHandler}/
          >
        </Animated.View>
      )
    } 
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton : {
    borderColor : "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
})

const MapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(MapStateToProps)(FindPlaceScreen)

