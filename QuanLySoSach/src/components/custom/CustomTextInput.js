import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class CustomTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            colorBorder: 'silver',
        }
    }
    componentDidMount() {
        if (!stringIsEmpty(this.props.value)) {
            this.setState({
                text: this.props.value + ''
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            if (!stringIsEmpty(this.props.value)) {
                this.setState({
                    text: this.props.value + ''
                })
            }
        }
    }
    onChangeText = (text) => {
        const { setValue } = this.props
        this.setState({
            text
        }, () => {
            if (!objectIsNull(setValue)) {
                setValue(text)
            }
        })
    }
    render() {
        const { placeHolder, type } = this.props
        return (
            <View style={[styles.content, { borderColor: this.state.colorBorder }]}>
                <TextInput
                    secureTextEntry={type === 'password' ? true : false}
                    placeholder={!stringIsEmpty(placeHolder) ? placeHolder : ''}
                    onBlur={() => {
                        this.setState({
                            colorBorder: 'silver'
                        })
                    }}
                    onFocus={() => {
                        this.setState({
                            colorBorder: 'blue'
                        })
                    }}
                    value={this.state.text}
                    onChangeText={this.onChangeText}
                    style={styles.textInput}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        // paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s10,
        borderWidth: 1,
        borderRadius: Sizes.s5
    },
    textInput: {
        // flex: 1,
        // paddingVertical: -5,
        paddingVertical: Sizes.s15,
        marginHorizontal: Sizes.s10,
        fontSize: Sizes.h28,

    },
})