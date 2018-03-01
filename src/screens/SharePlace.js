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

import PlaceInput from '../components/PlaceInput'
import MainText from '../components/UI/MainText'
import HeadingText from '../components/UI/HeadingText'
import PickImage from '../components/PickImage'
import PickLocation from '../components/PickLocation'

class SharePlaceScreen extends Component {
  state = {
    placeName: ""
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

  placeNameChangedHandler = val => {
    this.setState({placeName: val})
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName)
    }
  }

  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage/>
          <PickLocation/>
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}/>
          <View style={styles.button}>
            <Button title="Share the Place" onPress={this.placeAddedHandler}/>
          </View>
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
