import React, {Component} from 'react'
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'

import {authLogout} from '../store/actions/auth'

import {WHITE} from '../assets/color'

class SideDrawerScreen extends Component {
  render() {
    return (
      <View
          style={[
            styles.container, {
              width: Dimensions.get("window").width * 0.8
          }
        ]}>
          <ImageBackground
            source={require('../assets/leaves.png')}
            style={styles.background}>
            <View style={{
              padding: 10, 
              paddingTop: 30,
              paddingLeft: 3
            }}>
              <TouchableOpacity onPress={this.props.onLogout}>
                <View style={styles.drawerItem}>
                  <Icon
                    name={Platform.OS === 'android'
                      ? "md-log-out"
                      : "ios-log-out"}
                    color={'#fff'}
                    size={30}
                    style={styles.drawerItemIcon}/>
                  <Text style={styles.drawerText}>
                    Sign Out
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerItem}>
                  <Icon
                    name={Platform.OS === 'android'
                      ? "md-settings"
                      : "ios-settings"}
                    color={'#fff'}
                    size={30}
                    style={styles.drawerItemIcon}/>
                  <Text style={styles.drawerText}>
                    Settings
                  </Text>
                </View>
              </TouchableOpacity>
            </View>  
          </ImageBackground>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1,
    paddingTop: 0
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#5CA7E5b0',
    padding: 10,
    margin: 3
  },
  drawerItemIcon: {
    marginRight: 10
  },
  background: {
    width: '100%',
    height: '100%'
  },
  drawerText: {
    fontFamily:'Merriweather-Light',
    color: WHITE,
    fontSize: 30
  }
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authLogout())
})

export default connect(null, mapDispatchToProps)(SideDrawerScreen)