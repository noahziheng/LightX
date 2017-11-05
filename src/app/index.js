/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

export default class App extends Component {
  componentDidMount () {
    setInterval(() => {
      SplashScreen.hide()
    }, 1000)
  }

  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>选择设备</Title>
          </Body>
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button active full vertical>
              <Icon name='add' />
              <Text>添加新设备</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

// const styles = StyleSheet.create({})
