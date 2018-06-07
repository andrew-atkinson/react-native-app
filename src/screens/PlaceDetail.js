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
import MapView from 'react-native-maps'
import {deletePlace} from '../store/actions'

import Icon from 'react-native-vector-icons/Ionicons'

class PlaceDetail extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500
      ? 'portrait'
      : 'landscape'
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
      <View
        style={this.state.viewMode === 'landscape'
          ? styles.landscapeContainer
          : styles.portraitContainer}
        >
        <Image
          source={this.props.selectedPlace.image}
          style={this.state.viewMode === 'landscape'
            ? styles.landscapePlaceImage
            : styles.portraitPlaceImage}
        />
        <View
          style={this.state.viewMode === 'landscape' 
            ? styles.landscapeWrapper 
            : styles.portraitWrapper}
        >
          <Text style={styles.placeName}>
            {this.props.selectedPlace.name}
          </Text>
          <TouchableOpacity onPress={this.deletePlaceHandler} style={styles.trash}>
            <Icon
              name={Platform.OS === 'android'
                ? 'md-trash'
                : 'ios-trash'}
              color='red'
              size={30}
            />
          </TouchableOpacity>
          <MapView
            style={styles.map}
            initialRegion={{
              longitude:this.props.selectedPlace.location.longitude,
              latitude:this.props.selectedPlace.location.latitude,
              latitudeDelta: 0.0122,
              longitudeDelta: 
              Dimensions.get('window').width 
              / Dimensions.get('window').height 
              * 0.0122
            }}
          >
            <MapView.Marker coordinate={this.props.selectedPlace.location}/>
          </MapView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  portraitContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapeContainer: {
    margin: 10,
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
    fontSize: 30
  },
  trash: {
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '50%'
  },
  landscapeWrapper: {
    width: '40%',
    paddingLeft: 10
  },
  portraitWrapper: {
    width: '100%',
    paddingLeft: 0
  }
})

const mapDispatchToProps = dispatch => ({onDeletedPlace: key => dispatch(deletePlace(key))})

export default connect(null, mapDispatchToProps)(PlaceDetail)