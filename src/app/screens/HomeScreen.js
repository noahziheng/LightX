/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ListView, AsyncStorage, PermissionsAndroid, InteractionManager } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Container, Header, Title, Content, Footer, FooterTab, Button, List, ListItem, Body, Icon, Text } from 'native-base'
import I18n from '../i18n'
import IconFA from 'react-native-vector-icons/dist/FontAwesome'
import Storage from 'react-native-storage'
import EasyBluetooth from 'easy-bluetooth-classic'
import { BluetoothStatus } from 'react-native-bluetooth-status'
import WiFi from 'react-native-android-wifi'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.storage = new Storage({
      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: AsyncStorage,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: null
    })
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      devices: []
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.requestPermission()
      this.toggleBluetooth()
      this.toggleWiFi()
      this.storage.load({
        key: 'devices'
      }).then(ret => {
        console.log(ret)
        this.setState({devices: ret})
      }).catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            this.storage.save({
              key: 'devices',
              data: []
            })
            break
        }
      })
      SplashScreen.hide()
    })
  }

  async requestPermission () {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ])
      for (let key in granted) {
        if (granted.hasOwnProperty(key)) {
          if (granted[key] === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Got permission ' + key + ' !')
          } else {
            console.log('Got permission ' + key + ' failed!')
          }
        }
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async toggleBluetooth () {
    try {
      const isEnabled = await BluetoothStatus.state()
      if (!isEnabled) BluetoothStatus.enable(true)
      let config = {
        uuid: '00001101-0000-1000-8000-00805f9b34fb',
        deviceName: 'Bluetooth Project',
        bufferSize: 1024,
        characterDelimiter: String.fromCharCode(0xFA)
      }
      EasyBluetooth.init(config)
        .then(function (config) {
          console.log('Bluetooth inited!', config)
        })
        .catch(function (ex) {
          console.warn(ex)
        })
    } catch (error) { console.error(error) }
  }

  toggleWiFi () {
    WiFi.isEnabled(isEnabled => {
      if (!isEnabled) WiFi.setEnabled(true)
    })
  }

  getList (navigate) {
    const commIcon = ['bluetooth', 'wifi']
    if (this.state.devices.length > 0) {
      return (
        <List
          dataSource={this.ds.cloneWithRows(this.state.devices)}
          renderRow={item =>
            <ListItem style={{height: 100}} onPress={() => {
              navigate('Controll', item)
            }}>
              <Body style={{paddingLeft: 20}}>
                <Text style={{fontSize: 20}}>
                  {item.remark}
                  <IconFA name={commIcon[item.type]} size={18} />
                </Text>
                <Text style={{fontSize: 16}} note>{item.name}</Text>
              </Body>
            </ListItem>}
          renderLeftHiddenRow={_ => null}
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={_ => this._deleteRow(secId, rowId, rowMap)}>
              <Icon active name='trash' />
            </Button>}
          leftOpenValue={0}
          rightOpenValue={-75}
          enableEmptySections
        />
      )
    } else {
      return (
        <View style={{marginTop: 20, alignItems: 'center'}}><Text style={{color: '#666'}}>没有可用设备</Text></View>
      )
    }
  }

  _deleteRow (secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow()
    const newData = [...this.state.devices]
    newData.splice(rowId, 1)
    this.setState({ devices: newData })
    this.storage.save({
      key: 'devices',   // Note: Do not use underscore("_") in key!
      data: newData
    })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header>
          <Body>
            <Title>{I18n.t('choose_device')}</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          {this.getList(navigate)}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              active
              full
              vertical
              onPress={() =>
                navigate('Add')
              }>
              <Icon name='add' />
              <Text>{I18n.t('add')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

// const styles = StyleSheet.create({})
