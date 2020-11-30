

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomHeader from '../custom/CustomHeader'
import { statusApp } from '../custom/statusApp'
import { stringIsEmpty, arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { callDB } from '../sqliteDB/callDB'
export default class DanhSachKhachHang extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKhachHang: []
        }
    }
    async componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            async () => {
                const response = await callDB('Select * From KhachHang')
                if (!arrayIsEmpty(response)) {
                    this.setState({
                        dataKhachHang: response
                    })
                }

            }
        );
    }
    async onDeleteKhachHang(item) {
        const res = await callDB('DELETE From KhachHang WHERE Id =' + item.Id + ';')
        // console.log('DELETE HangHoa: ', res)
        // this.getListDonHang()
        const response = await callDB('Select * From KhachHang')
        if (!arrayIsEmpty(response)) {
            this.setState({
                dataKhachHang: response
            })
        }
    }
    renderItem(item, index) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('KhachHang', { status: statusApp.edit, item: item })
                }}
                onLongPress={() => {
                    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa khách hàng này ?', [
                        {
                            text: 'Xác nhận',
                            onPress: () => {
                                this.onDeleteKhachHang(item)
                            }
                        },
                        {
                            text: 'Hủy',
                            onPress: () => {

                            }
                        }
                    ])
                }}
                style={{
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: Sizes.s5,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    paddingHorizontal: Sizes.s10,
                    paddingVertical: Sizes.s10,
                    alignItems: 'center',
                    marginHorizontal: Sizes.s10,
                    marginVertical: Sizes.s20,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowRadius: 2,
                    shadowOpacity: 0.25,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    elevation: 10,

                }}>
                {/* <Image source={{ uri: ('data:image/png;base64,' + item.FileHinhAnh) }} style={{ width: Sizes.s120, height: Sizes.s120, marginHorizontal: Sizes.s10 }} /> */}
                <View style={{ flex: 1, marginHorizontal: Sizes.s10, }}>
                    <Text style={{ fontSize: Sizes.h30, color: '#335272' }}>{item.MaKhachHang}</Text>
                    <Text style={{ fontSize: Sizes.h30, color: '#0984e3', fontWeight: '700' }}>{item.TenKhachHang}</Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Địa chỉ: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.DiaChi}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Số điện thoại: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.SoDienThoai}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Tổng tiền bán: <Text style={{ fontSize: Sizes.h28, color: '#335272' }}>{item.TongTienBan + ''}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Tổng tiền mua: <Text style={{ fontSize: Sizes.h28, color: '#335272' }}>{item.TongTienMua + ''}</Text></Text>
                </View>

            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <CustomHeader
                            title={'Danh sách khách hàng'}
                            iconRight={'plus'}
                            onPressRight={() => {
                                this.props.navigation.navigate('KhachHang', { status: statusApp.add })
                            }}
                        />
                        <FlatList
                            style={{ flex: 1, flexGrow: 1 }}
                            keyExtractor={item => item.Id + ''}
                            data={this.state.dataKhachHang}
                            renderItem={({ item, index }) => {
                                return (
                                    this.renderItem(item, index)
                                )
                            }}
                        />
                        {/* <ScrollView contentContainerStyle={styles.content} >
                            <CustomButton title={'Danh sách khách hàng'} onPress={() => {
                                // this.props.navigation.navigate('MyModal')
                            }} />
                        </ScrollView> */}
                    </KeyboardAvoidingView>
                </View>
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