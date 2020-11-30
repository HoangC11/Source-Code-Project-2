import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { stringColors } from '../../res/values/strings/stringColors'
export default class CustomCheckBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
        }
    }
    componentDidMount() {
        if (!objectIsNull(this.props.value)) {
            this.setState({
                selected: this.props.value
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { value } = this.props
        if (value !== prevProps.value) {
            if (!objectIsNull(value)) {
                this.setState({
                    selected: value
                })
            }
        }
    }
    render() {
        const {
            item,
            onSelected,

        } = this.props

        const { selected } = this.state
        return (
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(onSelected)) {
                            onSelected(0)
                            this.setState({
                                selected: 0
                            })
                        }
                    }}
                    style={styles.touch}>
                    <Icon name={selected === 0 ? 'check-square' : 'square'} color={selected === 0 ? '#05c46b' : 'gray'} size={Sizes.h36} />
                    <Text style={[styles.label, { color: selected === 0 ? '#05c46b' : 'gray' }]}>{!objectIsNull(item) ? item.label1 : ''}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(onSelected)) {
                            onSelected(1)
                            this.setState({
                                selected: 1
                            })
                        }
                    }}
                    style={styles.touch}>
                    <Icon name={selected === 1 ? 'check-square' : 'square'} color={selected === 1 ? '#05c46b' : 'gray'} size={Sizes.h36} />
                    <Text style={[styles.label, { color: selected === 1 ? '#05c46b' : 'gray' }]}>{!objectIsNull(item) ? item.label2 : ''}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s20,
    },
    touch: {
        flex: 1,
        margin: Sizes.s10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: Sizes.h28,
        fontWeight: '500',
        marginHorizontal: Sizes.s10,
    }
})