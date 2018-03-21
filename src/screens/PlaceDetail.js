import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import {deletePlace} from '../store/actions'

import Icon from 'react-native-vector-icons/Ionicons'

class PlaceDetail extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  }

  constructor(props) {
    super(props)
    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500
        ? 'portrait'
        : 'landscape'
    })
  }

  deletePlaceHandler = () => {
    this.props.onDeletedPlace(this.props.selectedPlace.key)
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={this.state.viewMode === 'landscape' ? styles.landscapeContainer : styles.portraitContainer}>
        <Image source={this.props.selectedPlace.image} style={this.state.viewMode === 'landscape' ? styles.landscapePlaceImage : styles.portraitPlaceImage}/>
        <View>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          <TouchableOpacity onPress={this.deletePlaceHandler} style={styles.trash}>
            <Icon name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color='red' size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  portraitContainer: {
    margin: 22,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapeContainer: {
    margin: 22,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  portraitPlaceImage: {
    height: 200,
    width: '100%'
  },
  landscapePlaceImage: {
    height: 200,
    width: '60%'
  },
  placeName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20
  },
  trash: {
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onDeletedPlace: key => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)