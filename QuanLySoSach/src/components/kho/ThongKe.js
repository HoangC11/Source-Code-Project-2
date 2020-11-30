import React from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
export default class ThongKe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { dataThongKe } = this.props
        return (
            <FlatList
                style={{ flex: 1, flexGrow: 1, }}
                keyExtractor={item => item.MaSanPham}
                data={dataThongKe}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.item}>
                            <Image source={{ uri: !objectIsNull(item.HinhAnh) ? 'data:image/png;base64,' + item.HinhAnh : null }} style={{ width: 70, height: 70, margin: Sizes.s10 }} />
                            <View style={{ flex: 1, }}>
                                <Text style={styles.title}>Mã sản phẩm: <Text style={styles.ma}>{item.MaSanPham}</Text></Text>
                                <Text style={styles.title}>Tên sản phẩm: <Text style={styles.ten}>{item.TenSanPham}</Text></Text>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.title}>Tổng tiền: <Text style={styles.tongTien}>{item.Tong}</Text></Text>
                                    <Text style={styles.title}>Tổng số lượng: <Text style={styles.soLuong}>{item.SoLuong}</Text></Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: '90%',
        margin: Sizes.s5,
        // alignSelf: 'center',
        borderRadius: Sizes.s10,
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s20,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: Sizes.h26,
        fontWeight: '600',
        color: '#335272'
    },
    ma: {
        fontWeight: 'bold',
        color: 'orange'
    },
    ten: {
        fontSize: Sizes.h30,
        fontWeight: '700',
        color: 'blue'
    },
    tongTien: {
        fontSize: Sizes.h28,
        fontWeight: '600',
        color: 'green'
    },
    soLuong: {
        fontSize: Sizes.h28,
        fontWeight: '600',
        color: 'grey'
    }
})