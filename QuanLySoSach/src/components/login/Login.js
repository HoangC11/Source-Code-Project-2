

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Modal, TouchableWithoutFeedback, AsyncStorage, Alert } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Xác nhận vân tay', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Vân tay', // Android
  sensorErrorDescription: 'Lỗi', // Android
  cancelText: 'Hủy', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      textChangeCode: '',
      textCode: ''
    }
  }
  onChangeVisibleModal(visible) {
    this.setState({
      modalVisible: visible
    })
  }
  _pressHandler() {
    TouchID.authenticate('Vui lòng thực hiện xác nhận vân tay để xác thực tài khoản !', optionalConfigObject)
      .then(success => {
        // AlertIOS.alert('Authenticated Successfully');
        console.log('zzzzzzzzzzzzz: success: ', success)
        this.props.navigation.navigate('MyModal')
      })
      .catch(error => {
        // AlertIOS.alert('Authentication Failed');
        console.log('errrrrrorrrr: error: ', error)
      });
  }
  render() {
    const { modalVisible, textChangeCode, textCode } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.body}>
          <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.content} >
              <TouchableOpacity
                onLongPress={() => {
                  this.onChangeVisibleModal(true)
                }}
                activeOpacity={1}
              >
                <Image
                  source={require('../../res/images/logo_app_3.png')}
                  style={{ width: 200, height: 200, marginBottom: Sizes.s30 }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: Sizes.h40, fontWeight: '700', color: '#335272', marginVertical: Sizes.s20, }}>Nhập mã code</Text>
              <TextInput
                style={{ paddingVertical: Sizes.s10, width: '80%', borderWidth: 1, marginHorizontal: Sizes.s30, paddingHorizontal: Sizes.s20, }}
                value={textCode}
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({ textCode: text }) }}
              />
              <View style={{ width: '60%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton title={'Bắt đầu'} onPress={async () => {
                  try {
                    let code = await AsyncStorage.getItem('code') 
                    if (!objectIsNull(code)) {
                      if (textCode === code) {
                        this.props.navigation.navigate('MyModal')
                      } else {
                        Alert.alert('Thông báo', 'Mã code đăng nhập không chính xác. Vui lòng nhập lại. ', [{
                          text: 'Đóng',
                          onPress: () => { }
                        }])
                      }
                    } else {
                      Alert.alert('Thông báo', 'Mã code đăng nhập không chính xác ', [{
                        text: 'Đóng',
                        onPress: () => { }
                      }])
                    }
                  } catch (error) {

                  }

                }} />

                <TouchableOpacity 
                onPress={() => {
                  this._pressHandler()
                }}
                style={{
                  marginHorizontal: Sizes.s20,
                  paddingHorizontal: Sizes.s20,
                }}>
                  <Icon name={'fingerprint'} size={Sizes.h65} />
                </TouchableOpacity>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.onChangeVisibleModal(false)
            // Alert.alert("Modal has been closed.");
          }}>
          <TouchableOpacity
            onPress={() => {
              this.onChangeVisibleModal(false)
            }}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 0,
            }}
          >
            <TouchableWithoutFeedback>
              <View style={{
                width: '90%',
                // height: Dimensions.get('window').height / 6 * 4,
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: Sizes.s5,
                // borderTopLeftRadius: Sizes.s20,
                paddingVertical: Sizes.s20,
                paddingHorizontal: Sizes.s20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: Sizes.h40, fontWeight: '700', color: '#335272', marginVertical: Sizes.s20, }}>Thay đổi mã code</Text>

                <TextInput
                  style={{ paddingVertical: Sizes.s10, width: '100%', borderWidth: 1, }}
                  value={textChangeCode}
                  onChangeText={(text) => { this.setState({ textChangeCode: text }) }}
                />
                <CustomButton title={'Xác nhận'} onPress={async () => {
                  try {
                    await AsyncStorage.setItem('code', textChangeCode.trim())
                    this.onChangeVisibleModal(false)
                  } catch (error) {

                  }
                  // this.props.navigation.navigate('MyModal')
                }} />
                {/* <FlatList
                  data={arrayIsEmpty(items) ? [] : items}
                  keyExtractor={item => item.Id + ''}
                  renderItem={({ item, index }) => {
                    return this.renderItem(item, index)
                  }}
                /> */}

              </View>
            </TouchableWithoutFeedback>

          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    padding: Sizes.h20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow'
  },
  title: {
    fontSize: Sizes.s70,
    color: '#2980b9',
    fontWeight: 'bold',
    marginVertical: Sizes.h20
  },
  username: {
    paddingVertical: Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.h10,
    borderWidth: 1,
    borderRadius: Sizes.h52,
    width: '90%',
  },
  password: {
    paddingVertical: Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.h10,
    borderWidth: 1,
    borderRadius: Sizes.h52,
    width: '90%',
  },
  textInput: {
    marginHorizontal: Sizes.h20,
    fontSize: Sizes.s35,
    paddingHorizontal: Sizes.s20
  },
  function: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: Sizes.h20,
    alignItems: 'center'
  },

  showPassword: {
    flexDirection: 'row',
    marginHorizontal: Sizes.h20,
    alignItems: 'center',
  },
  textShowPassword: {
    marginHorizontal: Sizes.h20,
    fontSize: Sizes.s30
  },
  textForgotPassword: {
    marginHorizontal: Sizes.h20,
    fontSize: Sizes.s35,
    color: 'blue'
  },

  bottom: {
    padding: Sizes.h20,
  },
})