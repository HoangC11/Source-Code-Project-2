

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomHeader from '../custom/CustomHeader'
import { statusApp } from '../custom/statusApp'
import { callDB } from '../sqliteDB/callDB'
import { formatNewDateToDate, formatNewDateToTime } from '../../utils/FormatTime'
import { arrayIsEmpty, objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
export default class DanhSachDonHang extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async getListDonHang() {
        const response = await callDB('Select * From DonHang')
        console.log('responseGetListDonHang: ', response)
        if (!arrayIsEmpty(response)) {
            this.setState({
                data: response.sort((a, b) => {
                    return a.Id < b.Id
                })
                // data: this.state.data.sort((a, b) => parseInt(a.Id))
            })
        }
    }
    async deleteDonHang(item) {
        const response = await callDB('DELETE From DonHang WHERE Id =' + item.Id + ';')
        console.log('DELETE DON HANG: ', response)
        this.getListDonHang()
    }
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            async () => {
                this.getListDonHang()
            }
        );

    }
    renderItem(item, index) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('DonHang', { status: statusApp.edit, item: item })
                }}
                onLongPress={() => {
                    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa đơn hàng này ?', [
                        {
                            text: 'Xác nhận',
                            onPress: () => {
                                this.deleteDonHang(item)
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

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: Sizes.h30, color: '#335272' }}>{item.MaDonHang}</Text>
                        <Text style={{ fontSize: Sizes.h30, color: '#335272' }}>{formatNewDateToDate(item.NgayTao)} {formatNewDateToTime(item.GioTao)}</Text>
                    </View>
                    <Text style={{ fontSize: Sizes.h30, color: '#0984e3', fontWeight: '700' }}>Loại đơn: {parseInt(item.LoaiDonHang) === 1 ? 'Xuất' : 'Nhập'}</Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Tên sản phẩm: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.TenSanPham}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Số lượng: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.SoLuong + ''}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Tổng giá: <Text style={{ fontSize: Sizes.h28, color: '#335272' }}>{item.TongGia + ''}</Text></Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Khách hàng: <Text style={{ fontSize: Sizes.h28, color: '#335272' }}>{item.TenKhachHang + ''}</Text></Text>
                    <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('MayIn')
                        }} style={{ padding: Sizes.s20, zIndex: 2, }}>
                            <Icon name='print' size={Sizes.h46} color={'#335272'} />
                        </TouchableOpacity>
                    </View>
                    {/* print */}
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
                            title={'Đơn hàng'}
                            iconRight={'plus'}
                            onPressRight={() => {
                                this.props.navigation.navigate('DonHang', { status: statusApp.add })
                            }}
                        />
                        <FlatList
                            style={{ flex: 1, flexGrow: 1 }}
                            keyExtractor={item => item.Id + ''}
                            data={this.state.data}
                            renderItem={({ item, index }) => {
                                return (
                                    this.renderItem(item, index)
                                )
                            }}
                        />
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
})