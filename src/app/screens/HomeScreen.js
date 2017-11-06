/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { ListView, AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Container, Header, Title, Content, Footer, FooterTab, Button, List, ListItem, Left, Right, Body, Icon, Text } from 'native-base'
import I18n from '../i18n'
import IconFA from 'react-native-vector-icons/dist/FontAwesome'
import Storage from 'react-native-storage'

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
      devices: [
        {
          ssid: 'LightX-1',
          remark: '测试灯具',
          type: 0
        }
      ]
    }
  }

  componentDidMount () {
    setInterval(() => {
      SplashScreen.hide()
    }, 1000)
  }

  _deleteRow (secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow()
    const newData = [...this.state.devices]
    newData.splice(rowId, 1)
    this.setState({ devices: newData })
  }

  render () {
    const { navigate } = this.props.navigation
    const commIcon = ['bluetooth', 'wifi']
    return (
      <Container>
        <Header>
          <Body>
            <Title>{I18n.t('choose_device')}</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.devices)}
            renderRow={item =>
              <ListItem>
                <Body>
                  <Text>
                    {item.remark}
                    <IconFA name={commIcon[item.type]} size={18} />
                  </Text>
                  <Text note>{item.ssid}</Text>
                </Body>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>}
            renderLeftHiddenRow={_ => null}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this._deleteRow(secId, rowId, rowMap)}>
                <Icon active name='trash' />
              </Button>}
            rightOpenValue={-75}
            enableEmptySections
          />
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
