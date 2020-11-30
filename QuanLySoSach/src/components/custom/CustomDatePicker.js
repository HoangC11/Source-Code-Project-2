import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatNewDateToDate } from '../../utils/FormatTime'
export default class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: !objectIsNull(this.props.value) ? this.props.value : new Date(),
            isShow: false,
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({
                date: this.props.value
            })
        }
    }

    render() {
        const { date, isShow } = this.state
        const { onPress } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        isShow: true
                    })
                }}
                style={styles.content}>
                <Text style={styles.text}>{formatNewDateToDate(date) + ''}</Text>
                {isShow &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onChange={(d) => {
                            console.log("DatePicker - Data : ", d.nativeEvent.timestamp)
                            this.setState({
                                isShow: false,
                                date: new Date(d.nativeEvent.timestamp)
                            }, () => {
                                if (!objectIsNull(onPress)) {
                                    onPress(d.nativeEvent.timestamp)
                                }
                            })
                        }}
                    />
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        // backgroundColor: 'red',
        marginVertical: Sizes.s10,
        paddingVertical: Sizes.s20,
        paddingHorizontal: Sizes.s10,
        borderWidth: 1,
        borderRadius: Sizes.s5,
        borderColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center'
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center'

    },
    text: {
        fontSize: Sizes.h30,
        fontWeight: '600',
        textAlign: 'center'
    }

})