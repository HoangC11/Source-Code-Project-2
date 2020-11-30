

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import { taoDonHangForm } from '../form/FormInfo'
import Form from '../form/Form'
import CustomHeader from '../custom/CustomHeader'
import { statusApp } from '../custom/statusApp'
import { callDB } from '../sqliteDB/callDB'
import { arrayIsEmpty, objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { formatNewDateToDate, formatNewDateToTime } from '../../utils/FormatTime'
export default class DanhSachDonHang extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: taoDonHangForm(),
            listHangHoa: [],
            listKhachHang: []
        }
    }
    async getListHangHoa() {
        const response = await callDB('Select * From HangHoa')
        // console.log('responseGetListHangHoa: ', response)
        if (!arrayIsEmpty(response)) {
            let list = response.map((value) => {
                // return Object.assign(value, { idItem: value.Id, labelItem: value.TenHangHoa })
                return {
                    id: value.Id + '',
                    code: value.MaHangHoa,
                    label: value.TenHangHoa,
                    type: 'HangHoa',
                    value: value,
                }
            })

            let form = this.state.form
            for (let item of form) {
                if (item.tag === 'SanPham') {
                    item.items = list
                    // item.value = list[0].idItem
                    // item.label = list[0].labelItem
                }
            }
            this.setState({
                form,
                listHangHoa: response
            })
        }
    }
    async getListKhachHang() {
        const response = await callDB('Select * From KhachHang')
        // console.log('responseGetListKhachHang: ', response)
        if (!arrayIsEmpty(response)) {
            let list = response.map((value) => {
                // return Object.assign(value, { idItem: value.Id, labelItem: value.TenKhachHang })
                return {
                    id: value.Id + '',
                    code: value.MaKhachHang,
                    label: value.TenKhachHang,
                    type: 'KhachHang',
                    value: value,
                }
            })

            let newForm = this.state.form
            for (let item of newForm) {
                if (item.tag === 'KhachHang') {
                    item.items = list
                    // item.value = list[0].idItem
                    // item.label = list[0].labelItem
                }
            }
            this.setState({
                form: newForm,
                listKhachHang: response
            })
        }
    }
    onSelectedSanPham = (sanPham) => {
        let nform = this.state.form
        for (let it of nform) {
            if (it.tag === 'GiaVon') {
                it.value = sanPham.value.GiaVon
                it.label = sanPham.value.GiaVon + ''
            }
        }
        this.setState({
            form: nform
        })
    }
    onChangeSoLuong = (soLuong) => {
        let zform = this.state.form
        for (let it of zform) {
            if (it.tag === 'TongTien') {
                for (let iz of zform) {
                    if (iz.tag === 'GiaVon') {
                        it.value = parseInt(iz.value) * parseInt(soLuong)
                        it.label = (parseInt(iz.value) * parseInt(soLuong)) + ''
                        break
                    }
                }
                // it.value = sanPham.value.GiaVon
                // it.label = sanPham.value.GiaVon + ''
            }
        }
        this.setState({
            form: zform
        })
    }
    async componentDidMount() {
        await this.getListHangHoa()
        await this.getListKhachHang()
        let item = this.props.navigation.getParam('item')
        console.log('item - Don Hang - navigation: ', item)
        if (!objectIsNull(item)) {
            let newForm = this.state.form
            for (let value of newForm) {
                switch (value.tag) {
                    case 'MaDH':
                        value.value = item.MaDonHang
                        value.label = item.MaDonHang
                        break
                    case 'LoaiDonHang':
                        value.value = item.LoaiDonHang
                        value.label1 = item.LoaiDonHang === 0 ? 'Đơn hàng nhập' : 'Đơn hàng bán'
                        value.label2 = item.LoaiDonHang === 1 ? 'Đơn hàng nhập' : 'Đơn hàng bán'
                        break
                    case 'Ngay':
                        value.value = item.NgayTao
                        value.label = formatNewDateToDate(item.NgayTao)
                        break
                    case 'Gio':
                        value.value = item.GioTao
                        value.label = formatNewDateToTime(item.GioTao)
                        break
                    case 'SanPham':
                        value.value = item.MaSanPham
                        value.label = item.TenSanPham
                        value.itemSelected = {
                            id: item.Id,
                            code: item.MaSanPham,
                            label: item.TenSanPham,
                            type: 'HangHoa',
                            value: item,
                        }
                        value.onPress = this.onSelectedSanPham
                        break
                    case 'SoLuong':
                        value.value = item.SoLuong
                        value.label = item.SoLuong + ''
                        value.onPress = this.onChangeSoLuong
                        console.log('33333333333333333')
                        break
                    case 'TongTien':
                        value.value = item.TongGia
                        value.label = item.TongGia + ''
                        break
                    case 'KhachHang':
                        value.value = item.MaKhachHang
                        value.label = item.TenKhachHang
                        value.itemSelected = {
                            id: item.MaKhachHang,
                            code: item.MaKhachHang,
                            label: item.TenKhachHang,
                            type: 'KhachHang',
                            value: item,
                        }
                        break
                    // case 'SoLuong':
                    //     break

                    default:
                        break
                }
                // textEditForm('1', 'textEditForm', 'Mã đơn hàng', '', undefined, true, true, 'MaDH', statusApp.textEditForm),
                // checkBoxForm('2', 'checkBoxForm', 'Loại đơn hàng', 'Đơn hàng nhập', 'Đơn hàng bán', 0, true, true, 'LoaiDonHang'),
                // datePickerForm('3', 'datePickerForm', 'Ngày', new Date().getTime(), new Date().getTime(), true, true, 'Ngay'),
                // timePickerForm('4', 'timePickerForm', 'Giờ', new Date().getTime(), new Date().getTime(), true, true, 'Gio'),
                // pickerForm('5', 'pickerForm', 'Sản phẩm', '', undefined, true, false, 'SanPham'),
                // textEditForm('6', 'textEditForm', 'Số lượng', '0', 0, true, false, 'SoLuong', statusApp.numberEditForm),
                // textEditForm('7', 'textEditForm', 'Tổng tiền', '0', 0, true, false, 'TongTien', statusApp.numberEditForm),
                // pickerForm('8', 'pickerForm', 'Khách hàng', '0', 0, true, false, 'KhachHang'),
            }
            this.setState({
                form: newForm
            })
        } else {
            console.log('5555555555555555')
            let nowForm = this.state.form
            for (let it of nowForm) {
                if (it.tag === 'SanPham') {
                    it.onPress = this.onSelectedSanPham
                } else if (it.tag === 'SoLuong') {
                    it.onPress = this.onChangeSoLuong
                }
            }
            this.setState({
                form: nowForm
            })
        }
    }
    async onTaoDonHang() {

        const { form, listHangHoa, listKhachHang } = this.state
        // console.log('listHangHoa: ', listHangHoa)
        let sql = "INSERT INTO DonHang (Id, MaDonHang, LoaiDonHang, MaSanPham, TenSanPham, SoLuong, GiaBan, GiaVon,TongGia, MaKhachHang, TenKhachHang, NgayTao, GioTao) VALUES(null, "
        let input = {
            MaDonHang: '',
            LoaiDonHang: '',
            MaSanPham: '',
            TenSanPham: '',
            SoLuong: '',
            GiaBan: '',
            GiaVon: '',
            TongGia: '',
            MaKhachHang: '',
            TenKhachHang: '',
            NgayTao: '',
            GioTao: ''
        }

        for (let item of form) {
            switch (item.tag) {
                case 'MaDH':
                    input.MaDonHang = item.value
                    break
                case 'LoaiDonHang':
                    input.LoaiDonHang = item.value
                    break
                case 'Ngay':
                    input.NgayTao = item.value
                    break
                case 'Gio':
                    input.GioTao = item.value
                    break
                case 'SanPham':
                    input.MaSanPham = item.value
                    input.TenSanPham = item.label
                    let sp = listHangHoa.filter((value) => {
                        return value.Id === item.value
                    })
                    if (!arrayIsEmpty(sp)) {
                        input.GiaBan = sp[0].GiaBan
                        input.GiaVon = sp[0].GiaVon
                    }
                    break
                case 'SoLuong':
                    input.SoLuong = item.value
                    break
                case 'TongTien':
                    input.TongGia = item.value
                    break
                case 'KhachHang':
                    input.MaKhachHang = item.value
                    input.TenKhachHang = item.label
                    break
                default:
                    break
            }
        }
        sql += `'${input.MaDonHang}', ${input.LoaiDonHang}, ${parseInt(input.MaSanPham)}, '${input.TenSanPham}', ${input.SoLuong}, ${input.GiaBan}, ${input.GiaVon}, ${input.TongGia}, ${parseInt(input.MaKhachHang)}, '${input.TenKhachHang}', ${input.NgayTao}, ${input.GioTao});`
        // console.log('inputDonHang: ', input)
        const response = await callDB(sql)
        // console.log('responseTaoDonhang: ', response)
        Alert.alert('Thông báo', 'Thêm thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
        this.onUpdateKhachHang(input.MaKhachHang, parseInt(input.TongGia), input.LoaiDonHang)
        this.onUpdateHangHoa(input.MaSanPham, parseInt(input.SoLuong), input.LoaiDonHang)
    }
    async onCapNhatDonHang() {
        let value = this.props.navigation.getParam('item')
        const { form, listHangHoa, listKhachHang } = this.state
        // console.log('listHangHoa: ', listHangHoa)
        let sql = "UPDATE DonHang SET "
        let input = {
            MaDonHang: '',
            LoaiDonHang: 0,
            MaSanPham: '',
            TenSanPham: '',
            SoLuong: '',
            GiaBan: '',
            GiaVon: '',
            TongGia: '',
            MaKhachHang: '',
            TenKhachHang: '',
            NgayTao: '',
            GioTao: ''
        }

        for (let item of form) {
            switch (item.tag) {
                case 'MaDH':
                    input.MaDonHang = item.value
                    break
                case 'LoaiDonHang':
                    input.LoaiDonHang = item.value
                    break
                case 'Ngay':
                    input.NgayTao = item.value
                    break
                case 'Gio':
                    input.GioTao = item.value
                    break
                case 'SanPham':
                    input.MaSanPham = item.value
                    input.TenSanPham = item.label
                    let sp = listHangHoa.filter((value) => {
                        return value.Id === item.id
                    })
                    if (!arrayIsEmpty(sp)) {
                        input.GiaBan = sp[0].GiaBan
                        input.GiaVon = sp[0].GiaVon
                    }
                    break
                case 'SoLuong':
                    input.SoLuong = item.value
                    break
                case 'TongTien':
                    input.TongGia = item.value
                    break
                case 'KhachHang':
                    input.MaKhachHang = item.value
                    input.TenKhachHang = item.label
                    break
                default:
                    break
            }
        }
        sql += `MaDonHang = '${input.MaDonHang}', LoaiDonHang = ${input.LoaiDonHang}, NgayTao = ${input.NgayTao}, GioTao = ${input.GioTao}, MaSanPham = '${input.MaSanPham}',TenSanPham = '${input.TenSanPham}',SoLuong = ${input.SoLuong},TongGia = ${input.TongGia}, MaKhachHang = '${input.MaKhachHang}',TenKhachHang = '${input.TenKhachHang}'  WHERE Id = ${value.Id} ;`
        // console.log('inputDonHang: ', input)

        // console.log('Thong ke so tien: ', input.TongGia + ' --- ')
        // console.log('old Value :', value)
        const response = await callDB(sql)
        // console.log('responseCapNhatDonhang: ', response)
        Alert.alert('Thông báo', 'Cập nhật đơn hàng thành công !', [{ text: 'Đóng', onPress: () => { this.props.navigation.goBack() } }])
        this.onUpdateKhachHang(value.MaKhachHang, parseInt(input.TongGia) - parseInt(value.TongGia), value.LoaiDonHang)
        this.onUpdateHangHoa(value.MaSanPham, parseInt(input.SoLuong) - parseInt(value.SoLuong), value.LoaiDonHang)
    }
    async onUpdateKhachHang(MaKhachHang, SoTien, typeDonHang) {
        // console.log('aaaaaaaaaaaa: ', MaKhachHang + ' -- ' + SoTien + ' --- ' + typeDonHang)
        let query = `SELECT * FROM KhachHang WHERE Id=${MaKhachHang};`
        const response = await callDB(query)
        console.log('onUpdateKhachHang - response : ', response)
        if (!arrayIsEmpty(response)) {
            if (typeDonHang === 1) {
                let tongTienBan = parseInt(response[0].TongTienBan) + parseInt(SoTien)
                let sql = `UPDATE KhachHang SET TongTienBan=${tongTienBan} WHERE Id=${MaKhachHang}`
                await callDB(sql)
            } else {
                let tongTienMua = parseInt(response[0].TongTienMua) + parseInt(SoTien)
                let sql = `UPDATE KhachHang SET TongTienMua=${tongTienMua} WHERE Id=${MaKhachHang}`
                await callDB(sql)
            }
        }
    }
    async onUpdateHangHoa(MaHangHoa, SoLuong, typeDonHang) {
        console.log('onUpdateHangHoa - info : ', MaHangHoa + ' --- ' + SoLuong + ' ----- ' + typeDonHang)
        let query = `SELECT * FROM HangHoa WHERE Id=${MaHangHoa};`
        const response = await callDB(query)
        console.log('onUpdateHangHoa - response : ', response)
        if (!arrayIsEmpty(response)) {
            if (typeDonHang === 1) {
                let soLuongBan = parseInt(response[0].SoLuongDaBan) + parseInt(SoLuong)
                let tonKho = parseInt(response[0].SoLuongTonKho) - parseInt(SoLuong)
                let sql = `UPDATE HangHoa SET SoLuongDaBan=${soLuongBan}, SoLuongTonKho=${tonKho} WHERE Id=${MaHangHoa}`
                await callDB(sql)
            } else {
                let soLuongMua = parseInt(response[0].SoLuongDaMua) + parseInt(SoLuong)
                let tonKho = parseInt(response[0].SoLuongTonKho) + parseInt(SoLuong)
                let sql = `UPDATE HangHoa SET SoLuongDaMua=${soLuongMua}, SoLuongTonKho=${tonKho} WHERE Id=${MaHangHoa}`
                await callDB(sql)
            }
        }
    }
    render() {
        const { form } = this.state
        const status = this.props.navigation.getParam('status')
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.body}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <CustomHeader
                            iconLeft={'chevron-left'}
                            onPressLeft={() => { this.props.navigation.goBack() }}
                            title={status === statusApp.add ? 'Tạo đơn hàng'
                                : status === statusApp.edit ? 'Sửa đơn hàng'
                                    :
                                    'Đơn hàng'
                            }
                        // iconRight={'plus'} 
                        // onPressRight={() => {this.props.navigation.navigate('DonHang')}}
                        />
                        <Form form={form} />
                        {/* <ScrollView contentContainerStyle={styles.content} >
                            <CustomButton title={'Đơn hàng'} onPress={() => {
                                
                            }} />
                        </ScrollView> */}
                        <CustomButton title={status === statusApp.add ? 'Tạo '
                            : status === statusApp.edit ? 'Cập nhật '
                                :
                                'Đơn hàng'
                        } onPress={() => {
                            if (status === statusApp.add) {
                                this.onTaoDonHang()
                            } else if (status === statusApp.edit) {
                                this.onCapNhatDonHang()
                            }
                        }} />
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