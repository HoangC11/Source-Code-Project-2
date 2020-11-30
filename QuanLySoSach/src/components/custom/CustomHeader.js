import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { stringColors } from '../../res/values/strings/stringColors'
export default class CustomHeader extends React.Component {
    render() {
        const {
            iconLeft,
            colorIconLeft,
            onPressLeft,

            title,

            iconRight,
            coloIconRight,
            onPressRight,

        } = this.props
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(onPressLeft)) {
                            onPressLeft()
                        }
                    }}
                    style={styles.touch}
                >
                    <Icon name={iconLeft} size={Sizes.h46} color={!objectIsNull(colorIconLeft) ? colorIconLeft : 'silver'} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(onPressRight)) {
                            onPressRight()
                        }
                    }}
                    style={styles.touch}
                >
                    <Icon name={iconRight} size={Sizes.h46} color={!objectIsNull(coloIconRight) ? colorIconLeft : 'silver'} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s10,
        borderBottomWidth: 1,
        borderColor: 'silver'

    },
    title: {
        fontSize: Sizes.h46,
        fontWeight: 'bold',
        color: stringColors.text,
        textAlign: 'center',
        flex: 1,
    },
    touch: {
        paddingHorizontal: Sizes.s10,
        paddingVertical: Sizes.s10
    }
})