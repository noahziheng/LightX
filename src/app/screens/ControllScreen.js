/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Modal, Alert, View, Slider, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base'
import I18n from '../i18n'
import IconM from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconO from 'react-native-vector-icons/dist/Octicons'

export default class ControllScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      light: {
        status: false
      },
      modalVisible: false,
      ...this.updateColorState(true)
    }
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  updateColorState (init = false) {
    let val = (prevState, props) => {
      return {
        color_primary: !init && prevState.light.status ? '#FFF' : '#000',
        color_secondary: !init && prevState.light.status ? '#000' : '#FFF'
      }
    }
    if (init) return val(null, null)
    else this.setState(val)
  }

  componentDidMount () {
  }

  render () {
    const { navigate, goBack } = this.props.navigation
    const styles = StyleSheet.create({
      primary: {
        backgroundColor: this.state.color_primary
      },
      secondary: {
        color: this.state.color_secondary
      }
    })
    return (
      <Container style={styles.primary}>
        <Header style={styles.primary} noShadow>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={() => { goBack() }} style={styles.secondary} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.secondary}>{I18n.t('new_device')}</Title>
          </Body>
          <Right>
            <IconO name='settings' onPress={() => { this.setModalVisible(true) }} style={styles.secondary} size={24} />
          </Right>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }} onPress={() => {
              this.setState({
                light: {
                  status: !this.state.light.status
                }
              })
              this.updateColorState()
            }}>
              <IconM name={this.state.light.status ? 'lightbulb-on-outline' : 'lightbulb-outline'} size={80} color={this.state.color_secondary} />
            </TouchableOpacity>
          </View>
        </Content>
        <StatusBar
          backgroundColor={this.state.color_primary}
          barStyle={this.state.light.status ? 'dark-content' : 'light-content'}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.') }}
          >
          <View style={{alignItems: 'flex-end'}}>
            <IconM name='close' onPress={() => { this.setModalVisible(false) }} size={36} />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              paddingBottom: 40}}>
              <Text style={{fontSize: 24, padding: 10}}>{I18n.t('brightness')}</Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={1}
                step={1}
                onValueChange={(value) => console.log(value)}
                onSlidingComplete={(value) => global.alert(value)}
                style={{ width: '80%' }} />
              <Text style={{fontSize: 24, padding: 10}}>{I18n.t('tempature')}</Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={1}
                step={1}
                onValueChange={(value) => console.log(value)}
                onSlidingComplete={(value) => global.alert(value)}
                style={{ width: '80%' }} />

            </View>
          </View>
        </Modal>
      </Container>
    )
  }
}
