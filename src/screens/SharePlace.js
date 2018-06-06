import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {addPlace} from '../store/actions'

import {startAddPlace} from '../store/actions'

import PlaceInput from '../components/PlaceInput'
import MainText from '../components/UI/MainText'
import HeadingText from '../components/UI/HeadingText'
import PickImage from '../components/PickImage'
import PickLocation from '../components/PickLocation'

import validate from '../utility/validation'
import { HIGHLIGHT } from '../assets/color';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: HIGHLIGHT
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  reset = () => {
    this.setState({
      placeName: '',
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
      },
      image: {
        value: null,
        valid: false
      }
    })
  }

  componentWillMount() {
    this.reset()
  }

  componentDidUpdate(){
    if (this.props.placeAdded) this.props.navigator.switchToTab({tabIndex: 0})
  }

  onNavigatorEvent = e => {
    if (e.type === 'ScreenChangedEvent' && e.id === 'eventWillAppear')
      this.props.startAddPlace()
    if (e.type === 'NavBarButtonPress' && e.id === 'SideDrawerToggle')
      this.props.navigator.toggleDrawer({side: 'left'})
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
    this.props.onAddPlace(
      this.state.placeName,
      this.state.location.value, 
      this.state.image.value,
    )
    this.reset()
    this.imagePicker.reset()
    this.locationPicker.reset()
  }

  locationPickedHandler = location => {
    this.setState(prevState => ({
      ...prevState,
      location: {
        value: location,
        valid: true
      }
    }))
  }

  imagePickedHandler = image => {
    this.setState(prevState =>({
      ...prevState,
      image: {
        value: image,
        valid: true
      }
    }))
  }

  render() {
    let submitButton = (
      <Button 
        title='Share the Place' 
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.valid ||
          !this.state.location.valid ||
          !this.state.image.valid
        }
      />
    )

    if (this.props.isLoading) {
      submitButton = (
        <ActivityIndicator/>
      )
    }
    return (
      <KeyboardAwareScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a place with us!</HeadingText>
            </MainText>
            <PickImage 
              onImagePicked={this.imagePickedHandler}
              ref={ref => (this.imagePicker = ref)}
            />
            <PickLocation 
              onPickLocation={this.locationPickedHandler}
              ref={ref => (this.locationPicker = ref)}
            />
              <PlaceInput
                placeName={this.state.placeName}
                onChangeText={val => this.placeNameChangedHandler(val)}
                valid={this.state.controls.valid}
                touched={this.state.controls.touched}
              />
            <View style={styles.button}>
              {submitButton}
            </View>
          </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  button: {
    margin: 8
  }
})

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  placeAdded: state.places.placeAdded
})

const mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
  onStartAddPlace: () => dispatch(startAddPlace())
})

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)
