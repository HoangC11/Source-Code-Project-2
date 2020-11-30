import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

import CustomHeader from '../custom/CustomHeader'
import { mayInform } from '../form/FormInfo'
import Form from '../form/Form'
import { CustomButton } from '../custom/CustomButton'
export default class MayIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: mayInform()
        }
    }
    componentDidMount() {
        let f = this.state.form
        for (let item of f) {
            if (item.tag === 'DongMayIn') {
                item.items = [
                    {
                        id: '1',
                        code: 'MayIn1',
                        label: 'Birch BP-T3',
                        type: 'MayIn',
                        value: undefined,
                    },
                    {
                        id: '2',
                        code: 'MayIn2',
                        label: 'Birch BP-F03',
                        type: 'MayIn',
                        value: undefined,
                    },
                    {
                        id: '3',
                        code: 'MayIn3',
                        label: 'Sewoo SLK-T32EB',
                        type: 'MayIn',
                        value: undefined,
                    },
                    {
                        id: '4',
                        code: 'MayIn4',
                        label: 'Scangle SGT-88IV',
                        type: 'MayIn',
                        value: undefined,
                    },
                    {
                        id: '5',
                        code: 'MayIn5',
                        label: 'Máy in A4, A5 (hỗ trợ AirPrint)',
                        type: 'MayIn',
                        value: undefined,
                    },

                ]
            }
        }
        this.setState({
            form: f
        })
    }

    render() {
        const { form } = this.state
        return (
            <View style={styles.body}>
                <CustomHeader
                    iconLeft={'chevron-left'}
                    onPressLeft={() => { this.props.navigation.goBack() }}
                    title={'In đơn hàng'}
                    // iconRight={'plus'}
                    onPressRight={() => {
                        // this.props.navigation.navigate('DonHang', { status: statusApp.add })
                    }}
                />
                <Form form={form} />
                <CustomButton
                    title={'In thử'}
                    onPress={() => { this.props.navigation.goBack() }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    }
})