import React from 'react'
import {
  Modal,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native"

import Icon from 'react-native-vector-icons/Ionicons'

const PlaceDetail = (props) => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <View>
        <Image source={props.selectedPlace.image} style={styles.placeImage}/>
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
    )
  }
  return (
    <Modal 
    onRequestClose={props.onModalClosed}
    visible={props.selectedPlace !== null} 
    animationType="slide">
      <View style={styles.modalContainer}>
        {modalContent}
        <TouchableOpacity onPress={props.onItemDeleted}>
          <Icon name="ios-trash" color="red" size={30} />
        </TouchableOpacity>
        <Button title="close" onPress={props.onModalClosed}/>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage:{
    height:200,
    width:"100%"
  }, 
  placeName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20
  }
})

export default PlaceDetail