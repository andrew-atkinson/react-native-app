import React, {Component} from 'react'
import {View, Text, Button, TextInput, StyleSheet} from 'react-native'
import startMainTabs from './startMainTabs'
import DefaultInput from '../components/UI/DefaultInput'
import HeadingText from '../components/UI/HeadingText'
import MainText from '../components/UI/MainText'

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs()
  }

  render() {
    return (
      <View style={styles.container}>
        <MainText>
          <HeadingText>Please Log in</HeadingText>
        </MainText>
        <Button title="Switch to Login" onPress={this.loginHandler}/>
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Your email address" style={styles.input}/>
          <DefaultInput placeholder="Your password" style={styles.input}/>
          <DefaultInput placeholder="confirm your password" style={styles.input}/>
        </View>
        <Button title="Submit" onPress={this.loginHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
