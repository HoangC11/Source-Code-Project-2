import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class CustomMenuTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { listTab, onChangeTab } = this.props
        return (
            <View style={styles.content}>
                {listTab.map((value) => {
                    return (
                        <TouchableOpacity key={value.id} onPress={() => {
                            if (!objectIsNull(onChangeTab)) {
                                onChangeTab(value)
                            }
                        }} style={[styles.tab, { backgroundColor: value.selected ? '#335272' : 'transparent' }]}>
                            <Text style={[styles.text, { color: value.selected ? 'white' : 'black', fontWeight: value.selected ? 'bold' : '100' }]}>{value.title}</Text>
                        </TouchableOpacity>
                    )
                })
                }
            </View >
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '95%',
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.s10,
        marginVertical: Sizes.s10,
        backgroundColor: 'silver',
        alignSelf: 'center',
        // borderWidth: 1,
        borderRadius: Sizes.s5
    },
    tab: {
        flex: 1,
        // margin: Sizes.s5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.s20,
        borderRadius: Sizes.s5
    },
    text: {
        fontSize: Sizes.h30
    }

})