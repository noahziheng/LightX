/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, List, ListItem, Spinner, Icon, Text } from 'native-base'
import I18n from '../i18n'
import IconFA from 'react-native-vector-icons/dist/FontAwesome'
import EasyBluetooth from 'easy-bluetooth-classic'
import WiFi from 'react-native-android-wifi'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      items: []
    }
    this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this))
  }

  onDeviceFound (device) {
    if (device.name.indexOf('LightX-') !== -1) {
      device.type = 0
      this.setState({loading: false, items: this.state.items.concat(device)})
    }
  }

  componentDidMount () {
    EasyBluetooth.startScan()
      .then(devices => {
        // this.setState({loading: false})
      })
      .catch(function (ex) {
        console.warn(ex)
      })
    WiFi.reScanAndLoadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList)
      this.setState({
        loading: false,
        items: this.state.items.concat(wifiArray.filter((device) => {
          return device.SSID.indexOf('LightX-') !== -1
        }).map((device) => {
          return {
            type: 1,
            name: device.SSID,
            address: device.BSSID
          }
        }))
      })
    }, console.error.bind(this))
  }

  componentWillUnmount () {
    this.onDeviceFoundEvent.remove()
    EasyBluetooth.stopScan()
  }

  getList (navigate) {
    const commIcon = ['bluetooth', 'wifi']
    if (this.state.items.length > 0) {
      return (
        <List dataArray={this.state.items}
          renderRow={(item) =>
            <ListItem style={{marginLeft: 0, paddingLeft: 20}} onPress={() => {
              navigate('FinishAdd', { item })
            }}>
              <Text>
                {item.name}
                <IconFA name={commIcon[item.type]} size={18} style={{marginLeft: 20}} />
              </Text>
            </ListItem>
          }
          enableEmptySections />
      )
    } else {
      if (this.state.loading) return null
      else {
        return (
          <View style={{marginTop: 20, alignItems: 'center'}}><Text style={{color: '#666'}}>没有可用设备</Text></View>
        )
      }
    }
  }

  getLoading () {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color='blue' />
          <Text>{I18n.t('loading')}</Text>
        </View>
      )
    } else return null
  }

  render () {
    const { navigate, goBack } = this.props.navigation
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={() => { goBack() }} />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('new_device')}</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          {this.getList(navigate)}
          {this.getLoading()}
        </Content>
      </Container>
    )
  }
}
