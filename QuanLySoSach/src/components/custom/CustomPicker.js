import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { stringColors } from '../../res/values/strings/stringColors'
export default class CustomPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: undefined,
            renderItem: null
        }
    }
    componentDidMount() {
        const { items, value } = this.props
        if (!arrayIsEmpty(items)) {
            let list = items.map((val) => {
                return (
                    <Picker.Item key={val.labelItem} label={val.labelItem} value={val.idItem} />
                )
            })
            this.setState({
                renderItem: list,
                selected: !objectIsNull(value) ? value : undefined
            }, () => {
                const { items } = this.props
                if (!arrayIsEmpty(items)) {
                    let val = items.filter((v) => {
                        return v.idItem === value
                    })
                    if (!arrayIsEmpty(val)) {
                        if (!objectIsNull(this.props.onSelected)) {
                            this.props.onSelected(val[0].idItem, val[0].labelItem)
                        }
                    }
                }
                // if (!objectIsNull(value)) {
                //     this.setState({

                //     })
                // }
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { items, value } = this.props
        
        if (!arrayIsEmpty(items) !== !arrayIsEmpty(prevProps.items)) {
            if (!arrayIsEmpty(items)) {
                let list = items.map((val) => {
                    return (
                        <Picker.Item key={val.labelItem} label={val.labelItem} value={val.idItem} />
                    )
                })
                this.setState({
                    renderItem: list,
                })
            }
        }

    }
    onSelectedPicker(item) {
        this.setState({
            selected: item
        }, () => {
            const { items } = this.props
            if (!arrayIsEmpty(items)) {
                let val = items.filter((v) => {
                    return v.idItem === item
                })
                if (!arrayIsEmpty(val)) {
                    if (!objectIsNull(this.props.onSelected)) {
                        this.props.onSelected(val[0].idItem, val[0].labelItem)
                    }
                }
            }

        })

    }
    render() {
        const {
            item,
            onSelected,
        } = this.props

        const { selected, renderItem } = this.state
        return (
            <View style={styles.content}>
                <Picker
                    selectedValue={selected}
                    style={styles.picker}
                    onValueChange={(item, index) => {
                        this.onSelectedPicker(item)
                    }}
                >
                    {renderItem}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingVertical: Sizes.s10,
        // paddingHorizontal: Sizes.s20,
        paddingHorizontal: Sizes.s10,
        // paddingVertical: Sizes.s10,
        borderWidth: 1,
        borderRadius: Sizes.s5,
        marginVertical: Sizes.s10,
        borderColor: 'silver',
    },
    picker: {
        width: '100%',

    }
})