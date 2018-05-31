import React, {Component} from 'react'
import {View, Button, Text, StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

class PickLocation extends Component {
  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 40.7742319, 
        longitude: -73.9709161,
        latitudeDelta: 0.0122,
        longitudeDelta: 
          Dimensions.get('window').width 
          / Dimensions.get('window').height 
          * 0.0122
      },
      locationChosen: false
    })
  }

  componentWillMount(){
    this.reset()
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude 
    })
    this.setState(prevstate => ({
      focusedLocation: {
        ...prevstate.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    }))
    this.props.onPickLocation({
      latitude: coords.latitude,
      longitude: coords.longitude 
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocationHandler(coordsEvent);
    }, 
    err => {
      console.log(err);
      alert("Geolocation failed, please pick a location manually")
    }
  )
  }

  render() {
    let marker =  null
    if (this.state.locationChosen) {
      marker = (<MapView.Marker coordinate={this.state.focusedLocation}/>)
    }

    return (
      <View style={styles.container}>
        <MapView 
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button 
            title="locate me" 
            onPress={this.getLocationHandler}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
})

export default PickLocation