import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import CustomTextInput from '../custom/CustomTextInput'
import { Sizes } from '@dungdang/react-native-basic'
import ChooseImage from '../custom/ChooseImage'
import CustomCheckBox from '../custom/CustomCheckBox'
import CustomPicker from '../custom/CustomPicker'
import CustomDatePicker from '../custom/CustomDatePicker'
import CustomTimePicker from '../custom/CustomTimePicker'
import CustomSelect from '../custom/CustomSelect'
export default class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    renderForm() {
        const { form } = this.props
        const itemForm = []
        for (let item of form) {
            itemForm.push(
                <Item key={item.id} ref={`item${item.id}`} item={item} {...this.props} />
            )
        }
        return (
            <View style={{ width: '100%', }}>
                {itemForm}
            </View>
        )
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, flexGrow: 1, paddingHorizontal: Sizes.s10 }}>
                {this.renderForm()}
            </ScrollView>
        )
    }
}


class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // item: this.props.item
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.item !== prevProps.item) {
    //         if (!objectIsNull(this.props.item)) {
    //             this.setState({
    //                 item: this.props.item
    //             })
    //         }
    //     }
    // }
    checkViewItem(item) {
        switch (item.type) {
            case 'textEditForm':
                return (
                    <CustomTextInput
                        item={item}
                        value={item.value}
                        label={item.label}
                        setValue={(text) => {
                            item.value = text
                            item.label = text
                            if (!objectIsNull(item.onPress)) {
                                if (!isNaN(parseInt(text))) {
                                    item.onPress(text)
                                } else {
                                    item.onPress(0)
                                }

                            }
                        }}

                    />
                )
            case 'chooseImage':
                return (
                    <ChooseImage
                        item={item}
                        label={item.label}
                        value={item.value}
                        onPress={(fileName, fileBase64) => {
                            item.value = fileBase64
                            item.label = fileName
                        }}
                    />
                )

            case 'checkBoxForm':
                return <CustomCheckBox
                    item={item}
                    value={item.value}
                    onSelected={(select) => {
                        item.value = select
                    }}
                />

            case 'datePickerForm':
                return <CustomDatePicker
                    value={item.value}
                    onPress={(date) => {
                        item.value = date
                        item.label = date
                    }}
                />

            case 'timePickerForm':
                return <CustomTimePicker
                    value={item.value}
                    onPress={(time) => {
                        item.value = time
                        item.label = time
                    }}
                />

            case 'pickerForm':
                return <CustomSelect
                    item={item}
                    items={item.items}
                    itemSelected={item.itemSelected}
                    onSelected={(val) => {
                        // if (!arrayIsEmpty(item.items)) {
                        //     let item = item.items.filter((value) => {
                        //         return value.idItem === idItem
                        //     })
                        //     item.value = item[0].idItem
                        //     item.label = item[0].labelItem
                        // }
                        item.value = parseInt(val.id)
                        item.label = val.label
                        item.itemSelected = val
                        if (!objectIsNull(item.onPress)) {
                            item.onPress(val)
                        }

                    }}
                />


            default:
                return null
        }
    }
    render() {
        const { item } = this.props
        let itemView = this.checkViewItem(item)
        return (
            <View style={{ marginVertical: Sizes.s10, width: '100%' }}>
                <Text style={{ fontSize: Sizes.h30, fontWeight: '600', color: '#335272' }}>
                    {item.title}
                </Text>
                {itemView}
            </View>
        )
    }
}
