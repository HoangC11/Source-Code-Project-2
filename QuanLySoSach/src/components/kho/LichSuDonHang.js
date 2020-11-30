

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomHeader from '../custom/CustomHeader'
import { statusApp } from '../custom/statusApp'
import { stringIsEmpty, arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { callDB } from '../sqliteDB/callDB'
import { formatNewDateToDate, formatNewDateToTime } from '../../utils/FormatTime'
export default class LichSuDonHang extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps) {

    }
    renderItem(item, index) {
        return (
            <View
                onPress={() => {
                    // this.props.navigation.navigate('KhachHang', { status: statusApp.edit, item: item })
                }}
                style={{
                    width: '95%',
                    // alignSelf: 'center',
                    borderRadius: Sizes.s5,
                    backgroundColor: 'white',
                    // flexDirection: 'row',
                    paddingHorizontal: Sizes.s20,
                    paddingVertical: Sizes.s10,
                    // alignItems: 'center',
                    marginHorizontal: Sizes.s10,
                    marginVertical: Sizes.s20,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)',
                    // shadowRadius: 2,
                    // shadowOpacity: 0.25,
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 4,
                    // },
                    // elevation: 10,
                    borderColor: item.LoaiDonHang === 1 ? 'green' : 'blue',
                    borderWidth: Sizes.s2

                }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: Sizes.h30, color: item.LoaiDonHang === 1 ? 'green' : 'blue' }}>{parseInt(item.LoaiDonHang) === 1 ? 'Xuất' : 'Nhập'}</Text>
                    <Text style={{ fontSize: Sizes.h26, color: 'silver' }}>{formatNewDateToDate(item.NgayTao)} - {formatNewDateToTime(item.GioTao)}</Text>
                </View>
                <Text style={{ fontSize: Sizes.h28 }}>Mã sản phẩm: <Text style={{ fontSize: Sizes.h28, color: '#0984e3' }}>{item.MaSanPham}</Text></Text>
                <Text style={{ fontSize: Sizes.h30, color: '#0984e3', fontWeight: '700' }}>{item.TenSanPham}</Text>
                <Text style={{ fontSize: Sizes.h28 }}>Tên khách hàng: <Text style={{ fontSize: Sizes.h28, color: 'black', fontWeight: '700' }}>{item.TenKhachHang}</Text></Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: Sizes.h28 }}>Số lượng: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.SoLuong}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Thành tiền: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.SoLuong * item.GiaBan}</Text></Text>
                </View>
            </View>
        )
    }
    render() {
        const { dataDonHang } = this.props
        return (
            <FlatList
                renderItem={({ item, index }) => {
                    return (
                        this.renderItem(item, index)
                    )
                }}
                data={dataDonHang}
                keyExtractor={item => item.Id + ''}
                style={{ flex: 1, flexGrow: 1, }}>

            </FlatList>
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