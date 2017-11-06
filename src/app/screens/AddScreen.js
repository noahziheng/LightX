/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Spinner, Icon, Text } from 'native-base'
import I18n from '../i18n'

export default class HomeScreen extends Component {
  componentDidMount () {
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
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner color='blue' />
            <Text>{I18n.t('loading')}</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

// const styles = StyleSheet.create({})
