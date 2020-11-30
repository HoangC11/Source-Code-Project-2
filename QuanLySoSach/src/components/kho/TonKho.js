

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
export default class TonKho extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // dataKhachHang: []
            // data: []
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
                    alignSelf: 'center',
                    borderRadius: Sizes.s5,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    paddingHorizontal: Sizes.s10,
                    paddingVertical: Sizes.s20,
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
                    // borderColor: item.LoaiDonHang === 0 ? 'green' : 'blue',
                    // borderWidth: Sizes.s2

                }}>
                <Image source={{ uri: ('data:image/png;base64,' + item.FileHinhAnh) }} style={{ width: Sizes.s120, height: Sizes.s120, marginHorizontal: Sizes.s10 }} />
                <View style={{ flex: 1, marginHorizontal: Sizes.s10, }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: Sizes.h30, color: '#335272' }}>{item.MaHangHoa}</Text>
                        {/* <Text style={{ fontSize: Sizes.h30, color: item.LoaiDonHang === 0 ? 'green' : 'blue' }}>{item.LoaiDonHang === 0 ? 'Xuất' : 'Nhập'}</Text> */}
                    </View>
                    <Text style={{ fontSize: Sizes.h30, color: '#0984e3', fontWeight: '700' }}>{item.TenHangHoa}</Text>
                    <Text style={{ fontSize: Sizes.h28 }}>Số lượng tồn kho: <Text style={{ fontSize: Sizes.h28, color: '#636e72' }}>{item.SoLuongTonKho}</Text></Text>
                </View>


            </View>
        )
    }
    render() {
        const { dataHangHoa } = this.props
        // const { data } = this.state
        // console.log('Ton kho - Don hang - data: ', this.props.dataHangHoa)
        return (
            <FlatList
                renderItem={({ item, index }) => {
                    return (
                        this.renderItem(item, index)
                    )
                }}
                data={dataHangHoa}
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