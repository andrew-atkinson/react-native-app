import React from 'react'
import {FlatList} from 'react-native'
import ListItem from './ListItem'

const PlaceList = (props) => (
  <FlatList
    style={{width: '100%'}}
    data={props.places}
    renderItem={(info) => (
      <ListItem
        placeName={info.item.name}
        placeImage={info.item.image}
        onItemPressed={() => props.onItemSelected(info.item.key)}/>
      )
    }
  />
)

export default PlaceList