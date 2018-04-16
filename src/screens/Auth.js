import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'

import DefaultInput from '../components/UI/DefaultInput'
import HeadingText from '../components/UI/HeadingText'
import MainText from '../components/UI/MainText'
import ButtonWithBackground from '../components/UI/ButtonWithBackground'
import imageBackground from '../assets/bg.jpg'
import validate from '../utility/validation'
import {tryAuth} from '../store/actions/index'

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
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

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
      authMode: prevState.authMode === 'login'
        ? 'signUp'
        : 'login'
      }
    })
  }

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }
    this.props.onTryAuth(authData, this.state.authMode)
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
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => ({
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
              ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
              : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
    }))
  }

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    let submitButton = (<ButtonWithBackground
      color="#29aaf4"
      onPress={this.authHandler}
      disabled={
        !this.state.controls.email.valid || 
        !this.state.controls.password.valid || 
        !this.state.controls.confirmPassword.valid && this.state.authMode === 'signUp'
      }>Submit</ButtonWithBackground>)

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log in</HeadingText>
        </MainText>
      )
    }

    if (this.state.authMode === 'signUp') {
      confirmPasswordControl = (
        <View
          style={this.state.viewMode === 'portrait'
          ? styles.portraitPasswordWrapper
          : styles.landscapePasswordWrapper}
        >
          <DefaultInput
            placeholder="confirm your password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
            />
        </View>
      )
    }

    if (this.props.isLoading) {
      submitButton = (<ActivityIndicator/>)
    }

    return (
      <ImageBackground 
        source={imageBackground} 
        style={styles.imageBackground}>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior="padding">
          {headingText}
          <ButtonWithBackground 
            color="#29aaf4" 
            onPress={this.switchAuthModeHandler}>
              Switch to {
                this.state.authMode === 'login' 
                  ? 'Sign Up' 
                  : 'Log in'
                }
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your email address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'  
              />
              <View style={
                this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Your password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => ({onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))})


const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
