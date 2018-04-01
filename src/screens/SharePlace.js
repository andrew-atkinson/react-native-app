import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {addPlace} from '../store/actions';

import PlaceInput from '../components/PlaceInput'
import MainText from '../components/UI/MainText'
import HeadingText from '../components/UI/HeadingText'
import PickImage from '../components/PickImage'
import PickLocation from '../components/PickLocation'

import validate from '../utility/validation'

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    placeName: "",
    controls: {
      valid: false,
      touched: false,
      validationRules: {
        notEmpty: true
      }
    },
    location: {
      value: null,
      valid: false
    }
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
    this.setState(prevState => ({
      ...prevState,
      placeName: val,
      controls: {
        ...prevState.controls,
        valid: validate(val, this.state.controls.validationRules),
        touched: true,
      }
    }))
  }

  placeAddedHandler = () => {
      this.props.onAddPlace(this.state.placeName, this.state.location.value)
  }

  locationPickedHandler = location => {
    this.setState(prevState => ({
      ...prevState.controls,
      location: {
        value: location,
        valid: true
      }
    }))
  }

  render() {
    return (
      <KeyboardAwareScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a place with us!</HeadingText>
            </MainText>
            <PickImage/>
            <PickLocation onPickLocation={this.locationPickedHandler}/>
              <PlaceInput
                placeName={this.state.placeName}
                onChangeText={val => this.placeNameChangedHandler(val)}
                valid={this.state.controls.valid}
                touched={this.state.controls.touched}
              />
            <View style={styles.button}>
              <Button 
              title="Share the Place" 
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.valid ||
                !this.state.location.valid
              }
            />
            </View>
          </View>
      </KeyboardAwareScrollView>
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
    onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
  }
}

export default connect(null, MapDispatchToProps)(SharePlaceScreen)
