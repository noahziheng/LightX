/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Modal, Alert, View, Slider, StyleSheet, TouchableOpacity, StatusBar, InteractionManager, ActivityIndicator } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base'
import I18n from '../i18n'
import IconM from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import IconO from 'react-native-vector-icons/dist/Octicons'
import Comm from '../comm'

export default class ControllScreen extends Component {
  constructor (props) {
    super(props)
    this.comm = Comm(this.props.navigation.state.params, this.onDataRead.bind(this), this.onStatusChange.bind(this))
    this.state = {
      light_status: false,
      light_brightness: 255,
      light_tempature: 255,
      modalVisible: false,
      color_primary: '#000',
      color_secondary: '#FFF',
      comm_status: this.comm.status
    }
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  onDataRead (data) {
    if (data[2] === 65) {
      this.setState({
        light_status: data[3] !== 0
      })
    } else if (data[2] === 66) {
      this.setState({
        light_brightness: data[3]
      })
    } else if (data[2] === 67) {
      this.setState({
        light_tempature: data[3]
      })
    }
  }

  onStatusChange (status) {
    this.setState({
      comm_status: status
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.light_status !== this.state.light_status) {
      nextState.color_primary = nextState.light_status ? '#FFF' : '#000'
      nextState.color_secondary = nextState.light_status ? '#000' : '#FFF'
    }
    return true
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      if (!this.comm.status) {
        this.comm.connect()
        this.comm.write([0x40])
      }
    })
  }

  componentWillUnmount () {
    this.comm.disconnect()
  }

  getContent () {
    if (this.state.comm_status) {
      return (<View style={{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onPress={() => {
          this.comm.write([0x41, (!this.state.light_status ? 0xFF : 0x00)])
          this.setState({
            light_status: !this.state.light_status
          })
        }}>
          <IconM name={this.state.light_status ? 'lightbulb-on-outline' : 'lightbulb-outline'} size={80} color={this.state.color_secondary} />
        </TouchableOpacity>
      </View>)
    } else {
      return (<View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingBottom: 40}}>
        <ActivityIndicator size='large' color='white' />
        <Text style={{fontSize: 24, color: '#FFF', padding: 10}}>{I18n.t('connecting')}</Text>
      </View>)
    }
  }

  render () {
    const styles = StyleSheet.create({
      primary: {
        backgroundColor: this.state.color_primary
      },
      secondary: {
        color: this.state.color_secondary
      }
    })
    const { goBack } = this.props.navigation
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
            <IconO name='settings'
              onPress={() => {
                this.comm.write([0x40])
                this.setModalVisible(true)
              }} style={styles.secondary} size={24} />
          </Right>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          {this.getContent()}
        </Content>
        <StatusBar
          backgroundColor={this.state.color_primary}
          barStyle={this.state.light_status ? 'dark-content' : 'light-content'}
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
                value={this.state.light_brightness}
                step={1}
                onSlidingComplete={(value) => {
                  this.comm.write([0x42, value])
                  this.setState({light_brightness: value})
                }}
                style={{ width: '80%' }} />
              <Text style={{fontSize: 24, padding: 10}}>{I18n.t('tempature')}</Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={this.state.light_tempature}
                step={1}
                onSlidingComplete={(value) => {
                  this.comm.write([0x43, value])
                  this.setState({light_tempature: value})
                }}
                style={{ width: '80%' }} />

            </View>
          </View>
        </Modal>
      </Container>
    )
  }
}
