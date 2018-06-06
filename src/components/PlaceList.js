import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import ListItem from './ListItem'

import { BACKGROUND_BLUE } from '../assets/color'

const PlaceList = (props) => (
  <FlatList
    style={styles.flatlist}
    data={props.places}
    renderItem={(info) => (
      <ListItem
        style={styles.listItem}
        placeName={info.item.name}
        placeImage={info.item.image}
        onItemPressed={() => props.onItemSelected(info.item.key)}/>
      )
    }
  />
)

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: BACKGROUND_BLUE,
    width: '100%'
  }
})

export default PlaceList