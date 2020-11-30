import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ChooseImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: this.props.label
        }
    }
    onChangeImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const { onPress } = this.props
                if (!objectIsNull(onPress)) {
                    this.setState({
                        fileName: response.fileName
                    })
                    onPress(response.fileName, response.data)
                }
            }
        });
    }
    render() {
        const { item } = this.props
        const { fileName } = this.state
        return (
            <TouchableOpacity onPress={() => {
                this.onChangeImage()
            }} style={{
                paddingHorizontal: Sizes.s10,
                paddingVertical: Sizes.s20,
                borderRadius: Sizes.s5,
                borderColor: 'silver',
                borderWidth: 1,
            }}>
                <Text style={{ fontSize: Sizes.h28, color: 'black' }}>{fileName + ''}</Text>
            </TouchableOpacity>
        )
    }
}