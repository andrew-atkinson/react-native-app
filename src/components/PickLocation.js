import React, {Component} from 'react'
import {View, Button, Text, StyleSheet, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

class PickLocation extends Component {
  state = {
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
  }

  pickLocationHandler = event => {
    const coord = event.nativeEvent.coordinate;
    this.setState(prevstate => ({
      focusedLocation: {
        ...prevstate.focusedLocation,
        latitude: coord.latitude,
        longitude: coord.longitude
      },
      locationChosen: true
    }))
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
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button 
            title="locate me" 
            onPress={() => alert('pick location')}/>
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