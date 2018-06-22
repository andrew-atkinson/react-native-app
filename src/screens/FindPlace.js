import React, { Component } from 'react'
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native'
import {connect} from 'react-redux'
import PlaceList from '../components/PlaceList'
import {getPlaces} from '../store/actions/index'

import { BACKGROUND_BLUE, HIGHLIGHT } from '../assets/color'

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: HIGHLIGHT
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
    if (e.type === 'ScreenChangedEvent' && e.id === 'willAppear')
      this.props.onLoadPlaces()
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
            onItemSelected={this.itemSelectedHandler}
            style={{backgroundColor: BACKGROUND_BLUE}}
          />
        </Animated.View>
      )
    } 
    return (
      <View style={[this.state.placesLoaded ? null : styles.buttonContainer, styles.basic]}>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  basic: {
    height:'100%',
    backgroundColor: BACKGROUND_BLUE
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    backgroundColor: BACKGROUND_BLUE
  },
  searchButton : {
    borderColor : HIGHLIGHT,
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchText: {
    color: HIGHLIGHT,
    fontWeight: "bold",
    fontSize: 26,
    fontFamily: 'Merriweather-Light'
  }
})

const mapStateToProps = state => ({places: state.places.places})

const mapDispatchToProps = dispatch => ({
  onLoadPlaces: () => dispatch(getPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen)

