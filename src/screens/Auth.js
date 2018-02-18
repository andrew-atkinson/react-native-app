import React, {Component} from 'react'
import {View, Text, Button, TextInput, StyleSheet, ImageBackground} from 'react-native'

import startMainTabs from './startMainTabs'
import DefaultInput from '../components/UI/DefaultInput'
import HeadingText from '../components/UI/HeadingText'
import MainText from '../components/UI/MainText'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'

import imageBackground from '../assets/bg.jpg'

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs()
  }

  render() {
    return (
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log in</HeadingText>
          </MainText>
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("YO!")}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your email address" style={styles.input}/>
            <DefaultInput placeholder="Your password" style={styles.input}/>
            <DefaultInput placeholder="confirm your password" style={styles.input}/>
          </View>
          <ButtonWithBackground  color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBackground:{
    flex:1
  },
  inputContainer: {
    width: "80%"
  },
  input:{
    borderColor:"#bbb",
    backgroundColor:"#eee"
  }
})

export default AuthScreen
