import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../store/actions';

import DefaultInput from '../components/UI/DefaultInput'
import MainText from '../components/UI/MainText'
import HeadingText from '../components/UI/HeadingText'
import imagePlaceholder from '../assets/bg.jpg'

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = e => {
    if (e.type === "NavBarButtonPress" && e.id === "SideDrawerToggle") {
      this.props.navigator.toggleDrawer({side: "left"})
    }
  }

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  }

  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <View style={styles.placeholder}>
            <Image source={imagePlaceholder} style={styles.previewImage}/>
          </View>
          <View style={styles.button}><Button title="Pick an Image"/></View>
          <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          <View style={styles.button}><Button title="locate me"/></View>
          <DefaultInput placeholder="Place Name"/>
          <View style={styles.button}><Button title="Share the Place"/></View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  button: {
    margin: 8
  }
})

const MapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, MapDispatchToProps)(SharePlaceScreen)
