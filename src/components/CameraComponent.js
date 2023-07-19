import { Dimensions, Image, StyleSheet, Platform } from 'react-native';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import ButtonCamera from '../components/ButtonCamera';
import { useRef, useState, useEffect } from 'react';

const CameraComponent = ({ form, setForm, setCameraOpen }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [whiteBalance, setWhiteBalance] = useState(Camera.Constants.WhiteBalance.auto); // Nueva propiedad para ajustar la exposición
    const cameraRef = useRef(null);

    const windowWidth = Dimensions.get('window').width;
    const cameraHeight = (windowWidth / 3) * 4;

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                console.log(cameraRef.current);
                const options = { quality: 0.0, skipProcessing: false };
                // Configurar el whiteBalance antes de tomar la foto
                // cameraRef.current.setWhiteBalanceAsync(whiteBalance);
                const data = await cameraRef.current.takePictureAsync(options);
                // console.log(data);
                setForm({
                    ...form,
                    image: {
                        uri: data.uri,
                        name: 'image.jpg',
                        type: 'image/jpg',
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const saveImage = async () => {
        if (form.image.uri) {
            try {
                setCameraOpen(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {!form.image.uri ? (
                    <Camera
                        style={{ ...styles.camera, width: windowWidth, height: cameraHeight }}
                        ref={cameraRef}
                        autoFocus={true}
                        focusable={true}
                        useCamera2Api={true}
                    // focusDepth={0}
                    // whiteBalance={Camera.Constants.WhiteBalance.sunny}
                    />
                ) : (
                    <Image source={{ uri: form.image.uri }} style={{ ...styles.camera, flex: 1 }} />
                )}
            </View>

            <View>
                {form.image.uri ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 50 }}>
                        <ButtonCamera
                            title="Re-take"
                            icon="retweet"
                            onPress={() =>
                                setForm({
                                    ...form,
                                    image: {
                                        uri: null,
                                        name: 'image.jpg',
                                        type: 'image/jpg',
                                    },
                                })
                            }
                        />
                        <ButtonCamera title="Save" icon="check" onPress={() => saveImage()} />
                    </View>
                ) : (
                    <ButtonCamera title={'Take a picture'} icon="camera" onPress={() => takePicture()} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
    },

    camera: {
        borderRadius: 20,
    },
});

export default CameraComponent;
