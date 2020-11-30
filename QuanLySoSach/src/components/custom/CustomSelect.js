import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            itemSelected: undefined
        }
    }
    componentDidMount() {
        const { itemSelected } = this.props
        if (!objectIsNull(itemSelected)) {
            this.setState({
                itemSelected
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { itemSelected } = this.props
        if (itemSelected !== prevProps.itemSelected) {
            if (!objectIsNull(itemSelected)) {
                this.setState({
                    itemSelected
                })
            }
        }
        // if(itemSelected )
    }
    onChangeVisibleModal(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        const { placeHolder, type, items, onSelected } = this.props
        const { modalVisible, itemSelected } = this.state
        return (
            <TouchableOpacity
                onPress={() => { this.onChangeVisibleModal(true) }}
                style={styles.content}>
                <Text style={styles.text}>{!objectIsNull(itemSelected) ? itemSelected.label : ''}</Text>
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
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            bottom: 0,
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                width: '100%',
                                height: Dimensions.get('window').height / 6 * 4,
                                backgroundColor: 'white',
                                borderTopRightRadius: Sizes.s20,
                                borderTopLeftRadius: Sizes.s20,
                                paddingVertical: Sizes.s10,
                                paddingHorizontal: Sizes.s10,
                            }}>
                                <FlatList
                                    data={arrayIsEmpty(items) ? [] : items}
                                    keyExtractor={item => item.Id + ''}
                                    renderItem={({ item, index }) => {
                                        return this.renderItem(item, index)
                                    }}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                        {/* <TouchableWithoutFeedback style={{ flex: 1, }}>
                            <View style={{ width: '95%', backgroundColor: 'white', paddingHorizontal: paddding.padding20, paddingBottom: paddding.padding30, alignSelf: 'center', borderRadius: paddding.padding10 }}>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onChangeVisibleModal(false)
                                        }}
                                        style={{ justifyContent: 'center', alignItems: 'center', padding: paddding.padding10 }}>
                                        <Icon name='times' color={'silver'} size={sizeText.h36} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: sizeText.h30, fontWeight: '600', flex: 1, textAlign: 'center' }}>{languageApp === 'VN' ? 'Thông tin sản phẩm' : 'Product infomation'}</Text>
                                </View>
                                <ItemStore item={itemSelected} />
                            </View>
                        </TouchableWithoutFeedback> */}

                    </TouchableOpacity>
                </Modal>
            </TouchableOpacity>
        )
    }
    renderItem(item, index) {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (!objectIsNull(this.props.onSelected)) {
                        this.props.onSelected(item)
                        this.setState({
                            itemSelected: item
                        }, () => {
                            this.onChangeVisibleModal(false)
                        })
                    }
                }}
                style={styles.viewItem}>
                {item.type === 'HangHoa' ?
                    (
                        <View style={styles.viewType}>
                            <Text style={styles.itemTitle}>{item.code}</Text>
                            <Text style={styles.itemLabel}>{item.label}</Text>
                        </View>
                    )
                    : item.type === 'KhachHang' ?
                        (
                            <View style={styles.viewType}>
                                <Text style={styles.itemTitle}>{item.code}</Text>
                                <Text style={styles.itemLabel}>{item.label}</Text>
                            </View>
                        )
                        : item.type === 'MayIn' ?
                            (
                                <View style={styles.viewType}>
                                    {/* <Text style={styles.itemTitle}>{item.code}</Text> */}
                                    <Text style={styles.itemLabel}>{item.label}</Text>
                                </View>
                            )
                            :
                            (
                                <View style={styles.viewType}>
                                    <Text style={styles.itemTitle}>123456789</Text>
                                    <Text style={styles.itemLabel}>XXXXXXXXXXXXXXXXXX</Text>
                                </View>
                            )
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s10,
        borderWidth: 1,
        borderRadius: Sizes.s5,
        borderColor: 'silver',
        justifyContent: 'center'
    },
    text: {
        // flex: 1,
        // paddingVertical: -5,
        paddingVertical: Sizes.s15,
        marginHorizontal: Sizes.s10,
        fontSize: Sizes.h28,

    },
    viewItem: {
        width: '100%',
        paddingVertical: Sizes.s10,
        marginVertical: Sizes.s10,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'

    },
    viewType: {
        width: '100%',

    },
    itemTitle: {
        fontSize: Sizes.h26,
        fontWeight: '700',
        color: 'gray'
    },
    itemLabel: {
        fontSize: Sizes.h30,
        fontWeight: '700',
        color: '#335272'
    }

})