/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Form, Label, Item, Input } from 'native-base'
import I18n from '../i18n'
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
    this.state = {
      remark: ''
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
  /* this.storage.load({
    key: 'devices'
  }).then(ret => {
    console.log(ret)
    this.storage.save({
      key: 'devices',   // Note: Do not use underscore("_") in key!
      data: ret.concat(item)
    })
  }).catch(err => {
    console.warn(err.message)
  }) */

  btnSave () {
    const { state, navigate } = this.props.navigation
    this.storage.load({
      key: 'devices'
    }).then(ret => {
      this.storage.save({
        key: 'devices',   // Note: Do not use underscore("_") in key!
        data: ret.concat({...state.params.item, remark: this.state.remark})
      }).then(() => {
        navigate('Home')
      })
    }).catch(err => {
      console.warn(err.message)
    })
  }

  render () {
    const { state, goBack } = this.props.navigation
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={() => { goBack() }} />
            </Button>
          </Left>
          <Body>
            <Title>{state.params.item.name}</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          <Form>
            <Item floatingLabel last>
              <Label>{I18n.t('remark')}</Label>
              <Input onChangeText={(text) => this.setState({remark: text})} />
            </Item>
            <Button full onPress={this.btnSave.bind(this)}><Text>{I18n.t('save')}</Text></Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
