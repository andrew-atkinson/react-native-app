import React from 'react'
import {View} from 'react-native'
import ListItem from './ListItem'

const PlaceList = (props) => (
  <View style={{width: '100%'}}>
    {props
      .places
      .map((place, i) => (<ListItem placeName={place} key={i}/>))
    }
  </View>
)

export default PlaceList