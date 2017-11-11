/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, List, ListItem, Spinner, Icon, Text } from 'native-base'
import I18n from '../i18n'
import EasyBluetooth from 'easy-bluetooth-classic'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      items: []
    }
    this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this))
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this))
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this))
    this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this))
  }

  onDeviceFound (device) {
    console.log('onDeviceFound')
    console.log(device)
  }

  onStatusChange (status) {
    console.log('onStatusChange')
    console.log(status)
  }

  onDataRead (data) {
    console.log('onDataRead')
    console.log(data)
  }

  onDeviceName (name) {
    console.log('onDeviceName')
    console.log(name)
  }

  componentDidMount () {
    let config = {
      uuid: '00001101-0000-1000-8000-00805f9b34fb',
      deviceName: 'Bluetooth Project',
      bufferSize: 1024,
      characterDelimiter: '\n'
    }
    EasyBluetooth.init(config)
      .then(function (config) {
        EasyBluetooth.startScan()
          .then(function (devices) {
            console.log('all devices found:')
            console.log(devices)
          })
          .catch(function (ex) {
            console.warn(ex)
          })
      })
      .catch(function (ex) {
        console.warn(ex)
      })
  }

  componentWillUnmount () {
    this.onDeviceFoundEvent.remove()
    this.onStatusChangeEvent.remove()
    this.onDataReadEvent.remove()
    this.onDeviceNameEvent.remove()
  }

  getContent () {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color='blue' />
          <Text>{I18n.t('loading')}</Text>
        </View>
      )
    } else {
      return (
        <List dataArray={this.state.items}
          renderRow={(item) =>
            <ListItem>
              <Text>{item}</Text>
            </ListItem>
          } />
      )
    }
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
          {this.getContent()}
        </Content>
      </Container>
    )
  }
}

// const styles = StyleSheet.create({})
