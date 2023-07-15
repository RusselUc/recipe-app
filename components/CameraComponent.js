import { Dimensions, Image, StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import ButtonCamera from '../components/ButtonCamera'
import { useRef, useState, useEffect } from 'react'
const CameraComponent = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)

    const windowWidth = Dimensions.get('window').width;
    const cameraHeight = (windowWidth / 3) * 4;


    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync()
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermission(cameraStatus.status === 'granted')
        })()
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                setImage(data.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture save')
                setImage(null)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 50 }}>
                <ButtonCamera icon={'retweet'}
                    onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
                <ButtonCamera
                    color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
                    icon={'flash'} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} />
            </View>
            <View style={styles.container}>
                {
                    !image ? (
                        <Camera style={{ ...styles.camera, width: windowWidth, height: cameraHeight }}
                            type={type} flashMode={flash} ref={cameraRef} />
                    ) : (<Image source={{ uri: image }} style={{ ...styles.camera, flex: 1 }} />)
                }
            </View>

            <View>
                {
                    image ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 50 }}>
                            <ButtonCamera title="Re-take" icon="retweet" onPress={() => setImage(null)} />
                            <ButtonCamera title="save" icon="check" onPress={() => saveImage()} />
                        </View>
                    ) : (
                        <ButtonCamera title={'Take a picture'} icon="camera" onPress={() => takePicture()} />

                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20
    },

    camera: {
        borderRadius: 20,
    }
});

export default CameraComponent