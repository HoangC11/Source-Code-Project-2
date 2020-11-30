

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomHeader from '../custom/CustomHeader'
import { statusApp } from '../custom/statusApp'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import Form from '../form/Form'
import { themHangHoaForm } from '../form/FormInfo'
import { callDB } from '../sqliteDB/callDB'
export default class HangHoa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: themHangHoaForm()
        }
    }
    componentDidMount() {
        let value = this.props.navigation.getParam('item')
        if (!objectIsNull(value)) {
            let form = this.state.form
            for (let item of form) {
                switch (item.tag) {
                    case 'MaSP':
                        item.value = value.MaHangHoa
                        item.label = value.MaHangHoa
                        break
                    case 'TenSP':
                        item.value = value.TenHangHoa
                        item.label = value.TenHangHoa
                        break
                    case 'GiaBan':
                        item.value = value.GiaBan
                        item.label = value.GiaBan + ''
                        break
                    case 'GiaVon':
                        item.value = value.GiaVon
                        item.label = value.GiaVon + ''
                        break
                    case 'SoLuongTonKho':
                        item.value = value.SoLuongTonKho
                        item.label = value.SoLuongTonKho + ''
                        break
                    case 'SoLuongDaBan':
                        item.value = value.SoLuongDaBan
                        item.label = value.SoLuongDaBan + ''
                        break
                    case 'SoLuongDaMua':
                        item.value = value.SoLuongDaMua
                        item.label = value.SoLuongDaMua + ''
                        break
                    case 'ChonHinh':
                        item.label = value.HinhAnh
                        item.value = value.FileHinhAnh
                        break
                    default:
                        break
                }
            }
            this.setState({
                form: form
            })
        }
    }
    async onThemHangHoa() {
        const { form } = this.state
        let sql = "INSERT INTO HangHoa (Id, MaHangHoa, TenHangHoa, GiaBan, GiaVon, SoLuongTonKho, SoLuongDaBan, SoLuongDaMua, HinhAnh, FileHinhAnh) VALUES(null, "
        let input = {
            MaHangHoa: '',
            TenHangHoa: '',
            GiaBan: '',
            GiaVon: '',
            SoLuongTonKho: 0,
            SoLuongDaBan: 0,
            SoLuongDaMua: 0,
            HinhAnh: '',
            FileHinhAnh: ''
        }
        for (let item of form) {
            switch (item.tag) {
                case 'MaSP':
                    input.MaHangHoa = item.value
                    break
                case 'TenSP':
                    input.TenHangHoa = item.value
                    break
                case 'GiaBan':
                    input.GiaBan = item.value
                    break
                case 'GiaVon':
                    input.GiaVon = item.value
                    break
                case 'SoLuongTonKho':
                    input.SoLuongTonKho = item.value
                    break
                case 'SoLuongDaBan':
                    input.SoLuongDaBan = item.value
                    break
                case 'SoLuongDaMua':
                    input.SoLuongDaMua = item.value
                    break
                case 'ChonHinh':
                    input.HinhAnh = item.label
                    input.FileHinhAnh = item.value
                    break
                default:
                    break
            }
        }
        sql += `'${input.MaHangHoa}'` + ', ' + `'${input.TenHangHoa}'` + ', ' + parseInt(input.GiaBan) + ', ' + parseInt(input.GiaVon) + ', ' + parseInt(input.SoLuongTonKho) + ', ' + parseInt(input.SoLuongDaBan) + ', ' + parseInt(input.SoLuongDaMua) + ', ' + `'${input.HinhAnh}'` + ', ' + `'${input.FileHinhAnh}'` + ')'
        console.log('sqlData: ', sql)
        const response = await callDB(sql)
        Alert.alert('Thông báo', 'Thêm thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
    }
    async onCapNhatHangHoa() {
        let value = this.props.navigation.getParam('item')
        const { form } = this.state
        let sql = "UPDATE HangHoa SET "
        let input = {
            MaHangHoa: '',
            TenHangHoa: '',
            GiaBan: '',
            GiaVon: '',
            SoLuongTonKho: 0,
            SoLuongDaBan: 0,
            SoLuongDaMua: 0,
            HinhAnh: '',
            FileHinhAnh: ''
        }
        for (let item of form) {
            switch (item.tag) {
                case 'MaSP':
                    input.MaHangHoa = item.value
                    break
                case 'TenSP':
                    input.TenHangHoa = item.value
                    break
                case 'GiaBan':
                    input.GiaBan = item.value
                    break
                case 'GiaVon':
                    input.GiaVon = item.value
                    break
                case 'SoLuongTonKho':
                    input.SoLuongTonKho = item.value
                    break
                case 'SoLuongDaBan':
                    input.SoLuongDaBan = item.value
                    break
                case 'SoLuongDaMua':
                    input.SoLuongDaMua = item.value
                    break
                case 'ChonHinh':
                    input.HinhAnh = item.label
                    input.FileHinhAnh = item.value
                    break
                default:
                    break
            }
        }
        sql += `MaHangHoa = '${input.MaHangHoa}'` + ', ' + `TenHangHoa = '${input.TenHangHoa}'` + ', GiaBan = ' + parseInt(input.GiaBan) + ', GiaVon =' + parseInt(input.GiaVon) + ', SoLuongTonKho = ' + parseInt(input.SoLuongTonKho) + ', SoLuongDaBan = ' + parseInt(input.SoLuongDaBan) + ', SoLuongDaMua = ' + parseInt(input.SoLuongDaMua) + ', ' + `HinhAnh = '${input.HinhAnh}'` + ', ' + `FileHinhAnh = '${input.FileHinhAnh}' WHERE Id = ${value.Id}`
        console.log('sqlData: ', sql)
        const response = await callDB(sql)
        console.log('responseUpdateHangHoa: ', response)
        Alert.alert('Thông báo', 'Cập nhật thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
    }
    render() {
        const status = this.props.navigation.getParam('status')
        const { form } = this.state

        console.log('statusss: ', status)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <CustomHeader
                            iconLeft={'chevron-left'}
                            onPressLeft={() => { this.props.navigation.goBack() }}
                            title={status === statusApp.add ? 'Thêm hàng hóa'
                                :
                                'Hàng hóa'
                            }
                        // iconRight={'plus'} 
                        // onPressRight={() => {this.props.navigation.navigate('DonHang')}}
                        />
                        <Form form={form} />
                        <CustomButton title={status === statusApp.add ? 'Thêm'
                            : status === statusApp.edit ? 'Cập nhật'
                                :
                                'Hàng hóa'} onPress={() => {
                                    if (status === statusApp.add) {
                                        this.onThemHangHoa()
                                    } else if (status === statusApp.edit) {
                                        this.onCapNhatHangHoa()
                                    }
                                }} />
                        {/* <ScrollView contentContainerStyle={styles.content} >
                            <CustomButton title={'Hàng hóa'} onPress={() => {
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