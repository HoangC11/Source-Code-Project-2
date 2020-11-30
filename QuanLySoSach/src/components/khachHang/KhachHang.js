

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
import { themKhacHangForm } from '../form/FormInfo'
import { callDB } from '../sqliteDB/callDB'
export default class KhachHang extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: themKhacHangForm()
        }
    }
    componentDidMount() {
        let value = this.props.navigation.getParam('item')
        if (!objectIsNull(value)) {
            let form = this.state.form
            for (let item of form) {
                switch (item.tag) {
                    case 'MaKH':
                        item.value = value.MaKhachHang
                        item.label = value.MaKhachHang
                        break
                    case 'TenKH':
                        item.value = value.TenKhachHang
                        item.label = value.TenKhachHang
                        break
                    case 'DiaChi':
                        item.value = value.DiaChi
                        item.label = value.DiaChi
                        break
                    case 'SoDienThoai':
                        item.value = value.SoDienThoai
                        item.label = value.SoDienThoai
                        break
                    case 'TongTienBan':
                        item.value = value.TongTienBan
                        item.label = value.TongTienBan + ''
                        break
                    case 'TongTienMua':
                        item.value = value.TongTienMua
                        item.label = value.TongTienMua + ''
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
    async onCapNhatKhachHang() {
        let value = this.props.navigation.getParam('item')
        const { form } = this.state
        let sql = "UPDATE KhachHang SET "
        let input = {
            MaKhachHang: '',
            TenKhachHang: '',
            DiaChi: '',
            SoDienThoai: '',
            TongTienBan: 0,
            TongTienMua: 0
        }
        for (let item of form) {
            switch (item.tag) {
                case 'MaKH':
                    input.MaKhachHang = item.value
                    break
                case 'TenKH':
                    input.TenKhachHang = item.value
                    break
                case 'DiaChi':
                    input.DiaChi = item.value
                    break
                case 'SoDienThoai':
                    input.SoDienThoai = item.value
                    break
                case 'TongTienBan':
                    input.TongTienBan = item.value
                    break
                case 'TongTienMua':
                    input.TongTienMua = item.value
                    break
                default:
                    break
            }
        }
        sql += `MaKhachHang = '${input.MaKhachHang}'` + ', ' + `TenKhachHang = '${input.TenKhachHang}'` + ', ' + `DiaChi = '${input.DiaChi}'` + ', ' + `SoDienThoai = '${input.SoDienThoai}'` + ', TongTienBan = ' + parseInt(input.TongTienBan) + ', TongTienMua =' + parseInt(input.TongTienMua) + ` WHERE Id = ${value.Id}`
        console.log('sqlData: ', sql)
        const response = await callDB(sql)
        console.log('responseUpdateHangHoa: ', response)
        Alert.alert('Thông báo', 'Cập nhật thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
    }
    async onThemKhachHang() {
        const { form } = this.state
        let sql = "INSERT INTO KhachHang (Id, MaKhachHang, TenKhachHang, DiaChi, SoDienThoai, TongTienBan, TongTienMua) VALUES(null, "
        let input = {
            MaKhachHang: '',
            TenKhachHang: '',
            DiaChi: '',
            SoDienThoai: '',
            TongTienBan: 0,
            TongTienMua: 0
        }
        for (let item of form) {
            switch (item.tag) {
                case 'MaKH':
                    input.MaKhachHang = item.value
                    break
                case 'TenKH':
                    input.TenKhachHang = item.value
                    break
                case 'DiaChi':
                    input.DiaChi = item.value
                    break
                case 'SoDienThoai':
                    input.SoDienThoai = item.value
                    break
                case 'TongTienBan':
                    input.TongTienBan = item.value
                    break
                case 'TongTienMua':
                    input.TongTienMua = item.value
                    break
                default:
                    break
            }
        }
        sql += `'${input.MaKhachHang}'` + ', ' + `'${input.TenKhachHang}'` + ', ' + `'${input.DiaChi}'` + ', ' + `'${input.SoDienThoai}'` + ', ' + parseInt(input.TongTienBan) + ', ' + parseInt(input.TongTienMua) + ')'
        console.log('sqlData: ', sql)
        console.log('inputData: ', input)
        const response = await callDB(sql)
        Alert.alert('Thông báo', 'Thêm thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
    }
    render() {
        const status = this.props.navigation.getParam('status')
        const { form } = this.state
        // console.log('form: ', form)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <CustomHeader
                            iconLeft={'chevron-left'}
                            onPressLeft={() => { this.props.navigation.goBack() }}
                            title={status === statusApp.add ? 'Thêm khách hàng'
                                :
                                'Khách hàng'
                            }
                        // iconRight={'plus'} 
                        // onPressRight={() => {this.props.navigation.navigate('DonHang')}}
                        />
                        <Form form={form} />
                        <CustomButton title={status === statusApp.add ? 'Thêm'
                            : status === statusApp.edit ? 'Cập nhật'
                                :
                                'Khách hàng'} onPress={() => {
                                    if (status === statusApp.add) {
                                        this.onThemKhachHang()
                                    } else if (status === statusApp.edit) {
                                        this.onCapNhatKhachHang()
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