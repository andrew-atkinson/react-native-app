import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native'

import startMainTabs from './startMainTabs'
import DefaultInput from '../components/UI/DefaultInput'
import HeadingText from '../components/UI/HeadingText'
import MainText from '../components/UI/MainText'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'
import imageBackground from '../assets/bg.jpg'
import validate from '../utility/validation'

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
    controls:{
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password : {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword : {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        }
      },
    }
  }

  constructor(props) {
    super(props)
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500
        ? "portrait"
        : "landscape"
    })
  }

  loginHandler = () => {
    startMainTabs()
  }

  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo
      const equalValue = this.state.controls[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      const equalControl = 'password'
      const equalValue = this.state.controls[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
              ? validate(
                prevState.controls.confirmPassword.value,
                prevState.controls.confirmPassword.validationRules,
                connectedValue
              )
              : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key], 
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue)
          }
        }
      }
    }) 
  }

  render() {
    let headingText = null;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log in</HeadingText>
        </MainText>
      )
    }
    return (
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("YO!")}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder="Your email address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
            />
            <View
              style={this.state.viewMode === 'portrait'
              ? styles.portraitPasswordContainer
              : styles.landscapePasswordContainer}>
              <View
                style={this.state.viewMode === 'portrait'
                ? styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper}>
                <DefaultInput
                  placeholder="Your password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState('password', val)}
                />
              </View>
              <View
                style={this.state.viewMode === 'portrait'
                ? styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper}>
                <DefaultInput 
                  placeholder="confirm your password" 
                  style={styles.input}
                  value={this.state.controls.confirmPassword.value}
                  onChangeText={val => this.updateInputState('confirmPassword', val)}
                />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
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
  imageBackground: {
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    borderColor: "#bbb",
    backgroundColor: "#eee"
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  landscapePasswordWrapper: {
    width: '49%'
  }
})

export default AuthScreen
