

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomHeader from '../custom/CustomHeader'
import CustomMenuTab from '../custom/CustomMenuTab'
import LichSuDonHang from './LichSuDonHang'
import ThongKe from './ThongKe'
import TonKho from './TonKho'
import { callDB } from '../sqliteDB/callDB'
import { arrayIsEmpty, objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
export default class Kho extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listTab: [
                {
                    id: '1',
                    title: 'Tồn kho',
                    selected: true,
                },
                {
                    id: '2',
                    title: 'Lịch sử đơn hàng',
                    selected: false,
                },
                {
                    id: '3',
                    title: 'Thống kê',
                    selected: false,
                }
            ],
            dataHangHoa: [],
            dataDonHang: [],
            dataThongKe: [],
        }
    }
    async getListHangHoa() {
        const response = await callDB('Select * From HangHoa')

        if (!arrayIsEmpty(response)) {
            this.setState({
                dataHangHoa: response
            })
        }
    }
    async getListDonHang() {
        const response = await callDB('Select * From DonHang Join HangHoa Where DonHang.MaSanPham = HangHoa.Id')
        if (!arrayIsEmpty(response)) {
            this.setState({
                dataDonHang: response.sort((a, b) => {
                    return a.Id < b.Id
                })
            }, () => {
                let list = []
                for (let item of this.state.dataDonHang) {
                    let filters = list.filter((value) => {
                        return value.MaSanPham === item.MaSanPham
                    })
                    if (arrayIsEmpty(filters)) {

                        list.push({
                            MaSanPham: item.MaSanPham,
                            TenSanPham: item.TenSanPham,
                            SoLuong: 0,
                            Tong: 0,
                            HinhAnh: item.FileHinhAnh
                        })
                    }
                }
                list = list.map((val) => {
                    let sp = val
                    for (let it of this.state.dataDonHang) {
                        if (it.MaSanPham === sp.MaSanPham) {
                            sp.SoLuong += it.SoLuong
                            sp.Tong += it.TongGia
                        }
                    }
                    return sp
                })
                this.setState({
                    dataThongKe: list.sort((x, y) => {
                        return x.Tong < y.Tong
                    })
                }, () => {
                    // console.log('dataThongKe - : ', this.state.dataThongKe)
                })
            })
        }
    }

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            async () => {
                this.getListHangHoa()
                this.getListDonHang()
            }
        );

    }
    onChangeTab = (value) => {
        let list = this.state.listTab.map((item) => {
            if (item.id === value.id) {
                return Object.assign(item, { selected: true })
            } else {
                return Object.assign(item, { selected: false })
            }
        })
        this.setState({
            listTab: list
        })
    }
    render() {
        const { listTab, dataHangHoa, dataDonHang, dataThongKe } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <CustomHeader
                        // iconLeft={'chevron-left'}
                        // onPressLeft={() => { this.props.navigation.goBack() }}
                        title={'Kho'}
                    />
                    <CustomMenuTab listTab={listTab} onChangeTab={this.onChangeTab} />
                    {listTab[0].selected ?
                        <TonKho dataHangHoa={dataHangHoa} />
                        : listTab[1].selected ?
                            <LichSuDonHang dataDonHang={dataDonHang} />
                            : <ThongKe dataThongKe={dataThongKe} />
                    }
                    {/* <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={styles.content} >
                            <CustomButton title={'Kho hàng'} onPress={() => {
                                // this.props.navigation.navigate('MyModal')
                            }} />
                        </ScrollView>
                    </KeyboardAvoidingView> */}
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
    // header: {
    //     padding: Sizes.h20,
    // },
    // content: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // logo: {
    //     width: 150,
    //     height: 150,
    //     backgroundColor: 'yellow'
    // },
    // title: {
    //     fontSize: Sizes.s70,
    //     color: '#2980b9',
    //     fontWeight: 'bold',
    //     marginVertical: Sizes.h20
    // },
    // username: {
    //     paddingVertical: Sizes.h24,
    //     paddingHorizontal: Sizes.h30,
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginVertical: Sizes.h10,
    //     borderWidth: 1,
    //     borderRadius: Sizes.h52,
    //     width: '90%',
    // },
    // password: {
    //     paddingVertical: Sizes.h24,
    //     paddingHorizontal: Sizes.h30,
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     marginVertical: Sizes.h10,
    //     borderWidth: 1,
    //     borderRadius: Sizes.h52,
    //     width: '90%',
    // },
    // textInput: {
    //     marginHorizontal: Sizes.h20,
    //     fontSize: Sizes.s35,
    //     paddingHorizontal: Sizes.s20
    // },
    // function: {
    //     flexDirection: 'row',
    //     width: '90%',
    //     justifyContent: 'space-between',
    //     marginVertical: Sizes.h20,
    //     alignItems: 'center'
    // },

    // showPassword: {
    //     flexDirection: 'row',
    //     marginHorizontal: Sizes.h20,
    //     alignItems: 'center',
    // },
    // textShowPassword: {
    //     marginHorizontal: Sizes.h20,
    //     fontSize: Sizes.s30
    // },
    // textForgotPassword: {
    //     marginHorizontal: Sizes.h20,
    //     fontSize: Sizes.s35,
    //     color: 'blue'
    // },

    // bottom: {
    //     padding: Sizes.h20,
    // },
})